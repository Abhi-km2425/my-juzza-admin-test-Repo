import {
  IoCreateOutline,
  IoTrashBinOutline,
  IoOpenOutline,
} from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";

const ProductTable = ({ data, clickEdit, clickDelete, page, PermanentDeleteHandler }) => {
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
            <tr key={row._id}>
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
                {
                  <div className="flex justify-center gap-5 cursor-pointer">
                    <IoCreateOutline
                      className="text-blue-500"
                      onClick={() => clickEdit(row)}
                    />

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

                    <IoTrashBinOutline
                      className="text-red-500"
                      onClick={() => PermanentDeleteHandler(row)}
                    />
                  </div>
                }
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
