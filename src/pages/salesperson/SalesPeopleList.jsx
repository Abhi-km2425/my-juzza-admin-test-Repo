import { Link } from "react-router-dom";
import SalesPersonTable from "../../components/tables/SalesPersonTable";

const SalesPeopleList = () => {
  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>Salesperson Management</div>
        </h1>
        <Link to={"/admin/salesperson/add"}>
          <button className="bg-primary text-white text-sm p-3 rounded hover:scale-105 ease-in-out duration-300">
            Add New Salesperson
          </button>
        </Link>
      </div>

      <div className="w-full">
        <SalesPersonTable />
      </div>
    </div>
  );
};

export default SalesPeopleList;