import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { loginRoute } from "../utils/Endpoint";
import { setUser } from "../redux/slices/AuthSlicer";
import { setAccessToken, setRefreshToken } from "../redux/slices/TokenReducer";
import bgIMge from "../../public/assets/login/cover pic.png";
import text from "../../public/assets/login/text.png";
import logo from "../../public/assets/Logo/logo-juzza.png";
import axios from "../api/axios";

const Login = () => {
  const [error, setError] = useState({});
  const [user, setData] = useState({
    email: "",
    password: "",
  });
  // const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userInfo);

  useEffect(() => {
    if (userData?.userInfo?.role === "admin") {
      navigate("/admin/dashboard");
    }else{
      navigate("/login");
    }
  }, [userData, navigate]);

  // @DSC Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // @dsc Validation
      const validationError = {};

      if (!user.email.trim()) {
        validationError.email = "email is require";
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        validationError.email = "email is not valid";
      }

      if (!user.password.trim()) {
        validationError.password = "password is require";
      } else if (user.password.length < 6 || user.password.length > 20) {
        validationError.password =
          "password is minimum containing 6 and maximum containing 20 characters";
      }
      setError(validationError);

      // Backend call for user Validation
      if (Object.keys(validationError).length === 0) {

        const response = await axios.post(loginRoute, user);

        console.log("Login response", response?.data)
        dispatch(setUser(response.data?.userInfo));
        dispatch(setAccessToken(response.data?.accessToken));
        dispatch(setRefreshToken(response.data?.refreshToken));
        
        toast.success(response?.data?.email && "Successfully Login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  }

  // @DSC Input Changes
  const changeHandler = (e) => {
    setData({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login h-screen w-screen z-50 left-0 top-0 bg-white flex items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full items-center justify-center ">
        <div className="flex flex-col w-full items-center justify-center p-10">
          <div className="flex flex-col items-center gap-5">
            <img src={logo} alt="logo" className="w-[100px] md:mb-5" />
            <h1 className="font-bold text-[55px] md:text-[74px] text-green-800 mt-5">
              Welcome
            </h1>

            <form
              onSubmit={submitHandler}
              action=""
              className="flex flex-col w-full gap-5 text-gray-500"
            >
              <input
                type="email"
                name="email"
                onChange={changeHandler}
                required
                className="bg-[#EDEDED] w-full rounded p-2 px-4 focus:outline-none"
                placeholder="Email"
              />
              {error.email && (
                    <span className="text-[12px] py-2 text-red-600">
                      {error.email}
                    </span>
                  )}

              <div>
                <input
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  required
                  className="bg-[#EDEDED] w-full rounded p-2 px-4 focus:outline-none"
                  placeholder="Password"
                />
                {error.password && (
                    <span className=" text-[12px] py-2 text-red-600">
                      {error.password}
                    </span>
                  )}
              </div>

              <div className="flex gap-3">
                <input type="checkbox" className="bg-[#EDEDED] w-4" />
                <label htmlFor="" className="text-gray-400">
                  {" "}
                  Remember me
                </label>
              </div>

              <div className="flex mb-5">
                <button
                  type="submit"
                  className="flex bg-[#007A3F] text-white text-sm p-2 rounded px-5 hover:scale-105 ease-in-out duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full h-full hidden md:flex relative top-0  flex-col items-center justify-center">
          <img
            src={text}
            alt="bg-image"
            className="w-[500px] object-cover absolute text-center"
          />
          <img
            src={bgIMge}
            alt="bg-image"
            className="w-full h-[630px] 2xl:h-full object-cover"
          />
          <div className="bg-primary w-full h-[100px] flex items-center justify-center text-white">
            <h1 className="text-center md:w-2/3 text-sm">
              Thanal undertakes different activities to improve the quality of
              life of patients needing palliative and paraplegic care.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
