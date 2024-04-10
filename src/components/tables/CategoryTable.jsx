import { IoCreateOutline, IoTrashBinOutline } from "react-icons/io5";

const CategoryTable = ({ data, clickEdit, clickDelete, page }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Offer Price</th>
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
              <td className="py-2 px-4 border-b border-r">{row?.offerValue}</td>
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
                    <IoTrashBinOutline
                      className="text-red-500"
                      onClick={() => clickDelete(row)}
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

export default CategoryTable;
