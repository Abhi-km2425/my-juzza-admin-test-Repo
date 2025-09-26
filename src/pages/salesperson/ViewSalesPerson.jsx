import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdCheckCircle, MdCancel, MdPending } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetProducts, GetSalesPersonRoute, GetSalesPersonProductsRoute, UpdateSalesPersonProductsRoute } from "../../utils/Endpoint";

const ViewSalesPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [salesperson, setSalesperson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignProductModal, setAssignProductModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [assignedProductIds, setAssignedProductIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${GetSalesPersonRoute}/${id}`);
        setSalesperson(response.data.salesperson); 
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.msg || "Failed to load salesperson");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesperson();
  }, [id, axios]);

  // Fetch all products for assignment with pagination
  const fetchAllProducts = async (page = 1, limit = pageSize) => {
    try {
      setProductLoading(true);
      const response = await axios.get(`${GetProducts}`);
      // Since API doesn't support pagination, we'll handle it client-side
      const allProds = response.data || [];
      setTotalProducts(allProds.length);
      
      // Client-side pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = allProds.slice(startIndex, endIndex);
      setAllProducts(paginatedProducts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setProductLoading(false);
    }
  };

  // Fetch assigned products for this salesperson - no pagination
  const fetchAssignedProducts = async () => {
    try {
      const response = await axios.get(`${GetSalesPersonProductsRoute}/${id}/products?page=1&limit=100`);
      const assignedIds = response.data?.assignedProducts?.map(item => item.product._id) || [];
      setAssignedProductIds(assignedIds);
      setSelectedProducts(assignedIds);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch assigned products");
    }
  };

  // Handle opening assign product modal
  const handleAssignProductClick = async () => {
    setAssignProductModal(true);
    setCurrentPage(1);
    await fetchAllProducts(1, pageSize);
    await fetchAssignedProducts();
  };

  // Handle product selection
  const handleProductSelection = (productId) => {
    // Prevent deselecting already assigned products
    if (assignedProductIds.includes(productId)) {
      return;
    }
    
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle page change
  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    await fetchAllProducts(newPage, pageSize);
  };

  // Handle page size change
  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    await fetchAllProducts(1, newPageSize);
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Handle saving product assignments
  const handleSaveAssignments = async () => {
    try {
      setIsAssigning(true);
      const response = await axios.put(`${UpdateSalesPersonProductsRoute}/${id}/assign-products`, {
        productIds: selectedProducts
      });
      
      // Update salesperson data with the response
      if (response.data?.salesperson) {
        setSalesperson(response.data.salesperson);
      }
      
      toast.success(response.data?.msg || "Product assignments updated successfully");
      setAssignProductModal(false);
      
      // Refresh salesperson data to get updated assigned products
      const updatedResponse = await axios.get(`${GetSalesPersonRoute}/${id}`);
      setSalesperson(updatedResponse.data.salesperson);
      
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.msg || "Failed to update assignments");
    } finally {
      setIsAssigning(false);
    }
  };

  // Initialize assigned products on component mount
  useEffect(() => {
    if (salesperson?.referralCode) {
      fetchAssignedProducts();
    }
  }, [salesperson?.referralCode]);

  if (loading) return <p>Loading...</p>;
  if (!salesperson) return <p>No salesperson found.</p>;
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

      <h1 className="text-2xl font-bold">Refferal Code: {salesperson.referralCode}</h1>

      {/* Profile Box */}
      <div className="flex md:flex-row gap-5 flex-col justify-between items-center bg-white shadow rounded-lg p-6">
        <div className="flex md:flex-row flex-col items-center gap-4">
          <img
            src={salesperson.photo || "https://via.placeholder.com/100"}
            alt={salesperson.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{salesperson.name}</h2>
            <p className="text-gray-600">{salesperson.email}</p>
            <p className="text-gray-600">{salesperson.phone}</p>
          </div>
        </div>
        <div>
          {salesperson.status ? (
            <span className="text-green-600 font-bold">Active</span>
          ) : (
            <span className="text-red-600 font-bold">Inactive</span>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Clicks</h3>
          <p className="text-xl font-bold">{salesperson.metadata?.totalClicks || 0 }</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Conversions</h3>
          <p className="text-xl font-bold">{salesperson.metadata?.totalConversions || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-xl font-bold">{salesperson.metadata?.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Assigned Products Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assigned Products</h3>
          <button
            onClick={handleAssignProductClick}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Assign Product
          </button>
        </div>

        <div className="divide-y">
          {salesperson.assignedProducts?.length > 0 ? (
            salesperson.assignedProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  navigate(`/admin/salesperson/product-analytics/${product._id}`)
                }
              >
                <img
                  src={product.cover?.location || "https://via.placeholder.com/60"}
                  alt={product.p_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.p_name}</p>
                  <p className="text-sm text-gray-500">Price: ₹{product.finalPrice}</p>
                </div>
                <div>
                  {product.availability ? (
                    <MdCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <MdCancel className="text-red-500 text-xl" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products assigned</p>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Total Clicks</p>
            <p className="font-bold">
              {salesperson.metadata?.totalClicks || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Conversions</p>
            <p className="font-bold">
              {salesperson.metadata?.totalConversions || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="font-bold">
              {salesperson.metadata?.totalRevenue || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Products</p>
            <p className="font-bold">
              {salesperson.assignedProducts?.length || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Assign Product Modal */}
      {assignProductModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white w-full max-w-2xl h-[90vh] rounded-lg flex flex-col">
            {/* Modal Header - Fixed */}
            <div className="flex justify-between items-center p-6 pb-4 border-b flex-shrink-0">
              <h2 className="text-xl font-bold">Assign Products</h2>
              <IoClose
                onClick={() => setAssignProductModal(false)}
                className="cursor-pointer text-2xl hover:text-red-500"
              />
            </div>
            
            {/* Page Size Selector - Fixed */}
            <div className="flex justify-between items-center p-6 pb-4 border-b flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">products per page</span>
              </div>
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages || 1} | Total: {totalProducts} products
              </div>
            </div>

            {/* Content Area - Consistent Height */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {productLoading ? (
                <div className="flex justify-center items-center flex-1">
                  <p>Loading products...</p>
                </div>
              ) : isAssigning ? (
                <div className="flex justify-center items-center flex-1">
                  <p>Assigning products...</p>
                </div>
              ) : (
                <>
                  {/* Products List - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-6 py-4">
                    <div className="space-y-3">
                      {allProducts.map((product) => {
                        const isAssigned = assignedProductIds.includes(product._id);
                        const isSelected = selectedProducts.includes(product._id);
                        
                        return (
                          <div 
                            key={product._id} 
                            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${isAssigned ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            onClick={() => handleProductSelection(product._id)}
                          >
                            <input
                              type="checkbox"
                              id={product._id}
                              checked={isSelected}
                              onChange={() => handleProductSelection(product._id)}
                              disabled={isAssigned}
                              className="w-4 h-4 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <img
                              src={product.cover?.location || "https://via.placeholder.com/50"}
                              alt={product.p_name}
                              className="w-12 h-12 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <label 
                                htmlFor={product._id}
                                className={`font-medium block truncate ${isAssigned ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}`}
                              >
                                {product.p_name}
                                {isAssigned && <span className="ml-2 text-xs text-green-600">(Already Assigned)</span>}
                              </label>
                              <p className="text-sm text-gray-500">Price: ₹{product.finalPrice}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pagination Controls - Fixed */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 p-6 py-4 border-t flex-shrink-0">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 border rounded hover:bg-gray-50 ${
                              currentPage === pageNum ? 'bg-primary text-white' : ''
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Modal Footer - Fixed */}
            <div className="flex gap-3 justify-end p-6 pt-4 border-t bg-gray-50 flex-shrink-0">
              <button
                onClick={() => setAssignProductModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50 bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssignments}
                disabled={isAssigning}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isAssigning ? "Assigning..." : "Save Assignments"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewSalesPerson;

