import { useEffect, useState } from "react";
import { FaBoxOpen, FaChartLine, FaDollarSign, FaUsers, FaUserCheck, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetProductAnalytics } from "../../utils/Endpoint";

const ProductAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API state
  const [productData, setProductData] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${GetProductAnalytics}/${id}`);
        const data = res.data.data;

        setProductData(data);
      } catch (err) {
        console.error("Error fetching product analytics:", err);
        setError(err?.response?.data?.msg || "Failed to load product analytics");
        toast.error(err?.response?.data?.msg || "Failed to load product analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id, axios]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (!productData) {
    return <div className="p-6 text-center">No data available</div>;
  }

  const { product, analytics, recentOrders } = productData;

  return (
    <div className="p-3 space-y-6">
      {/* Back button */}
      <div className="flex justify-start">
        <button
          className="px-4 py-2 bg-primary rounded text-white hover:text-black hover:bg-gray-300"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="font-normal">Product Analytics: </span>
          {product?.p_name}
        </h1>
        <div className="text-sm text-gray-500">
          Product ID: {product?._id}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaChartLine className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Sales</p>
            <p className="text-lg font-bold">{product?.totalSales || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBoxOpen className="text-green-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Units Sold</p>
            <p className="text-lg font-bold">{analytics?.totalUnits || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaDollarSign className="text-purple-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="text-lg font-bold">₹{analytics?.totalRevenue || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUserCheck className="text-orange-500 text-2xl" />
          <div>
            <p className="text-gray-500">Active Salespersons</p>
            <p className="text-lg font-bold">{analytics?.activeSalespersons || 0}</p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">Product Name</p>
            <p className="font-semibold">{product?.p_name}</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">₹{product?.price}</p>
          </div>
          <div>
            <p className="text-gray-500">Category ID</p>
            <p className="font-semibold font-mono text-sm">{product?.category}</p>
          </div>
        </div>
      </div>

      {/* Salespersons Analytics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaUsers className="text-orange-500" /> Salespersons Performance
        </h2>
        {analytics?.salespersons && analytics.salespersons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border text-left">Name</th>
                  <th className="py-2 px-4 border text-left">Email</th>
                  <th className="py-2 px-4 border text-left">Employee ID</th>
                  <th className="py-2 px-4 border text-left">Referral Code</th>
                  <th className="py-2 px-4 border text-left">Sales Count</th>
                  <th className="py-2 px-4 border text-left">Revenue</th>
                  <th className="py-2 px-4 border text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.salespersons.map((sp, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{sp.name}</td>
                    <td className="py-2 px-4 border">{sp.email}</td>
                    <td className="py-2 px-4 border font-mono text-sm">{sp.employeeId}</td>
                    <td className="py-2 px-4 border font-mono text-sm text-blue-600">{sp.referralCode}</td>
                    <td className="py-2 px-4 border text-center">{sp.salesCount || 0}</td>
                    <td className="py-2 px-4 border text-center">₹{sp.revenue || 0}</td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        sp.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {sp.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaUsers className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No salespersons assigned to this product</p>
          </div>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaShoppingCart className="text-green-500" /> Recent Orders
        </h2>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border text-left">Order ID</th>
                  <th className="py-2 px-4 border text-left">Customer</th>
                  <th className="py-2 px-4 border text-left">Quantity</th>
                  <th className="py-2 px-4 border text-left">Amount</th>
                  <th className="py-2 px-4 border text-left">Status</th>
                  <th className="py-2 px-4 border text-left">Date</th>
                  <th className="py-2 px-4 border text-left">Salesperson</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border font-mono text-sm">{order.orderId}</td>
                    <td className="py-2 px-4 border">{order.customerName}</td>
                    <td className="py-2 px-4 border text-center">{order.quantity}</td>
                    <td className="py-2 px-4 border">₹{order.amount}</td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{order.salesperson || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaShoppingCart className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No recent orders for this product</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sales Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-600">Total Sales:</span>
              <span className="font-semibold text-blue-800">{product?.totalSales || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Units Sold:</span>
              <span className="font-semibold text-blue-800">{analytics?.totalUnits || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Revenue Generated:</span>
              <span className="font-semibold text-blue-800">₹{analytics?.totalRevenue || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Salesperson Metrics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-600">Total Assigned:</span>
              <span className="font-semibold text-green-800">{analytics?.salespersons?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Active Salespersons:</span>
              <span className="font-semibold text-green-800">{analytics?.activeSalespersons || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Recent Orders:</span>
              <span className="font-semibold text-green-800">{recentOrders?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
