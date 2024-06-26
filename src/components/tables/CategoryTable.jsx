import { IoCreateOutline, IoTrashBinOutline } from "react-icons/io5";
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";

const CategoryTable = ({ data, clickEdit, clickDelete, page }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Standard Shipping</th>
            <th className="py-2 px-4 border-b border-r">Express Shipping</th>
            <th className="py-2 px-4 border-b border-r">Availability</th>
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
                {row?.categoryName}
              </td>

              <td className="py-2 px-4 border-b border-r">{row?.stdShipCharge ? `₹${row?.stdShipCharge}`  : 'NIL'}</td>
              <td className="py-2 px-4 border-b border-r">{row?.xprsShipCharge ? `₹${row?.xprsShipCharge}` : 'NIL'}</td>
              
              <td className="py-2 px-4 border-b border-r">
                {row?.isAvailable ? (
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
                      {row?.isAvailable ? (
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

export default CategoryTable;
