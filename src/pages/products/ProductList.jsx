import { useEffect, useState } from "react";
import ReqLoader from "../../components/loader/ReqLoader";
import ProductTable from "../../components/tables/ProductTable";
import Pagination from "../../components/Pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  DeleteProducts,
  GetProducts,
  ListProducts,
  UnlistProducts,
} from "../../utils/Endpoint";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EditProductModal from "../../components/modals/EditProductModal";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productData, setProductData] = useState();
  const [page, setPage] = useState(1);

  const axios = useAxiosPrivate();

  // Edit the table value
  const EditHandler = async (data) => {
    setEditModal(true);
    setProductData(data);
  };

  // Delete from the Table
  const PermanentDeleteHandler = async (data) => {
    const conform = window.confirm("Are You Sure You Want Delete this?");
    
    if (conform) {
      setLoading(true);
      try {
        const res = await axios.delete(`${DeleteProducts}/${data?._id}`);
        toast.success(res?.data?.msg);
        initialData();
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete from the Table
  const DeleteHandler = async (data) => {
    const conform = window.confirm("Do You Want to change the availability status?");

    if (conform) {
      setLoading(true);
      try {
        if (data?.availability === true) {
          const res = await axios.post(`${UnlistProducts}/${data?._id}`);
          toast.success(res?.data?.msg);
          initialData();
        } else {
          const res = await axios.post(`${ListProducts}/${data?._id}`);
          toast.success(res?.data?.msg);
          initialData();
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    }
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
          <div>Products</div>
        </h1>
        <Link to={"/admin/products/add-product"}>
          <button className="bg-primary text-white text-sm p-3 rounded hover:scale-105 ease-in-out duration-300 ">
            Add New Product
          </button>
        </Link>
      </div>

      <div className="w-full">
        <ProductTable
          data={data}
          clickDelete={DeleteHandler}
          PermanentDeleteHandler={PermanentDeleteHandler}
          clickEdit={EditHandler}
          page={page}
        />

        {/* <div className="flex items-end justify-end mt-5">
          <Pagination />
        </div> */}

      </div>
      {loading && <ReqLoader />}
      {editModal && (
        <EditProductModal
          setEditModal={setEditModal}
          cb={initialData}
          data={productData}
        />
      )}
    </div>
  );
};

export default ProductList;
