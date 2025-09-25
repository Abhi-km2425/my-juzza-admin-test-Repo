import { useState } from "react";
import { FaBoxOpen, FaChartLine, FaDollarSign, FaUsers } from "react-icons/fa";

const ProductAnalytics = () => {
  const [filters, setFilters] = useState({
    date: "last30",
    region: "all",
    salesperson: "all",
  });

  // Dummy product info
  const product = {
    name: "SuperWidget Pro",
    id: "SWP-12345",
  };

  // Dummy stats
  const stats = {
    totalSales: 550,
    totalRevenue: "$120,000",
    ordersCount: 320,
    activeSalespersons: 18,
  };

  // Dummy table data
  const salesData = [
    {
      id: 1,
      customer: "Alice Johnson",
      amount: "$1,200",
      orders: 2,
      salesperson: "John Doe",
      date: "2025-09-01",
    },
    {
      id: 2,
      customer: "Bob Smith",
      amount: "$800",
      orders: 1,
      salesperson: "Jane Smith",
      date: "2025-09-03",
    },
    {
      id: 3,
      customer: "Carlos Mendes",
      amount: "$2,500",
      orders: 3,
      salesperson: "Arjun Kumar",
      date: "2025-09-05",
    },
  ];

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

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">Product ID: {product.id}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaChartLine className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Sales</p>
            <p className="text-lg font-bold">{stats.totalSales}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaDollarSign className="text-green-500 text-2xl" />
          <div>
            <p className="text-gray-500">Total Revenue</p>
            <p className="text-lg font-bold">{stats.totalRevenue}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBoxOpen className="text-purple-500 text-2xl" />
          <div>
            <p className="text-gray-500">Orders Count</p>
            <p className="text-lg font-bold">{stats.ordersCount}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUsers className="text-orange-500 text-2xl" />
          <div>
            <p className="text-gray-500">Active Salespersons</p>
            <p className="text-lg font-bold">{stats.activeSalespersons}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
        <div className="flex gap-4">
          {/* Date filter */}
          <select
            className="border rounded px-3 py-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          >
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>

          {/* Region filter */}
          <select
            className="border rounded px-3 py-2"
            value={filters.region}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            <option value="all">All Regions</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>

          {/* Salesperson filter */}
          <select
            className="border rounded px-3 py-2"
            value={filters.salesperson}
            onChange={(e) =>
              setFilters({ ...filters, salesperson: e.target.value })
            }
          >
            <option value="all">All Salespersons</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="arjun">Arjun Kumar</option>
          </select>
        </div>

        {/* Export button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          + Export Data
        </button>
      </div>

      {/* Sales Overview Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Order Count</th>
              <th className="py-2 px-4 border">Salesperson</th>
              <th className="py-2 px-4 border">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row) => (
              <tr key={row.id} className="text-center">
                <td className="py-2 px-4 border">{row.customer}</td>
                <td className="py-2 px-4 border">{row.amount}</td>
                <td className="py-2 px-4 border">{row.orders}</td>
                <td className="py-2 px-4 border">{row.salesperson}</td>
                <td className="py-2 px-4 border">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Showing 1-3 of 50 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Prev
            </button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
