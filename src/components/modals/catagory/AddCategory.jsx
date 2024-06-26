import { useState } from "react";
import { IoClose } from "react-icons/io5";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { AddCategories } from "../../../utils/Endpoint";

const AddCategory = ({ setAddProductModal, cb, setLoading }) => {
  const [image, setImage] = useState(null);

  const [postData, setPostData] = useState({
    categoryName:'',
   
  })

  const changeHandler = (e)=>{
    setPostData((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const axios = useAxiosPrivate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(postData).some(
      (value) => typeof value === "string" && value.trim() === ""
    );

    if (isEmpty) {
      toast.warning("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("categoryName", postData?.categoryName)
      formData.append("image", image)

      const response = await axios.post(AddCategories, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response);
      toast.success(response?.data?.msg,);
      cb();
      setAddProductModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  console.log(image)

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50 ">
      <div className="relative bg-white w-full  md:w-1/2 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-[2vh]">
        <h1 className="font-bold text-center text-xl text-primary">
          Add Category
        </h1>
        <IoClose
          onClick={() => setAddProductModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
        />

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-end gap-4">
            <div className="bg-white w-full rounded flex flex-col ">
              <label htmlFor="" className="text-start font-bold text-lg pb-2">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="Enter The Category Name"
                onChange={changeHandler}
                required
                className="w-full h-fit border border-gray-400 rounded  p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="bg-white w-full rounded flex flex-col ">
              <label htmlFor="" className="text-start font-bold text-lg pb-2">
                Category Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="image"
                accept="image/*"
                className="w-full border p-2 text-sm rounded focus:outline-none"
              />
            </div>

          </div>

          <div className="mt-5">
            <button
              type="submit"
              onClick={submitHandler}
              className="bg-primary p-2 px-5 rounded text-white text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
