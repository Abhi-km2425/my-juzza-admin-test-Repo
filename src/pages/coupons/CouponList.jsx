import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CouponStatusRoute, GetAllCouponRoute } from "../../utils/Endpoint";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../../components/Pagination";
import ReqLoader from "../../components/loader/ReqLoader";
import CouponTable from "../../components/tables/CouponTable";
import EditCouponModal from "../../components/modals/EditCouponModal";
import { toast } from "react-toastify";

const CouponList = () => {
    const dummyCoupons = [
        {
          _id:1,
          userId: ["user1@example.com"],
          couponName: "SUMMER10",
          couponValue: 10,
          expiryDate: '2024-07-07', 
          minValue: 500,
          maxValue: 1000,
          isActive:true,
        },
        {
          _id:2,
          userId: ["user1@example.com"],
          couponName: "winter20",
          couponValue: 20,
          expiryDate: '2024-08-15', 
          minValue: 1000,
          maxValue: 2000,
          isActive: true,
        },
      ]

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [couponData, setCouponData] = useState();
    const [page, setPage] = useState(1);

    const axios = useAxiosPrivate();

    const initialData = async () => {
        setLoading(true);
        await axios
            .get(GetAllCouponRoute)
            .then((res) => {
                setData(res?.data?.coupons);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const EditHandler = async (data) => {
        setEditModal(true);
        setCouponData(data);
    };

    const ChangeStatus = async (data) => {
        const confirmed = window.confirm("Do You Want to change the coupon status?");

        if (confirmed) {
            setLoading(true);
            try {
                const isActive = !data?.isActive
                
                const res = await axios.put(`${CouponStatusRoute}/${data?._id}`, {isActive});
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

    useEffect(() => {
          initialData();
    }, []);
    return (
        <div className="h-full w-full flex flex-col items-start mb-10">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-primary font-bold md:text-2xl mb-6 mt-3">
                    <div>Coupons</div>
                </h1>
                <Link to={"/admin/coupons/add-coupon"}>
                    <button className="bg-primary text-white text-sm p-3 rounded hover:scale-105 ease-in-out duration-300 ">
                        Add New Coupon
                    </button>
                </Link>
            </div>

            <div className="w-full">
                <CouponTable
                    data={data}
                    page={page}
                    setLoading={setLoading}
                    cb={initialData}
                    ChangeStatus={ChangeStatus}
                    clickEdit={EditHandler}
                />

                {/* <div className="flex items-end justify-end mt-5">
                    <Pagination />
                </div> */}

            </div>
            {loading && <ReqLoader />}
            {editModal && (
        <EditCouponModal
          setEditModal={setEditModal}
          cb={initialData}
          data={couponData}
        />
      )}
        </div>
    )
}

export default CouponList