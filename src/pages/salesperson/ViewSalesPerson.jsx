import { MdCancel, MdCheckCircle, MdPending } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const ViewSalesPerson = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Dummy salesperson data
  const salesperson = {
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    photo: "https://via.placeholder.com/100",
    active: true,
    totalSales: 120000,
    ordersCompleted: 150,
    productsAssigned: 12,
  };

  // Dummy assigned products
  const products = [
    {
      id: 1,
      name: "Product A",
      code: "PA-001",
      image: "https://via.placeholder.com/60",
      status: "active",
    },
    {
      id: 2,
      name: "Product B",
      code: "PB-002",
      image: "https://via.placeholder.com/60",
      status: "inactive",
    },
    {
      id: 3,
      name: "Product C",
      code: "PC-003",
      image: "https://via.placeholder.com/60",
      status: "pending",
    },
  ];

  // Dummy analytics data
  const analytics = {
    avgSalesValue: "$850",
    totalCommission: "$15,000",
    lastSaleDate: "12 Sept 2025",
    clientRetentionRate: "82%",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back button */}
     <div className="flex justify-start">
  <button
    className="px-4 py-2 bg-primary rounded text-white hover:text-black hover:bg-gray-300"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
</div>

      <h1 className="text-2xl font-bold">Salesperson ID: {id}</h1>

      {/* Profile Box */}
      <div className="flex justify-between items-center bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4">
          <img
            src={salesperson.photo}
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
          {salesperson.active ? (
            <span className="text-green-600 font-bold">Active</span>
          ) : (
            <span className="text-red-600 font-bold">Inactive</span>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="text-xl font-bold">${salesperson.totalSales}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Orders Completed</h3>
          <p className="text-xl font-bold">{salesperson.ordersCompleted}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-gray-500">Products Assigned</h3>
          <p className="text-xl font-bold">{salesperson.productsAssigned}</p>
        </div>
      </div>

      {/* Assigned Products Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assigned Products</h3>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            + Add Products
          </button>
        </div>
        <div className="divide-y">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-50"
      onClick={() => navigate(`/admin/salesperson/product-analytics/${product.code}`)} // 👈 go to ProductAnalytics
    >
              <img
                src={product.image}
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
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Average Sales Value / Product</p>
            <p className="font-bold">{analytics.avgSalesValue}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Commission Generated</p>
            <p className="font-bold">{analytics.totalCommission}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Sale Date</p>
            <p className="font-bold">{analytics.lastSaleDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Client Retention Rate</p>
            <p className="font-bold">{analytics.clientRetentionRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSalesPerson;
