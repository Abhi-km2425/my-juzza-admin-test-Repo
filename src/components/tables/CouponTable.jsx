import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BlockUser, UnblockUser } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoCreateOutline } from "react-icons/io5";
import { MdChecklistRtl, MdFilterListOff } from "react-icons/md";

const CouponTable = ({ data, page, setLoading, cb, ChangeStatus, clickEdit }) => {
  const axios = useAxiosPrivate();

  return (
    <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg text-sm bg-white">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4 border-b border-r">No.</th>
            <th className="py-2 px-4 border-b border-r">Name</th>
            <th className="py-2 px-4 border-b border-r">Value</th>
            <th className="py-2 px-4 border-b border-r">Expiry Date</th>
            <th className="py-2 px-4 border-b border-r">Min Order Value</th>
            <th className="py-2 px-4 border-b border-r">Max Order Value</th>
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
                {row?.couponName}
              </td>
              <td className="py-2 px-4 border-b border-r capitalize">
                {row?.couponValue}%
              </td>
              <td className="py-2 px-4 border-b border-r">{row?.expiryDate && row?.expiryDate?.split('T')[0]}</td>
              <td className="py-2 px-4 border-b border-r">₹{row?.minValue}</td>
              <td className="py-2 px-4 border-b border-r">₹{row?.maxValue}</td>

              <td className="py-2 px-4 border-b border-r">
                {row?.isActive ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
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
                      {row?.isActive ? (
                        <MdChecklistRtl
                          className="text-green-500"
                          onClick={() => ChangeStatus(row)}
                        />
                      ) : (
                        <MdFilterListOff
                          className="text-red-500"
                          onClick={() => ChangeStatus(row)}
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

export default CouponTable;
