import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { GetAOrders, UpdateOrderStatus } from "../../utils/Endpoint";
import { MdCall, MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import DetailedViewTable from "../../components/tables/DetailedViewTable";
import ReqLoader from "../../components/loader/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatDate } from "../../utils/DateFormat";

const DetailedView = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { id, userid } = useParams();
  const axios = useAxiosPrivate();

  const initialData = async () => {
    setLoading(true);
    const payLoad = {
      userId: userid,
      orderId: id,
    };
    await axios
      .post(GetAOrders, payLoad)
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const inputChangeHandler = async (e) => {
    setLoading(true);
    const selectValue = { status: e.target.value };
    try {
      const response = await axios.put(
        `${UpdateOrderStatus}/${id}`,
        selectValue
      );
      toast.success("Successfully Updated");
      initialData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex flex-col justify-between items-start">
        <h1 className="text font-bold md:text-2xl mt-3">
          <span className="text-primary">Order</span> #{id}
        </h1>
        {data?.order && data.order[0] && (
          <h1 className="font-medium text-gray-500 capitalize flex items-center gap-2 mt-2">
            <FaCalendarAlt />
            {formatDate(data.order[0].createdAt)}
            {/* monday 04-march-2024 */}
            <span className="bg-yellow-300 text-sm text-white px-5 rounded p-1">
              {data?.order[0]?.payment?.method}
            </span>
            <span className="bg-sky-300 text-sm text-white px-5 rounded p-1">
              {data?.orderStatus[0]}
            </span>
          </h1>
        )}
      </div>

      <div className="w-full mt-6 flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-4/6">
          <DetailedViewTable products={data} />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-2/6">
          <div className="border rounded p-5 bg-white shadow-lg ">
            <h1 className="font-semibold  mb-3 text-start">
              Update the status
            </h1>
            <select
              onChange={inputChangeHandler}
              name="status"
              id=""
              className=" border focus:outline-none p-2 w-full rounded py-3"
            >
              <option value="">Select Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="re-funded">Re-funded</option>
            </select>
          </div>
          <div className="border rounded p-5 bg-white shadow-lg ">
            <div className="text-start mb-2">
              <h1 className="font-semibold mb-3">Customer</h1>
              <h1 className="capitalize">{data?.userDetails?.name}</h1>
            </div>
            <hr />
            <div className="my-3 flex flex-col gap-2">
              <div className="flex gap-2 items-center ">
                <MdEmail className="text-gray-400" />
                <h1>{data?.userDetails?.email}</h1>
              </div>
              <div className="flex gap-2 items-center ">
                <MdCall className="text-gray-400" />
                <h1>{data?.userDetails?.number}</h1>
              </div>
            </div>
            <hr />
            <div className="text-start mt-5">
              <h1 className="font-semibold  mb-3 ">Shipping Address</h1>
              <p>
                {data?.address?.houseName}, {data?.address?.street}, <br />{" "}
                {data?.address?.city}, {data?.address?.phone} <br />
                pin : {data?.address?.postalCode}
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default DetailedView;
