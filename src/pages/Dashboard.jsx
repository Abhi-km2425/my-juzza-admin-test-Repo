
import ReqLoader from "../components/loader/ReqLoader";
import { useState } from "react";


const Dashboard = () => {
  const [loading, setLoading] = useState(false);


  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          Dashboard
        </h1>

      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default Dashboard;
