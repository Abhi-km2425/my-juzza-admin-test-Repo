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
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch analytics data
        const analyticsRes = await axios.get(`${GetProductAnalytics}/${id}/analytics`);
        const apiData = analyticsRes.data.data;

        // Fetch recent sales for orders table
        const salesRes = await axios.get(`${GetProductAnalytics}/${id}/recent-sales?page=1&limit=20`);
        const salesData = salesRes.data.data;

        // Map the analytics API response
        const mappedData = {
          product: {
            _id: apiData.product?._id,
            p_name: apiData.product?.name,
            price: apiData.product?.price,
            totalSales: apiData.product?.totalSales || 0
          },
          summary: {
            totalOrders: apiData.summary?.total?.orders || 0,
            totalRevenue: apiData.summary?.total?.revenue || 0,
            attributedOrders: apiData.summary?.attributed?.orders || 0,
            attributedRevenue: apiData.summary?.attributed?.revenue || 0,
            anonymousOrders: apiData.summary?.anonymous?.orders || 0,
            anonymousRevenue: apiData.summary?.anonymous?.revenue || 0
          },
          statusBreakdown: apiData.statusBreakdown || {},
          analytics: {
            totalUnits: apiData.summary?.total?.orders || 0,
            totalRevenue: apiData.summary?.total?.revenue || 0,
            activeSalespersons: 0,
            salespersons: []
          }
        };

        // Map recent orders from sales data
        const mappedOrders = salesData.orders?.map(order => ({
          orderId: order.orderNumber || order._id,
          customerName: order.customer || 'N/A',
          quantity: order.product?.quantity || 0,
          amount: order.amount || '0',
          status: order.status || 'pending',
          date: order.createdAt,
          salesperson: order.salesperson ? `${order.salesperson.name} (${order.salesperson.code})` : 'Direct Sale'
        })) || [];

        // Group orders by salesperson to build salesperson performance table
        const salespersonMap = new Map();
        salesData.orders?.forEach(order => {
          if (order.salesperson) {
            const code = order.salesperson.code;
            if (!salespersonMap.has(code)) {
              salespersonMap.set(code, {
                name: order.salesperson.name,
                referralCode: code,
                salesCount: 0,
                revenue: 0,
                status: 'active'
              });
            }
            const sp = salespersonMap.get(code);
            sp.salesCount += 1;
            sp.revenue += parseFloat(order.amount || 0);
          }
        });

        mappedData.analytics.salespersons = Array.from(salespersonMap.values());
        mappedData.analytics.activeSalespersons = salespersonMap.size;

        setProductData(mappedData);
        setRecentOrders(mappedOrders);
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

  const { product, analytics, summary, statusBreakdown } = productData;

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

      {/* Stats Row - Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-800">
                {summary?.totalOrders || 0}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Units Sold */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Units Sold</p>
              <p className="text-2xl font-bold text-gray-800">
                {analytics?.totalQuantity || 0}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ₹{summary?.totalRevenue?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Salespersons */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Active Salespersons</p>
              <p className="text-2xl font-bold text-gray-800">
                {analytics?.activeSalespersons || 0}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Attributed Sales (via Salesperson) */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-800">Attributed Sales</h3>
            <div className="bg-green-200 p-2 rounded-full">
              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-green-600 text-xs mb-1">Orders</p>
              <p className="text-2xl font-bold text-green-900">{summary?.attributedOrders || 0}</p>
            </div>
            <div>
              <p className="text-green-600 text-xs mb-1">Revenue</p>
              <p className="text-2xl font-bold text-green-900">₹{summary?.attributedRevenue?.toLocaleString() || 0}</p>
            </div>
          </div>
          <p className="text-green-700 text-xs mt-3">Sales tracked through salesperson referrals</p>
        </div>

        {/* Anonymous Sales (Direct) */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Anonymous Sales</h3>
            <div className="bg-gray-200 p-2 rounded-full">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-xs mb-1">Orders</p>
              <p className="text-2xl font-bold text-gray-900">{summary?.anonymousOrders || 0}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{summary?.anonymousRevenue?.toLocaleString() || 0}</p>
            </div>
          </div>
          <p className="text-gray-700 text-xs mt-3">Direct sales without salesperson tracking</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Product Name</p>
            <p className="font-semibold">{product?.p_name}</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold">₹{product?.price}</p>
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
                  <th className="py-2 px-4 border text-left">Referral Code</th>
                  <th className="py-2 px-4 border text-center">Sales Count</th>
                  <th className="py-2 px-4 border text-center">Revenue</th>
                  <th className="py-2 px-4 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.salespersons.map((sp, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{sp.name}</td>
                    <td className="py-2 px-4 border font-mono text-sm text-blue-600">{sp.referralCode}</td>
                    <td className="py-2 px-4 border text-center">{sp.salesCount || 0}</td>
                    <td className="py-2 px-4 border text-center">₹{Math.round(sp.revenue || 0)}</td>
                    <td className="py-2 px-4 border text-center">
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
            <p>No salesperson sales data for this product yet</p>
            <p className="text-sm mt-1">Sales made through salesperson referrals will appear here</p>
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
                    <td className="py-2 px-4 border">{order.customerName}</td>
                    <td className="py-2 px-4 border text-center">{order.quantity}</td>
                    <td className="py-2 px-4 border">₹{order.amount}</td>
                    <td className="py-2 px-4 border">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border">{order.salesperson}</td>
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
