import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { UpdateCategory } from "../../../utils/Endpoint";
import { useState } from "react";

const EditCategory = ({ editModal, cb, setLoading, data }) => {
  const [category, setCategoryName] = useState(data?.categoryName);
  const axios = useAxiosPrivate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const categoryName = {
        id: data?._id,
        categoryName: category,
      };
      const response = await axios.post(UpdateCategory, categoryName);
      console.log(response);
      toast.success(response?.data?.msg);
      cb();
      editModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 ">
      <div className="relative bg-white w-full  md:w-1/2 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-[2vh]">
        <h1 className="font-bold text-center text-xl text-primary">
          Edit Category
        </h1>
        <IoClose
          onClick={() => editModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
        />

        <div className="w-full">
          <form action="" onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                name="categoryName"
                placeholder="Enter The Category Name"
                onChange={(e) => setCategoryName(e.target.value)}
                value={category}
                required
                className="w-full border border-gray-400 rounded  p-2 text-sm focus:outline-none"
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="bg-primary p-2 px-5 rounded text-white text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
