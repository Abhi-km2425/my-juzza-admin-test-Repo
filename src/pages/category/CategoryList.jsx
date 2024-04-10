import { useEffect, useState } from "react";
import {
  GetCategory,
  ListCategory,
  UnlistCategory,
} from "../../utils/Endpoint";
import { toast } from "react-toastify";
import CategoryTable from "../../components/tables/CategoryTable";
import ReqLoader from "../../components/loader/ReqLoader";
import Pagination from "../../components/Pagination";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddCategory from "../../components/modals/catagory/AddCategory";
import DeleteModal from "../../components/modals/DeleteModal";
import EditCategory from "../../components/modals/catagory/EditCategory";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataFromAction, setDataFromAction] = useState({});
  const [page, setPage] = useState(1);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [unlistModal, setUnlistModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const axios = useAxiosPrivate();

  // Edit the table value
  const EditHandler = async (data) => {
    setEditCategoryModal(true);
    setDataFromAction(data);
  };

  // Delete from the Table
  const DeleteHandler = async (data) => {
    setDataFromAction(data);
    if (data?.isAvailable === true) {
      setUnlistModal(true);
    } else {
      setListModal(true);
    }
  };

  const UnlistCata = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${UnlistCategory}/${dataFromAction?._id}`
      );
      GetInitialData();
      setUnlistModal(false);
      toast.success(response?.data?.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const ListCata = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${ListCategory}/${dataFromAction?._id}`
      );
      GetInitialData();
      setListModal(false);
      toast.success(response?.data?.msg);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const AddProductHandler = async () => {
    setAddCategoryModal(true);
  };

  const GetInitialData = async () => {
    setLoading(true);
    await axios
      .get(GetCategory)
      .then((res) => {
        setData(res?.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    GetInitialData();
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
            Add New Category
          </button>
        </div>
      </div>

      <div className="w-full">
        <CategoryTable
          data={data}
          clickDelete={DeleteHandler}
          clickEdit={EditHandler}
          page={page}
        />
        <div className="flex items-end justify-end mt-5">
          <Pagination />
        </div>
      </div>

      {/* Delete Modal */}
      {unlistModal && (
        <DeleteModal
          setDeleteModal={setUnlistModal}
          deleteCata={UnlistCata}
          content={"Unlist"}
        />
      )}
      {listModal && (
        <DeleteModal
          setDeleteModal={setListModal}
          deleteCata={ListCata}
          content={"List"}
        />
      )}

      {/* Edit Modal */}
      {editCategoryModal && (
        <EditCategory
          editModal={setEditCategoryModal}
          cb={GetInitialData}
          setLoading={setLoading}
          data={dataFromAction}
        />
      )}

      {/* Add Category */}
      {addCategoryModal && (
        <AddCategory
          setAddProductModal={setAddCategoryModal}
          cb={GetInitialData}
          setLoading={setLoading}
        />
      )}

      {loading && <ReqLoader />}
    </div>
  );
};

export default CategoryList;
