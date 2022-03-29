import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Sidebar } from "../components/sidebar/Sidebar";
import { Home } from "../pages/home/Home";
import Topbar from "../components/topbar/Topbar";
import Customer from "../pages/customer/Customer";
import CustomerList from "../pages/customerList/CustomerList";
import NewCustomer from "../pages/newCustomer/NewCustomer";
import NewProduct from "../pages/newProduct/NewProduct";
import NewUser from "../pages/newUser/NewUser";
import Product from "../pages/product/Product";
import ProductList from "../pages/productList/ProductList";
import User from "../pages/user/User";
import UserList from "../pages/userList/UserList";
import CategoryList from "../pages/categoryList/CategoryList";
import NewCategory from "../pages/newCategory/NewCategory";
import Category from "../pages/category/Category";

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
          {/*Categories routes */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/newcategory" element={<NewCategory />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
