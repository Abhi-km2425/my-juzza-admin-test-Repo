import { IoClose } from "react-icons/io5";

const AddProduct = ({ setAddProductModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 ">
      <div className="relative bg-white w-full  md:w-1/2 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-[2vh]">
        <h1 className="font-bold text-center text-xl text-primary">
          Add Visit
        </h1>
        <IoClose
          onClick={() => setAddProductModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
        />

        <div>
            
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
