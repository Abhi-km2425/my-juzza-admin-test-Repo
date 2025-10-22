import {
  IoCreateOutline
} from "react-icons/io5";
import { MdChecklistRtl, MdFilterListOff, MdAnalytics } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ data, clickEdit, clickDelete, page, PermanentDeleteHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Price</th>
            <th className="py-2 px-4 border-b border-r">Purchase rate</th>
            <th className="py-2 px-4 border-b border-r">Quantity</th>
            <th className="py-2 px-4 border-b border-r">Active</th>
            <th className="py-2 px-4 border-b border-r">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((row, i) => (
            <tr
              key={row._id}
              className="hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b border-r">
                {(page - 1) * 10 + i + 1}
              </td>
              <td className="py-2 px-4 border-b border-r capitalize">
                {row?.p_name}
              </td>
              <td className="py-2 px-4 border-b border-r">{row?.price}</td>
              <td className="py-2 px-4 border-b border-r">{row?.finalPrice}</td>
              <td className="py-2 px-4 border-b border-r">
                {row?.quantity === 0 ? "Out of Stock " : row?.quantity}
              </td>
              <td className="py-2 px-4 border-b border-r">
                {row?.availability ? (
                  <span className="text-green-500">True</span>
                ) : (
                  <span className="text-red-500">False</span>
                )}
              </td>
              <td className="py-2 px-4 border-b border-r">
                <div className="flex justify-center gap-3 cursor-pointer">
                  <IoCreateOutline
                    className="text-blue-500 text-lg hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      clickEdit(row);
                    }}
                    title="Edit Product"
                  />

                  <MdAnalytics
                    className="text-purple-500 text-lg hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/products/analytics/${row._id}`);
                    }}
                    title="View Analytics"
                  />

                  {row?.availability ? (
                    <MdChecklistRtl 
                      className="text-green-500 text-lg hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        clickDelete(row);
                      }}
                      title="Unlist Product"
                    />
                  ) : (
                    <MdFilterListOff
                      className="text-red-500 text-lg hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        clickDelete(row);
                      }}
                      title="List Product"
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length === 0 && <p className="text-center">No Data Available</p>}
    </div>
  );
};

export default ProductTable;
