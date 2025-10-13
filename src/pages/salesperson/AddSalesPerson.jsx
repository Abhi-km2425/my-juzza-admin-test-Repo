import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReqLoader from "../../components/loader/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AddSalesPersonRoute } from "../../utils/Endpoint";


const AddSalesPerson = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [salesPersonData, setSalesPersonData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [createdSalesperson, setCreatedSalesperson] = useState(null);

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
      
      // Store the created salesperson data to display
      setCreatedSalesperson(response?.data?.data);
      
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

      {/* Success Message with Salesperson Details */}
      {createdSalesperson && (
        <div className="w-full mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-green-800 mb-4">Salesperson Created Successfully!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Employee ID:</p>
              <p className="font-semibold">{createdSalesperson.salesperson.employeeId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Referral Code:</p>
              <p className="font-semibold">{createdSalesperson.salesperson.referralCode}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Universal Referral Link:</p>
              <p className="font-mono text-blue-600 bg-blue-50 p-2 rounded break-all">
                {createdSalesperson.referralLink}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Initial Password:</p>
              <p className="font-semibold">{createdSalesperson.initialPassword}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Password Type:</p>
              <p className="font-semibold capitalize">{createdSalesperson.passwordType}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => navigate("/admin/salesperson")}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
            >
              View All Salespersons
            </button>
            <button
              onClick={() => setCreatedSalesperson(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Add Another
            </button>
          </div>
        </div>
      )}

      {loading && <ReqLoader />}
    </div>
  );
};

export default AddSalesPerson;
