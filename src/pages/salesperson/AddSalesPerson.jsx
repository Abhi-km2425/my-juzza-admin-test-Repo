import { useState } from "react";
import { toast } from "react-toastify";
import ReqLoader from "../../components/loader/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AddSalesPersonRoute } from "../../utils/Endpoint"; // <-- define this in your endpoints

const AddSalesPerson = () => {
  const [loading, setLoading] = useState(false);
  const [salesPersonData, setSalesPersonData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const axios = useAxiosPrivate();

  const onChangeHandler = (e) => {
    setSalesPersonData({
      ...salesPersonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(salesPersonData).some(
      (value) => typeof value === "string" && value.trim() === ""
    );

    if (isEmpty) {
      toast.warning("Please fill out all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(AddSalesPersonRoute, salesPersonData);
      toast.success(response?.data?.msg || "Salesperson added successfully!");

      setSalesPersonData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
        
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>New Salesperson</div>
        </h1>
        <button
          onClick={handleSubmit}
          className="p-2 px-5 bg-green-500 rounded text-white text-sm hover:bg-primary hover:scale-105 ease-in-out duration-300"
        >
          Submit
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="bg-white w-full p-5 pb-10 rounded">
          <h1 className="text-start font-bold text-xl pb-5">Salesperson Info</h1>
          <form className="w-full flex flex-col gap-4">
            <div className="flex flex-wrap">
              <div className="flex flex-col gap-1 w-full md:w-1/2 p-1">
                <label className="text-start">Name</label>
                <input
                  onChange={onChangeHandler}
                  value={salesPersonData.name}
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  className="w-full border p-2 text-sm rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 w-full md:w-1/2 p-1">
                <label className="text-start">Email</label>
                <input
                  onChange={onChangeHandler}
                  value={salesPersonData.email}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full border p-2 text-sm rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 w-full md:w-1/2 p-1">
                <label className="text-start">Phone</label>
                <input
                  onChange={onChangeHandler}
                  value={salesPersonData.phone}
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full border p-2 text-sm rounded focus:outline-none"
                />
              </div>

             
              <div className="flex flex-col gap-1 w-full md:w-1/2 p-1">
                <label className="text-start">Password</label>
                <input
                  onChange={onChangeHandler}
                  value={salesPersonData.password}
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full border p-2 text-sm rounded focus:outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default AddSalesPerson;
