import { IoClose } from "react-icons/io5";
import { productJson } from "../../datas/dropDatas";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetCategory, UpdateProducts } from "../../utils/Endpoint";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReqLoader from "../loader/ReqLoader";

const AddProductModal = ({ setEditProductModal, cb, data }) => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [productData, setProductData] = useState({
    id: data?._id,
    p_name: data?.p_name,
    category: data?.category,
    price: data?.price,
    c_offerPrice: data?.c_offerPrice,
    productOffer: data?.productOffer,
    finalPrice: data?.finalPrice,
    quantity: data?.quantity,
    weight: data?.weight,
    description: data?.description,
    image: null,
  });
  const axios = useAxiosPrivate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("id", productData.id);
    formDataToSend.append("p_name", productData.p_name);
    formDataToSend.append("category", productData.category);
    formDataToSend.append("price", productData.price);
    formDataToSend.append("c_offerPrice", productData.c_offerPrice);
    formDataToSend.append("productOffer", productData.productOffer);
    formDataToSend.append("finalPrice", productData.finalPrice);
    formDataToSend.append("quantity", productData.quantity);
    formDataToSend.append("weight", productData.weight);
    formDataToSend.append("description", productData.description);
    // Append each image file individually
    if (productData?.image !== null) {
      productData.image.forEach((image) => {
        formDataToSend.append("image", image);
      });
    }

    try {
      setLoading(true);
      console.log(productData);
      const response = await axios.put(UpdateProducts, formDataToSend);
      toast.success(response?.data?.msg);
      setEditProductModal(false);
      cb();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = async (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);
    setProductData({ ...productData, image: imageFiles });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(GetCategory)
      .then((res) => {
        setCategoryData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full h-[500px] md:h-4/5 overflow-y-scroll  mt-20 md:mt-0  md:w-1/2 rounded-lg p-5 md:p-10 m-5 flex flex-col gap-[2vh]">
        <h1 className="font-bold text-center text-xl text-primary">
          Edit Product
        </h1>
        <IoClose
          onClick={() => setEditProductModal(false)}
          className="absolute right-3 top-3 rounded bg-primary_colors text-white cursor-pointer bg-primary"
        />

        <div className="w-full">
          <form action="" onSubmit={submitHandler}>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-start">
                Category
              </label>
              <select
                onChange={onChangeHandler}
                name="category"
                id=""
                value={productData?.category}
                className="w-full border p-2 text-sm rounded focus:outline-none"
              >
                <option value="">Select Option</option>
                {categoryData?.map((items) => (
                  <option value={items?._id} key={items?._id}>
                    {items?.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap ">
              {productJson.map((items) => (
                <div
                  key={items?.id}
                  className="flex flex-col gap-1 w-full md:w-1/2 p-1"
                >
                  <label htmlFor="" className="text-start">
                    {items?.label}
                  </label>
                  <input
                    onChange={onChangeHandler}
                    type={items?.type}
                    name={items?.name}
                    placeholder={items?.placeHolder}
                    value={productData[items?.name]}
                    className="w-full border p-2 text-sm rounded focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-start">
                Description
              </label>
              <textarea
                onChange={onChangeHandler}
                type="text"
                name="description"
                value={productData?.description}
                className="w-full border p-2 text-sm rounded focus:outline-none"
              />
            </div>

            <div className="w-full mt-1 ">
              <div className="bg-white w-full rounded flex flex-col ">
                <label htmlFor="" className="text-start font-bold text-lg pb-2">
                  Product Images
                </label>
                <input
                  onChange={handleImageChange}
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  className="w-full border p-2 text-sm rounded focus:outline-none"
                />
              </div>
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
      {loading && <ReqLoader />}
    </div>
  );
};

export default AddProductModal;
