import { useEffect, useState } from "react";
import { GetAllOrders } from "../../utils/Endpoint";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/tables/OrderTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../../components/Pagination";
import ReqLoader from "../../components/loader/ReqLoader";

const OrdersList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const [status, setStatus] = useState("")

  // Delete from the Table
  const DetailedViewHandler = async (data) => {
    setLoading(true);
    navigate(`/admin/order/view/${data?._id}/${data?.user?._id}`);
  };

  const initialData = async () => {
    setLoading(true);
    await axios
      .get(`${GetAllOrders}?status=${status}`)
      .then((res) => {
        setData(res?.data?.orderList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    initialData();
  }, [status]);

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>Orders</div>
        </h1>

        <select
          onChange={(e)=> setStatus(e.target.value)}
          name="status"
          id=""
          className="w-fit border focus:outline-none p-2 rounded py-3"
        >
          <option value="">Select Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="re-funded">Re-funded</option>
        </select>

      </div>

      <div className="w-full">
        <OrderTable data={data} clickDelete={DetailedViewHandler} page={page} />
        <div className="flex items-end justify-end mt-5">
          <Pagination />
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default OrdersList;
