import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaShoppingBag, FaToggleOn, FaToggleOff, FaKey } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetSalesPersonRoute, GetSalesPersonRecentSalesRoute, ToggleSalesPersonStatusRoute, ResetSalesPersonPasswordRoute } from "../../utils/Endpoint";

const ViewSalesPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [salespersonData, setSalespersonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  
  // Password Reset State
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  
  // Recent Sales State
  const [recentSales, setRecentSales] = useState([]);
  const [recentSalesLoading, setRecentSalesLoading] = useState(false);
  const [recentSalesPagination, setRecentSalesPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
    hasNext: false,
    hasPrev: false
  });
  const [currentSalesPage, setCurrentSalesPage] = useState(1);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${GetSalesPersonRoute}/${id}`);
        setSalespersonData(response.data.data); 
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.msg || "Failed to load salesperson");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesperson();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(fetchSalesperson, 30000);
    return () => clearInterval(intervalId);
  }, [id, axios]);

  // Fetch Recent Sales
  const fetchRecentSales = async (page = 1) => {
    try {
      setRecentSalesLoading(true);
      const response = await axios.get(`${GetSalesPersonRecentSalesRoute}/${id}/recent-sales?page=${page}&limit=10`);
      
      // Map the API response to the format needed for the table
      const orders = response.data.data.orders || [];
      const mappedOrders = orders.map(order => ({
        orderId: order._id,
        customerName: order.userId?.name || 'N/A',
        customerEmail: order.userId?.email || 'N/A',
        productName: order.proCartDetail && order.proCartDetail.length > 0 
          ? order.proCartDetail[0].p_name 
          : 'N/A',
        quantity: order.proCartDetail && order.proCartDetail.length > 0 
          ? order.proCartDetail.reduce((sum, item) => sum + (item.quantity || 1), 0)
          : 0,
        amount: order.payment?.amount || '0',
        status: order.status || 'pending',
        date: order.createdAt
      }));
      
      setRecentSales(mappedOrders);
      setRecentSalesPagination(response.data.data.pagination || {});
    } catch (error) {
      console.error("Error fetching recent sales:", error);
      toast.error("Failed to load recent sales");
    } finally {
      setRecentSalesLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecentSales(currentSalesPage);
    }
  }, [id, currentSalesPage]);

  // Recent Sales Pagination Handlers
  const handleSalesPageChange = (page) => {
    setCurrentSalesPage(page);
  };

  const handleSalesPrevPage = () => {
    if (recentSalesPagination.hasPrev) {
      setCurrentSalesPage(currentSalesPage - 1);
    }
  };

  const handleSalesNextPage = () => {
    if (recentSalesPagination.hasNext) {
      setCurrentSalesPage(currentSalesPage + 1);
    }
  };

  // Copy link to clipboard function
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

  // Toggle status function
  const toggleSalespersonStatus = async () => {
    const currentStatus = salespersonData?.salesperson?.status;
    const action = currentStatus === 'active' ? 'deactivate' : 'activate';
    
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this salesperson?`
    );
    
    if (!confirmed) return;

    try {
      setToggleLoading(true);
      const response = await axios.put(`${ToggleSalesPersonStatusRoute}/${id}/toggle-status`);
      
      toast.success(response?.data?.msg || "Status updated successfully!");
      
      // Update the local state with new status
      setSalespersonData(prevData => ({
        ...prevData,
        salesperson: {
          ...prevData.salesperson,
          status: response.data.data.status
        }
      }));
      
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(error?.response?.data?.msg || "Failed to update status");
    } finally {
      setToggleLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async () => {
    if (!newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setResetLoading(true);
      const response = await axios.post(`${ResetSalesPersonPasswordRoute}/${id}/password`, {
        newPassword: newPassword
      });
      
      toast.success(response?.data?.msg || "Password reset successfully!");
      
      // Close modal and reset form
      setPasswordResetModal(false);
      setNewPassword("");
      
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error?.response?.data?.msg || "Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!salespersonData) return <div className="p-6 text-center">No salesperson found.</div>;

  const { salesperson, salesLink, productSales, analytics } = salespersonData;

  return (
    <div className="p-3 space-y-6">
      {/* Back button */}
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 bg-primary rounded text-white hover:text-black hover:bg-gray-300"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        
        <div className="flex gap-3">
          {/* Reset Password Button */}
          <button
            onClick={() => setPasswordResetModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded font-semibold transition-colors bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          >
            <FaKey className="text-sm" />
            Reset Password
          </button>

          {/* Toggle Status Button */}
          <button
            onClick={toggleSalespersonStatus}
            disabled={toggleLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-colors ${
              salesperson?.status === 'active'
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            } ${toggleLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {toggleLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : salesperson?.status === 'active' ? (
              <FaToggleOn className="text-lg" />
            ) : (
              <FaToggleOff className="text-lg" />
            )}
            {toggleLoading 
              ? 'Updating...' 
              : salesperson?.status === 'active' 
                ? 'Deactivate Salesperson' 
                : 'Activate Salesperson'
            }
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold">Salesperson Details</h1>

      {/* Profile Box */}
      <div className="flex md:flex-row gap-5 flex-col justify-between items-center bg-white shadow rounded-lg p-6">
        <div className="flex md:flex-row flex-col items-center gap-4">
          <img
            src={salesperson?.photo || "https://via.placeholder.com/100"}
            alt={salesperson?.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{salesperson?.name}</h2>
            <p className="text-gray-600">{salesperson?.email}</p>
            <p className="text-gray-600">{salesperson?.phone}</p>
            <p className="text-sm text-gray-500">Employee ID: {salesperson?.employeeId}</p>
            <p className="text-sm text-gray-500">Created: {new Date(salesperson?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {salesperson?.status === 'active' ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Inactive
            </span>
          )}
          
          {/* Quick Toggle Button */}
          <button
            onClick={toggleSalespersonStatus}
            disabled={toggleLoading}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              salesperson?.status === 'active'
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            } ${toggleLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {toggleLoading ? 'Updating...' : 'Toggle Status'}
          </button>
        </div>
      </div>

      {/* Referral Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Referral Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Referral Code</p>
            <p className="text-xl font-mono font-bold text-blue-600">{salesperson?.referralCode}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Sales Link Status</p>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              salesLink?.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {salesLink?.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Universal Referral Link</p>
            <div className="flex items-center gap-3 mt-1">
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
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{salesperson?.metrics?.totalClicks || 0}</p>
            <p className="text-gray-500 text-sm">Total Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{salesperson?.metrics?.totalConversions || 0}</p>
            <p className="text-gray-500 text-sm">Total Conversions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">₹{salesperson?.metrics?.totalRevenue || 0}</p>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{analytics?.performance?.conversionRate || '0%'}</p>
            <p className="text-gray-500 text-sm">Conversion Rate</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{analytics?.orders?.total || 0}</p>
            <p className="text-gray-500 text-sm">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">₹{analytics?.revenue?.averageOrderValue || 0}</p>
            <p className="text-gray-500 text-sm">Average Order Value</p>
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      {analytics?.orders && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Orders by Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{analytics.orders.total}</p>
              <p className="text-gray-500 text-sm">Total Orders</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <p className="text-2xl font-bold text-yellow-600">{analytics.orders.pending}</p>
              <p className="text-gray-500 text-sm">Pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <p className="text-2xl font-bold text-green-600">{analytics.orders.successful}</p>
              <p className="text-gray-500 text-sm">Successful</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sales Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaShoppingBag className="text-blue-500" /> Recent Sales
        </h3>
        {recentSalesLoading ? (
          <div className="text-center py-4">Loading recent sales...</div>
        ) : recentSales && recentSales.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Customer</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Product</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Quantity</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentSales.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm font-mono">{sale.orderId}</td>
                      <td className="py-2 px-4 text-sm">{sale.customerName}</td>
                      <td className="py-2 px-4 text-sm">{sale.productName}</td>
                      <td className="py-2 px-4 text-sm text-center">{sale.quantity}</td>
                      <td className="py-2 px-4 text-sm">₹{sale.amount}</td>
                      <td className="py-2 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                          sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          sale.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          sale.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm">{new Date(sale.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Sales Pagination */}
            {recentSalesPagination.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="text-sm text-gray-600">
                  Showing {((recentSalesPagination.currentPage - 1) * 10) + 1} to {Math.min(recentSalesPagination.currentPage * 10, recentSalesPagination.totalOrders)} of {recentSalesPagination.totalOrders} recent sales
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSalesPrevPage}
                    disabled={!recentSalesPagination.hasPrev}
                    className={`px-3 py-1 rounded border ${
                      recentSalesPagination.hasPrev 
                        ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300' 
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, recentSalesPagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (recentSalesPagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (recentSalesPagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (recentSalesPagination.currentPage >= recentSalesPagination.totalPages - 2) {
                      pageNum = recentSalesPagination.totalPages - 4 + i;
                    } else {
                      pageNum = recentSalesPagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handleSalesPageChange(pageNum)}
                        className={`px-3 py-1 rounded border ${
                          pageNum === recentSalesPagination.currentPage
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={handleSalesNextPage}
                    disabled={!recentSalesPagination.hasNext}
                    className={`px-3 py-1 rounded border ${
                      recentSalesPagination.hasNext 
                        ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300' 
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaShoppingBag className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>No recent sales data available</p>
          </div>
        )}
      </div>

      {/* Password Reset Modal */}
      {passwordResetModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 pb-4 border-b">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <IoClose
                onClick={() => {
                  setPasswordResetModal(false);
                  setNewPassword("");
                }}
                className="cursor-pointer text-2xl hover:text-red-500"
              />
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  Reset password for <strong>{salesperson?.name}</strong>
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (minimum 6 characters)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>• Password must be at least 6 characters long</p>
                <p>• The salesperson will need to use this new password to login</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 pt-4 border-t bg-gray-50">
              <button
                onClick={() => {
                  setPasswordResetModal(false);
                  setNewPassword("");
                }}
                className="px-4 py-2 border rounded hover:bg-gray-50 bg-white"
                disabled={resetLoading}
              >
                Cancel
              </button>
              <button
                onClick={resetPassword}
                disabled={resetLoading || !newPassword.trim()}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {resetLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Resetting...
                  </>
                ) : (
                  <>
                    <FaKey className="text-sm" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ViewSalesPerson;

