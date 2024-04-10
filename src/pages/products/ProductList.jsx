import { useEffect, useState } from "react";
import ReqLoader from "../../components/loader/ReqLoader";
import ProductTable from "../../components/tables/ProductTable";
import Pagination from "../../components/Pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GetProducts } from "../../utils/Endpoint";
import AddProduct from "../../components/modals/AddProduct";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [addProductModal, setAddProductModal] = useState(false);
  const axios = useAxiosPrivate();
  const [productData, setProductData] = useState({
    p_name: "",
    category: "",
    price: "",
    c_offerPrice: "",
    productOffer: "",
    finalPrice: "",
    quantity: "",
    weight: "",
    description: "",
  });

  // Edit the table value
  const EditHandler = async (data) => {
    setLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete from the Table
  const DeleteHandler = async (data) => {
    setLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AddProductHandler = async () => {
    setAddProductModal(true);
  };

  const initialData = async () => {
    setLoading(true);
    await axios
      .get(GetProducts)
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    initialData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-start mb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
          <div>ProductList</div>
        </h1>
        <div>
          <button
            onClick={AddProductHandler}
            className="bg-primary text-white text-sm p-3 rounded hover:scale-105 ease-in-out duration-300 "
          >
            Add New Product
          </button>
        </div>
      </div>

      <div className="w-full">
        <ProductTable
          data={data}
          clickDelete={DeleteHandler}
          clickEdit={EditHandler}
          page={page}
        />
        <div className="flex items-end justify-end mt-5">
          <Pagination />
        </div>
      </div>
      {loading && <ReqLoader />}
      {addProductModal && (
        <AddProduct setAddProductModal={setAddProductModal} />
      )}
    </div>
  );
};

export default ProductList;
