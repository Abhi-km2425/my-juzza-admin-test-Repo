import { useEffect, useState } from "react";
import { FaChartLine, FaDollarSign, FaMousePointer, FaShoppingCart, FaKey } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { salespersonDashboardRoute } from "../../utils/Endpoint";
import ReqLoader from "../../components/loader/ReqLoader";

const SalespersonDashboard = () => {
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get(salespersonDashboardRoute);
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        toast.error(error?.response?.data?.msg || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [axios]);

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  if (loading) {
    return <ReqLoader />;
  }

  if (!dashboardData) {
    return <div className="p-6 text-center">No data available</div>;
  }

  const { salesperson, salesLink, productSales, recentOrders, summary } = dashboardData;

  return (
    <div className="p-3 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Welcome, {salesperson?.name}!
        </h1>
        <p className="text-gray-600">Employee ID: {salesperson?.employeeId}</p>
        <p className="text-gray-600">Referral Code: <span className="font-mono font-bold text-blue-600">{salesperson?.referralCode}</span></p>
      </div>

      {/* Universal Referral Link */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Universal Referral Link</h3>
        <div className="flex items-center gap-3">
          <p className="flex-1 text-sm font-mono bg-gray-100 px-3 py-2 rounded border break-all">
            {salesperson?.universalReferralLink}
          </p>
          <button
            onClick={() => copyToClipboard(salesperson?.universalReferralLink)}
            className="p-2 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="Copy link"
          >
            <MdContentCopy 
              className={`text-lg ${copiedLink ? 'text-green-500' : 'text-gray-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaMousePointer className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Clicks</p>
            <p className="text-2xl font-bold">{summary?.totalClicks || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaShoppingCart className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Conversions</p>
            <p className="text-2xl font-bold">{summary?.totalConversions || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaDollarSign className="text-purple-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₹{summary?.totalRevenue || 0}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaChartLine className="text-orange-500 text-3xl" />
          <div>
            <p className="text-gray-500 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold">{summary?.conversionRate || "0%"}</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Sales Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-600">Total Products:</span>
              <span className="font-semibold text-blue-800">{summary?.totalProducts || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Average Order Value:</span>
              <span className="font-semibold text-blue-800">₹{summary?.averageOrderValue || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Link Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                salesLink?.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {salesLink?.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Account Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-600">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                salesperson?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {salesperson?.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Email:</span>
              <span className="font-semibold text-green-800">{salesperson?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">Phone:</span>
              <span className="font-semibold text-green-800">{salesperson?.phone || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Sales Performance */}
      {productSales && productSales.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Product Sales Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Product</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Sales Count</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Clicks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productSales.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 text-sm">{product.productName}</td>
                    <td className="py-2 px-4 text-sm">{product.salesCount}</td>
                    <td className="py-2 px-4 text-sm">₹{product.revenue}</td>
                    <td className="py-2 px-4 text-sm">{product.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      {recentOrders && recentOrders.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 text-sm font-mono">{order.orderId}</td>
                    <td className="py-2 px-4 text-sm">{order.customerName}</td>
                    <td className="py-2 px-4 text-sm">₹{order.amount}</td>
                    <td className="py-2 px-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalespersonDashboard;
