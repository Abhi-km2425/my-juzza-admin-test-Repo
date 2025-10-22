import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CategoryList from "./pages/category/CategoryList";
import AddNewCoupon from "./pages/coupons/AddNewCoupon";
import CouponList from "./pages/coupons/CouponList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DetailedView from "./pages/order/DetailedView";
import OrdersList from "./pages/order/OrdersList";
import AddNewProduct from "./pages/products/AddNewProduct";
import ProductList from "./pages/products/ProductList";
import ProductView from "./pages/products/ProductView";
import AddSalesPerson from "./pages/salesperson/AddSalesPerson";
import ProductAnalytics from "./pages/salesperson/ProductAnalytics";
import SalesPeopleList from "./pages/salesperson/SalesPeopleList";
import ViewSalesPerson from "./pages/salesperson/ViewSalesPerson";
import UsersList from "./pages/users/UsersList";
import AdminProtector from "./protectors/AdminProtector";
import AuthProtector from "./protectors/AuthProtector";
import Layout from "./styles/Layout";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthProtector />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
        <Layout>
          <Routes>
            <Route path="/" element={<AdminProtector />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/analytics/:id" element={<ProductAnalytics />} />
              <Route path="/admin/salesperson" element={<SalesPeopleList />} />
              <Route path="/admin/salesperson/add" element={<AddSalesPerson />} />
              <Route path="/admin/salesperson/:id" element={<ViewSalesPerson />} />
              <Route path="/admin/salesperson/product-analytics/:id" element={<ProductAnalytics />} />
              <Route path="/admin/products/add-product" element={<AddNewProduct />} />
              <Route path="/admin/products/view" element={<ProductView />} />
              <Route path="/admin/category" element={<CategoryList />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/order" element={<OrdersList />} />
              <Route path="/admin/order/view/:id/:userid" element={<DetailedView />} />
              <Route path="/admin/coupons" element={<CouponList/>} />
              <Route path="/admin/coupons/add-coupon" element={<AddNewCoupon />} />

            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
