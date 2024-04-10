import {
  IoOpenOutline,
} from "react-icons/io5";

const OrderTable = ({ data, clickDelete, page }) => {
  console.log(data);
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Product Name</th>
            <th className="py-2 px-4 border-b border-r">Amount</th>
            <th className="py-2 px-4 border-b border-r">Method</th>
            <th className="py-2 px-4 border-b border-r">Status</th>
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
                {row?.user?.name}
              </td>
              <td className="py-2 px-4 border-b border-r capitalize">
                {`${
                  row?.proCartDetail[0]?.length > 1
                    ? row?.proCartDetail[0]?.p_name + "+more"
                    : row?.proCartDetail[0]?.p_name
                }`}
              </td>
              <td className="py-2 px-4 border-b border-r">
                {row?.payment?.amount}
              </td>
              <td className="py-2 px-4 border-b border-r">
                {row?.payment?.method}
              </td>
              <td className="py-2 px-4 border-b border-r">{row?.status}</td>
              <td className="py-2 px-4 border-b border-r">
                {
                  <div className="flex justify-center gap-5 cursor-pointer">
                    <IoOpenOutline
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

export default OrderTable;
