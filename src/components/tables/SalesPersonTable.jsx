import { useState } from "react";
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SalesPersonTable = () => {
  const navigate = useNavigate();

  // Dummy data
  const data = [
    {
      _id: "1",
      p_name: "John Doe",
      email: "john.doe@example.com",
      region: "North",
      quantity: 25,
      availability: true,
    },
    {
      _id: "2",
      p_name: "Jane Smith",
      email: "jane.smith@example.com",
      region: "South",
      quantity: 10,
      availability: false,
    },
    {
      _id: "3",
      p_name: "Arjun Kumar",
      email: "arjun.kumar@example.com",
      region: "East",
      quantity: 12,
      availability: true,
    },
  ];

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtered Data
  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.p_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion =
      regionFilter === "All" || row.region === regionFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && row.availability) ||
      (statusFilter === "Inactive" && !row.availability);

    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Dummy handlers
  const clickDelete = (row) => {
    alert(`Toggling status for ${row.p_name}`);
  };

  return (
    <div className="space-y-4">
      {/* 🔍 Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap items-center gap-4">
        {/* Search by name/email */}
        <input
          type="text"
          placeholder="Search by name or email"
          className="border rounded px-3 py-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Region filter */}
        <select
          className="border rounded px-3 py-2"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        {/* Status filter */}
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
              <th className="py-2 px-4 border-b border-r">Region</th>
              <th className="py-2 px-4 border-b border-r">Assigned Products</th>
              <th className="py-2 px-4 border-b border-r">Status</th>
              <th className="py-2 px-4 border-b border-r">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id}>
                <td className="py-2 px-4 border-b border-r capitalize">
                  {row?.p_name}
                </td>
                <td className="py-2 px-4 border-b border-r">{row?.email}</td>
                <td className="py-2 px-4 border-b border-r">{row?.region}</td>
                <td className="py-2 px-4 border-b border-r">
                  {row?.quantity === 0 ? "Out of Stock" : row?.quantity}
                </td>
                <td className="py-2 px-4 border-b border-r">
                  {row?.availability ? "Active" : "Inactive"}
                </td>
                <td className="py-2 px-4 border-b border-r">
                  <div className="flex justify-center gap-5 cursor-pointer">
                    {/* View button */}
                    <button
                      className="text-blue-500 underline"
                      onClick={() =>
                        navigate(`/admin/salesperson/view/${row._id}`)
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
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="text-center p-4">No Data Available</p>
        )}
      </div>
    </div>
  );
};

export default SalesPersonTable;
