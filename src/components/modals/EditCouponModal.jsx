import { IoClose } from "react-icons/io5";
import { couponJson } from "../../datas/dropDatas";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReqLoader from "../loader/ReqLoader";
import { UpdateCouponRoute } from "../../utils/Endpoint";

const EditCouponModal = ({ setEditModal, cb, data }) => {
  const [loading, setLoading] = useState(false);
  const [CouponData, setCouponData] = useState({
    _id: data?._id,
    couponName: data?.couponName,
    couponValue: data?.couponValue,
    expiryDate: data?.expiryDate?.split('T')[0],
    maxValue: data?.maxValue,
    minValue: data?.minValue,
    isActive: data?.isActive,
  });

  const axios = useAxiosPrivate();

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true);
      console.log('editing', CouponData);

      const response = await axios.put(UpdateCouponRoute + '/'+ data?._id, CouponData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(response?.data?.msg);
      setEditModal(false);
      cb();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = async (e) => {
    setCouponData({
      ...CouponData,
      [e.target.name]: e.target.value,
    });
  };

 

  useEffect(() => {
    // setLoading(true);
    
  }, []);

  console.log(CouponData)

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full h-[500px] md:h-fit  mt-20 md:mt-0  md:w-1/2 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-[2vh]">
        <h1 className="font-bold text-center text-xl text-primary">
          Edit Coupon
        </h1>
        <IoClose
          onClick={() => setEditModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
        />

        <div className="w-full">
          <form action="" onSubmit={submitHandler}>

            <div className="flex flex-wrap ">
              {couponJson.map((items) => (
                <div
                  key={items?.id}
                  className="flex flex-col gap-1 w-full md:w-1/2 p-1"
                >
                  <label htmlFor="" className="text-start">
                    {items?.label}
                  </label>
                  <input
                    onChange={onChangeHandler}
                    type={items?.type}
                    name={items?.name}
                    placeholder={items?.placeHolder}
                    value={CouponData[items?.name]}
                    className="w-full border p-2 text-sm rounded focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="bg-primary p-2 px-5 rounded text-white text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default EditCouponModal;
