import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ViewSalesPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const [salesperson, setSalesperson] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSalesperson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/salesperson/${id}`);
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
          <p className="text-xl font-bold">{salesperson.metadata.totalClicks || 0 }</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Conversions</h3>
          <p className="text-xl font-bold">{salesperson.metadata.totalConversions || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-xl font-bold">{salesperson.metadata.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Assigned Products Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assigned Products</h3>
         
        </div>
        <div className="divide-y">
          {salesperson.assignedProducts?.length > 0 ? (
            salesperson.assignedProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  navigate(`/admin/salesperson/product-analytics/${product.code}`)
                }
              >
                <img
                  src={product.image || "https://via.placeholder.com/60"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.code}</p>
                </div>
                <div>
                  {product.status === "active" && (
                    <MdCheckCircle className="text-green-500 text-xl" />
                  )}
                  {product.status === "inactive" && (
                    <MdCancel className="text-red-500 text-xl" />
                  )}
                  {product.status === "pending" && (
                    <MdPending className="text-yellow-500 text-xl" />
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
              {salesperson.analytics?.totalClicks || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Conversions</p>
            <p className="font-bold">
              {salesperson.analytics?.totalConversions || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="font-bold">
              {salesperson.analytics?.totalRevenue || "-"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Products</p>
            <p className="font-bold">
              {salesperson.analytics?.totalProducts || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSalesPerson;
