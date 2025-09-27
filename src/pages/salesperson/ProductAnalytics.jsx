import { useEffect, useState } from "react";
import { FaBoxOpen, FaChartLine, FaDollarSign, FaMoneyBillWave, FaMousePointer, FaUserCheck, FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetProductAnalytics } from "../../utils/Endpoint";

const ProductAnalytics = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();

  const [filters, setFilters] = useState({
    date: "last30",
    region: "all",
    salesperson: "all",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API state
  const [product, setProduct] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${GetProductAnalytics}/${id}`);
        const data = res.data;

        setProduct(data.product);
        setAnalytics(data.analytics);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id, filters, axios]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-3 space-y-6">
      {/* Back button */}
      <div className="flex justify-start">
        <button
          className="px-4 py-2 bg-primary rounded text-white hover:text-black hover:bg-gray-300"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"><span className="font-normal">Product: </span>{product?.p_name}</h1>
        {/* <p className="text-gray-600">Product ID: {product?._id}</p> */}
      </div>

      {/* Stats Row */}
      <div className="grid xl:grid-cols-4  grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaChartLine className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Sales</p>
            <p className="text-lg font-bold">{product?.totalSales}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaDollarSign className="text-green-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Quantity Sold</p>
            <p className="text-lg font-bold">{analytics?.totalQuantitySold}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBoxOpen className="text-purple-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="text-lg font-bold">{analytics?.totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBoxOpen className="text-orange-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <p className="text-lg font-bold">{analytics?.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Salespersons Table */}
      <div className="bg-white shadow rounded-lg p-6 overflow-scroll">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaUsers className="text-orange-500" /> Salespersons Analytics
        </h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Employee ID</th>
              <th className="py-2 px-4 border">Sales Count</th>
              <th className="py-2 px-4 border">Clicks</th>
              <th className="py-2 px-4 border">Revenue</th>
              <th className="py-2 px-4 border">Sales Link Code</th>
              <th className="py-2 px-4 border">Conversion Rate</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.salespersons?.length > 0 ? (
              analytics.salespersons.map((sp) => (
                <tr key={sp.salesperson._id} className="text-center">
                  <td className="py-2 px-4 border">{sp.salesperson.name}</td>
                  <td className="py-2 px-4 border">{sp.salesperson.email}</td>
                  <td className="py-2 px-4 border">{sp.salesperson.employeeId}</td>
                  <td className="py-2 px-4 border">{sp.salesCount}</td>
                  <td className="py-2 px-4 border">{sp.clickCount}</td>
                  <td className="py-2 px-4 border">{sp.revenue}</td>
                  <td className="py-2 px-4 border">{sp.salesLinkCode}</td>
                  <td className="py-2 px-4 border">{sp.conversionRate}</td>
                  <td className="py-2 px-4 border">
                    {sp.active ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-gray-500">
                  No salespersons assigned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


{/* Overall Analytics Summary */}
<div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-6">Overall Summary</h2>

  <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
    <div className="bg-gray-50 shadow-sm rounded-lg p-4 flex flex-col items-center">
      <FaUsers className="text-blue-500 text-2xl mb-2" />
      <p className="text-gray-500">Total Assigned Salespersons</p>
      <p className="text-lg font-bold">{analytics?.totalAssignedSalespersons}</p>
    </div>

    <div className="bg-gray-50 shadow-sm rounded-lg p-4 flex flex-col items-center">
      <FaUserCheck className="text-green-500 text-2xl mb-2" />
      <p className="text-gray-500">Active Salespersons</p>
      <p className="text-lg font-bold">{analytics?.activeSalespersons}</p>
    </div>

    <div className="bg-gray-50 shadow-sm rounded-lg p-4 flex flex-col items-center">
      <FaMousePointer className="text-purple-500 text-2xl mb-2" />
      <p className="text-gray-500">Total Sales Link Clicks</p>
      <p className="text-lg font-bold">{analytics?.totalSalesLinkClicks}</p>
    </div>

    <div className="bg-gray-50 shadow-sm rounded-lg p-4 flex flex-col items-center">
      <FaMoneyBillWave className="text-yellow-500 text-2xl mb-2" />
      <p className="text-gray-500">Total Sales Link Revenue</p>
      <p className="text-lg font-bold">{analytics?.totalSalesLinkRevenue}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProductAnalytics;
