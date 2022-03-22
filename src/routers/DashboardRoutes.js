import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Customer from "../pages/customer/Customer";
import CustomerList from "../pages/customerList/CustomerList";
import { Home } from "../pages/home/Home";
import NewCustomer from "../pages/newCustomer/NewCustomer";
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
          {/*Home */}
          <Route path="/" element={<Home />} />
          {/*User routes */}
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newuser" element={<NewUser />} />
          {/*products routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          {/*Customers routes */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customer/:userId" element={<Customer />} />
          <Route path="/newcustomer" element={<NewCustomer />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
