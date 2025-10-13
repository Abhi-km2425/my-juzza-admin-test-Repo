import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SalespersonProtector = () => {
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (userInfo?.role !== "salesperson") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <Outlet />;
};

export default SalespersonProtector;
