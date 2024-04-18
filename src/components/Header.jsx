import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import logo from "../../public/assets/Logo/logo-juzza.png";
import { logout } from "../redux/slices/AuthSlicer";
import { logoutRoute } from "../utils/Endpoint";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { setAccessToken, setRefreshToken } from "../redux/slices/TokenReducer";

const Header = ({ sideData }) => {
  const axiosInstance = useAxiosPrivate();

  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
      setModal(false);
    }
  };

  const LogoutHandler = async () => {
    await axiosInstance
      .get(logoutRoute)
      .then((res) => {
        dispatch(logout());
        dispatch(setRefreshToken(null));
        dispatch(setAccessToken(null));
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* Mobile view */}
      <nav className="container mx-auto w-full md:hidden flex items-center justify-between py-5 px-2 relative 0 z-50">
        <div
          onClick={() => {
            navigate("/dashboard");
            setModal(false);
          }}
        >
          <img src={logo} alt="Logo" className="w-10" />
        </div>

        <IoMenu size={35} onClick={() => setModal(!modal)} />
        {modal && (
          <div className="w-full flex flex-col items-start gap-2 absolute bg-white top-14 right-0 border shadow-lg p-3">
            <div className="w-full flex justify-between items-center border p-3 rounded">
              <div className="text-xs flex flex-col items-start">
                <h2 className="font-semibold">Juza</h2>
              </div>
              <div>
                <img
                  src="/assets/images/avatar.png"
                  alt="profile"
                  className="w-10 bg-black rounded-full"
                />
              </div>
              <div onClick={LogoutHandler}>
                <CiLogin
                  size={40}
                  className="hover:scale-105 ease-in-out duration-400 cursor-pointer text-primary"
                />
              </div>
            </div>

            <div className="w-full flex gap-2">
              <input
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
                type=" text"
                className="border border-gray-300 rounded-md p-1.5 text-sm w-full px-3 focus:outline-none"
                placeholder="Search Patients"
              />
              <div className="border border-gray-300 rounded-md p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 hover:bg-primary  hover:text-white">
                <IoSearchOutline
                  size={20}
                  onClick={() => {
                    navigate(`/search?query=${search}`);
                    setModal(false);
                  }}
                />
              </div>
            </div>

            {sideData.map((items, i) => (
              <Link
                onClick={() => setModal(false)}
                to={items?.path}
                key={i}
                className="w-full flex justify-between items-center border p-2 rounded hover:scale-105 ease-in-out duration-300"
              >
                <div className="text-xs flex flex-col items-center ">
                  <h2 className="font-semibold">{items?.name}</h2>
                </div>
                <div>{items?.icon}</div>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Web view  */}
      <nav className="container mx-auto hidden md:flex items-center justify-between py-5">
        <div onClick={() => navigate("/dashboard")} className="md:ms-28">
          <img src={logo} alt="Logo" className="w-10" />
        </div>

        <div className="">
          <h1 className="font-bold text-2xl">Admin DashBoard</h1>
        </div>
        <div className="flex items-center gap-2">
          <div onClick={LogoutHandler}>
            <CiLogin
              size={40}
              className="hover:scale-105 ease-in-out duration-400 cursor-pointer text-primary"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
