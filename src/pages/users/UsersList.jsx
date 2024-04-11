import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../../components/Pagination";
import ReqLoader from "../../components/loader/ReqLoader";
import UsersTable from "../../components/tables/UsersTable";

const UsersList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const axios = useAxiosPrivate();

  const initialData = async () => {
    setLoading(true);
    await axios
      .get(GetUsers)
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

  useEffect(() => {
    initialData();
  }, []);
  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>Users</div>
        </h1>
      </div>

      <div className="w-full">
        <UsersTable data={data} page={page} setLoading={setLoading} cb={initialData} />
        <div className="flex items-end justify-end mt-5">
          <Pagination />
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default UsersList;
