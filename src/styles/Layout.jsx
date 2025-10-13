import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

// ICONS-----------------------------------------------------
import { CiShoppingCart } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbCategory2 } from "react-icons/tb";
import { FaKey, FaChartBar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const adminSideBar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <RxDashboard size={23} />,
  },
  {
    id: 2,
    name: "Products",
    path: "/admin/products",
    icon: <MdOutlineProductionQuantityLimits size={23} />,
  },
  {
    id: 3,
    name: "Salesperson",
    path: "/admin/salesperson",
    icon: <IoMdPerson size={23} />,
  },
  {
    id: 4,
    name: "Coupons",
    path: "/admin/coupons",
    icon: <RiCoupon3Line size={23} />,
  },
  {
    id: 13,
    name: "Category",
    path: "/admin/category",
    icon: <TbCategory2 size={23} />,
  },
  {
    id: 4,
    name: "Users",
    path: "/admin/users",
    icon: <FiUsers size={23} />,
  },
  {
    id: 5,
    name: "Orders",
    path: "/admin/order",
    icon: <CiShoppingCart size={23} />,
  },
];

const salespersonSideBar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/salesperson/dashboard",
    icon: <RxDashboard size={23} />,
  },
  {
    id: 2,
    name: "Sales Performance",
    path: "/salesperson/sales-performance",
    icon: <FaChartBar size={23} />,
  },
  {
    id: 3,
    name: "Update Password",
    path: "/salesperson/update-password",
    icon: <FaKey size={23} />,
  },
];
// ------------------------------------------------------

const Layout = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  const sideBar =
    userInfo?.role === "salesperson" ? salespersonSideBar : adminSideBar;

  return (
    <div
      className={`${
        location?.pathname === "/login" ? "hidden" : "block"
      } bg-gradient-to-l from-[#E9F1F7] to-white`}
    >
      <nav className="md:px-5 bg-white">
        <Header sideData={sideBar} />
      </nav>
      <div className="flex relative container mx-auto bg-[#E9F1F7]">
        <div className="bg-white flex justify-center shadow-r">
          <SideBar sidebarData={sideBar} />
        </div>
        <section className="container mx-auto p-5 px-7 max-w-[1280px] overflow-x-hidden overflow-y-hidden">
          {children}
        </section>
      </div>
      <footer className="bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
