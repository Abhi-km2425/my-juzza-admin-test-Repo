import { useEffect, useState } from "react";
import { couponJson } from "../../datas/dropDatas";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReqLoader from "../../components/loader/ReqLoader";
import { AddCouponRoute } from "../../utils/Endpoint";

const AddNewCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [CouponData, setCouponData] = useState({
    couponName: "",
    couponValue: "",
    expiryDate: "",
    maxValue: "",
    minValue: "",

  });
  const axios = useAxiosPrivate();

  const onChangeHandler = (e) => {
    setCouponData({
      ...CouponData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(CouponData).some(
      (value) => typeof value === "string" && value.trim() === ""
    );

    if (isEmpty) {
      toast.warning("Please fill out all fields before submitting.");
      return;
    }

    // const formDataToSend = new FormData();
    // formDataToSend.append("couponName", CouponData.couponName);
    // formDataToSend.append("couponValue", CouponData.couponValue);
    // formDataToSend.append("expiryDate", CouponData.expiryDate);
    // formDataToSend.append("maxValue", CouponData.maxValue);
    // formDataToSend.append("minValue", CouponData.minValue);
   

    try {
      console.log("adding", CouponData);
      setLoading(true);
      const response = await axios.post(AddCouponRoute, CouponData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success(response?.data?.msg);
      setCouponData({
        couponName: "",
        couponValue: "",
        expiryDate: "",
        maxValue: "",
        minValue: "",

      });
      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(CouponData)

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>New Coupon</div>
        </h1>
        <button
          onClick={handleSubmit}
          className="p-2 px-5 bg-green-500 rounded text-white text-sm hover:bg-primary hover:scale-105 ease-in-out duration-300"
        >
          Submit
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="bg-white w-full md:w-4/6 p-5 pb-10 rounded ">
          <h1 className="text-start font-bold text-xl pb-5">Coupon</h1>
          <form action="" className="w-full flex flex-col gap-4">

            <div className="flex flex-wrap ">
              {couponJson.map((items, i) => (
                <div
                  key={items?.id}
                  className="flex flex-col gap-1 w-full md:w-1/2 p-1"
                >
                  <label htmlFor="" className="text-start">
                    {items?.label}
                  </label>
                  <input
                    onChange={onChangeHandler}
                    value={CouponData[items?.name]}
                    type={items?.type}
                    name={items?.name}
                    placeholder={items?.placeHolder}
                    required
                    className="w-full border p-2 text-sm rounded focus:outline-none"
                  />
                </div>
              ))}
            </div>


          </form>
        </div>

      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default AddNewCoupon;
