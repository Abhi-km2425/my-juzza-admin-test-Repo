import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

// ICONS-----------------------------------------------------
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";

const sideBar = [
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
// ------------------------------------------------------

const Layout = ({children}) => {
  const location = useLocation();

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
