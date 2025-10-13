import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { salespersonRecentSalesRoute } from "../../utils/Endpoint";
import ReqLoader from "../../components/loader/ReqLoader";

const SalesPerformance = () => {
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
    hasNext: false,
    hasPrev: false
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${salespersonRecentSalesRoute}?page=${currentPage}&limit=10`);
        setOrders(response.data.data.orders || []);
        setPagination(response.data.data.pagination || {});
      } catch (error) {
        console.error("Error fetching sales:", error);
        toast.error(error?.response?.data?.msg || "Failed to load sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [axios, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (pagination.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && currentPage === 1) {
    return <ReqLoader />;
  }

  return (
    <div className="p-3 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaShoppingCart className="text-3xl text-primary" />
          <h1 className="text-2xl font-bold text-primary">Sales Performance</h1>
        </div>
        <div className="text-sm text-gray-600">
          Total Sales: <span className="font-bold text-primary">{pagination.totalOrders}</span>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading && currentPage !== 1 ? (
          <div className="text-center py-8">Loading...</div>
        ) : orders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium">Order ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Customer</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Products</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Payment Method</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order._id || index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">
                        #{order._id?.slice(-8).toUpperCase() || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div>
                          <div className="font-medium">{order.userId?.name || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{order.userId?.email || ''}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {order.products && order.products.length > 0 ? (
                          <div className="space-y-1">
                            {order.products.map((product, idx) => (
                              <div key={idx} className="text-xs">
                                <div className="font-medium">{product.p_name}</div>
                                <div className="text-gray-500">Qty: {product.quantity || 'N/A'}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold">
                        ₹{order.payment?.amount || 0}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">
                          {order.payment?.method || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 border-t flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalOrders)} of {pagination.totalOrders} orders
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={!pagination.hasPrev}
                    className={`px-3 py-1 rounded border ${
                      pagination.hasPrev 
                        ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300' 
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 rounded border ${
                          pageNum === pagination.currentPage
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={handleNextPage}
                    disabled={!pagination.hasNext}
                    className={`px-3 py-1 rounded border ${
                      pagination.hasNext 
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
          <div className="text-center py-12">
            <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No sales data available</p>
            <p className="text-gray-400 text-sm mt-2">Start making sales to see them here</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-900">{pagination.totalOrders}</p>
            <p className="text-xs text-blue-600 mt-1">Showing page {pagination.currentPage} of {pagination.totalPages}</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Page Revenue</h3>
            <p className="text-3xl font-bold text-green-900">
              ₹{orders.reduce((sum, order) => sum + (parseFloat(order.payment?.amount) || 0), 0).toFixed(2)}
            </p>
            <p className="text-xs text-green-600 mt-1">Current page total</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Delivered Orders</h3>
            <p className="text-3xl font-bold text-orange-900">
              {orders.filter(order => order.status === 'delivered').length}
            </p>
            <p className="text-xs text-orange-600 mt-1">Successfully delivered</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPerformance;
