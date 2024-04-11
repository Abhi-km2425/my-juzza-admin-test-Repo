import { useEffect, useState } from "react";
import { productJson } from "../../datas/dropDatas";
import { AddProducts, GetCategory } from "../../utils/Endpoint";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReqLoader from "../../components/loader/ReqLoader";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [productData, setProductData] = useState({
    p_name: "",
    category: "",
    price: "",
    c_offerPrice: "0",
    productOffer: "",
    finalPrice: "",
    quantity: "",
    weight: "",
    description: "",
    image: null,
  });
  const axios = useAxiosPrivate();

  const onChangeHandler = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(productData).some(
      (value) => typeof value === "string" && value.trim() === ""
    );

    if (isEmpty) {
      toast.warning("Please fill out all fields before submitting.");
      return;
    }

    const formDataToSend = new FormData();
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
    productData.image.forEach((image) => {
      formDataToSend.append("image", image);
    });

    try {
      console.log(productData);
      setLoading(true);
      const response = await axios.post(AddProducts, formDataToSend);
      toast.success(response?.data?.msg);
      setProductData({
        p_name: "",
        category: "",
        price: "",
        c_offerPrice: "0",
        productOffer: "",
        finalPrice: "",
        quantity: "",
        weight: "",
        description: "",
        image: null,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>New Product</div>
        </h1>
        <button
          onClick={handleSubmit}
          className="p-2 px-5 bg-green-500 rounded text-white text-sm hover:bg-primary hover:scale-105 ease-in-out duration-300"
        >
          Submit
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="bg-white w-full md:w-4/6 p-5 pb-10 rounded ">
          <h1 className="text-start font-bold text-xl pb-5">Product</h1>
          <form action="" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-start">
                Category
              </label>
              <select
                onChange={onChangeHandler}
                name="category"
                id=""
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
              {productJson.map((items, i) => (
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
                    required
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
                className="w-full border p-2 text-sm rounded focus:outline-none"
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-2/6 ">
          <div className="bg-white w-full p-5 rounded flex flex-col ">
            <label htmlFor="" className="text-start font-bold text-lg pb-5">
              Product Images
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              name="image"
              accept="image/*"
              multiple
              required
              className="w-full border p-2 text-sm rounded focus:outline-none"
            />
          </div>
        </div>
      </div>
      {loading && <ReqLoader />}
    </div>
  );
};

export default AddNewProduct;
