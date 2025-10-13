import { useEffect, useState } from "react";
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetallSalesPersonRoute } from "../../utils/Endpoint";

const SalesPersonTable = () => {
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  // State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSalespersons: 0,
    hasNext: false,
    hasPrev: false
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Salespersons
  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GetallSalesPersonRoute}?page=${currentPage}&limit=10`);
        setData(res?.data?.data?.salespersons || []); 
        setPagination(res?.data?.data?.pagination || {});
      } catch (error) {
        console.error("Error fetching salespersons:", error);
        toast.error(error?.response?.data?.msg || "Failed to load salespersons");
      } finally {
        setLoading(false);
      }
    };

    fetchSalespersons();
  }, [axios, currentPage]);

  // Filtered Data
  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && (row.status === "active" || row.status === "true")) ||
      (statusFilter === "Inactive" && (row.status === "inactive" || row.status === "false"));

    return matchesSearch && matchesStatus;
  });

  // Page navigation handlers
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

  return (
    <div className="space-y-4">
      {/* 🔍 Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or employee ID"
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-2 px-4 border-b border-r">Name</th>
              <th className="py-2 px-4 border-b border-r">Email</th>
              <th className="py-2 px-4 border-b border-r">Phone</th>
              <th className="py-2 px-4 border-b border-r">Employee ID</th>
              <th className="py-2 px-4 border-b border-r">Referral Code</th>
              <th className="py-2 px-4 border-b border-r">Clicks</th>
              <th className="py-2 px-4 border-b border-r">Revenue</th>
              <th className="py-2 px-4 border-b border-r">Status</th>
              <th className="py-2 px-4 border-b border-r">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row._id}>
                  <td className="py-2 px-4 border-b border-r capitalize">
                    {row?.name}
                  </td>
                  <td className="py-2 px-4 border-b border-r">{row?.email}</td>
                  <td className="py-2 px-4 border-b border-r">{row?.phone || 'N/A'}</td>
                  <td className="py-2 px-4 border-b border-r font-mono text-sm">
                    {row?.employeeId}
                  </td>
                  <td className="py-2 px-4 border-b border-r font-mono text-sm text-blue-600">
                    {row?.referralCode}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {row?.salesLink?.clicks || row?.metrics?.totalClicks || 0}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    ₹{row?.salesLink?.revenue || row?.metrics?.totalRevenue || 0}
                  </td>
                  <td className="py-2 px-4 border-b border-r">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      (row?.status === 'active' || row?.status === 'true') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(row?.status === 'active' || row?.status === 'true') ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-r">
                    <div className="flex justify-center gap-3">
                      <button
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                        onClick={() => navigate(`/admin/salesperson/${row._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalSalespersons)} of {pagination.totalSalespersons} salespersons
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
    </div>
  );
};

export default SalesPersonTable;
