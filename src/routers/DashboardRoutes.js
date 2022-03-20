import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { Home } from "../pages/home/Home";
import NewProduct from "../pages/newProduct/NewProduct";
import NewUser from "../pages/newUser/NewUser";
import Product from "../pages/product/Product";
import ProductList from "../pages/productList/ProductList";
import User from "../pages/user/User";
import UserList from "../pages/userList/UserList";

export const DashboardRoutes = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
