import { IoClose } from "react-icons/io5";

const DetailedViewTable = ({ products }) => {
  return (
    <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {/* table heading */}
          <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
            <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
              product
            </td>
            <td className="py-4 whitespace-nowrap text-center">Weight</td>
            <td className="py-4 whitespace-nowrap text-center">price</td>
            <td className="py-4 whitespace-nowrap  text-center">quantity</td>
            <td className="py-4 whitespace-nowrap  text-center">total</td>
          </tr>
          {/* table heading end */}
          {products?.orderProducts?.map((item) => (
            <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
              <td className="pl-5  py-4  w-[380px]">
                <div className="flex space-x-6 items-center">
                  {item?.images?.length > 0 && (
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`${item.images[0]?.location}`}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <p className="font-medium text-[15px] text-qblack">
                      {item.p_name}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">{item.weight}</span>
                </div>
              </td>
              <td className="text-center py-4 px-2">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">
                    Rs.{item.finalPrice}
                  </span>
                </div>
              </td>
              <td className=" py-4">
                <div className="flex justify-center items-center">
                  {item?.cartProduct?.quantity}
                </div>
              </td>
              <td className="text-right py-4">
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-[15px] font-normal">
                    Rs.{item.finalPrice * item?.cartProduct?.quantity}
                  </span>
                </div>
              </td>
            </tr>
          ))}
          <tr className="text-black text-lg">
            <td colSpan="4" className="text-right py-4">
              Grand Total:
            </td>
            <td className="text-right py-4">₹{products?.order[0]?.payment?.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailedViewTable;
