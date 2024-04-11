import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Layout from "./styles/Layout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductView from "./pages/products/ProductView";
import AuthProtector from "./protectors/AuthProtector";
import AdminProtector from "./protectors/AdminProtector";
import CategoryList from "./pages/category/CategoryList";
import OrdersList from "./pages/order/OrdersList";
import DetailedView from "./pages/order/DetailedView";
import UsersList from "./pages/users/UsersList";

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
              <Route path="/admin/add-products" element={<ProductList />} />
              <Route path="/admin/products/view" element={<ProductView />} />
              <Route path="/admin/category" element={<CategoryList />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/order" element={<OrdersList />} />
              <Route path="/admin/order/view/:id/:userid" element={<DetailedView />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
