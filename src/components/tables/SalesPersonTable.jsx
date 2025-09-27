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
  const [regionFilter, setRegionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Salespersons
  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GetallSalesPersonRoute}?page=${currentPage}&limit=10`);
        setData(res?.data?.salespersons || []); 
        setPagination(res?.data?.pagination || {});
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
      row.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      regionFilter === "All" || row.region === regionFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && row.status) ||
      (statusFilter === "Inactive" && !row.status);

    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Toggle status handler
  const clickDelete = (row) => {
    toast.info(`Toggling status for ${row.name}`);
   
  };

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
          placeholder="Search by name or email"
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
             
              <th className="py-2 px-4 border-b border-r">Status</th>
              <th className="py-2 px-4 border-b border-r">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
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
                  <td className="py-2 px-4 border-b border-r">{row?.phone}</td>
                  
                  <td className="py-2 px-4 border-b border-r">
                    {row?.status ? "Active" : "Inactive"}
                  </td>
                  <td className="py-2 px-4 border-b border-r">
                    <div className="flex justify-center gap-5 cursor-pointer">
                      <button
                        className="text-blue-500 underline"
                        onClick={() =>
                          navigate(`/admin/salesperson/${row._id}`)
                        }
                      >
                        View
                      </button>

                      <div>
                        {row?.availability ? (
                          <MdChecklistRtl
                            className="text-green-500"
                            onClick={() => clickDelete(row)}
                          />
                        ) : (
                          <MdFilterListOff
                            className="text-red-500"
                            onClick={() => clickDelete(row)}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
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
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  page === pagination.currentPage
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            
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
