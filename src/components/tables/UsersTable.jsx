import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BlockUser, UnblockUser } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UsersTable = ({ data, page, setLoading, cb }) => {
  const [toggles, setToggles] = useState(Array(data.length).fill(false));
  const axios = useAxiosPrivate();

  const updateTheToggle = async (rowIndex, row) => {
    const newToggles = [...toggles];
    newToggles[rowIndex] = !toggles[rowIndex];
    setToggles(newToggles);
    setLoading(true);
    try {
      if (row?.isBlocked === false) {
        const res = await axios.post(`${BlockUser}/${row?._id}`);
        cb();
        toast.success(res?.data?.msg);
      } else {
        const res = await axios.post(`${UnblockUser}/${row?._id}`);
        cb();
        toast.success(res?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Email</th>
            <th className="py-2 px-4 border-b border-r">PhoneNumber</th>
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
                {row?.name}
              </td>
              <td className="py-2 px-4 border-b border-r capitalize">
                {row?.email}
              </td>
              <td className="py-2 px-4 border-b border-r">{row?.number}</td>
              <td className="py-2 px-4 border-b border-r">
                <div className="flex justify-center gap-5 cursor-pointer">
                  {toggles[i] || row?.isBlocked === true ? (
                    <BsToggleOn
                      size={24}
                      className="text-red-500"
                      onClick={() => updateTheToggle(i, row)}
                    />
                  ) : (
                    <BsToggleOff
                      size={24}
                      className="text-gray-400"
                      onClick={() => updateTheToggle(i, row)}
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

export default UsersTable;
