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
import SupplierList from "../pages/supplierList/SupplierList";
import NewSupplier from "../pages/newSupplier/NewSupplier";
import Supplier from "../pages/supplier/Supplier";
import ServiceList from "../pages/serviceList/ServiceList";
import Service from "../pages/productService/Service";
import NewService from "../pages/newService/NewService";
import ServiceManagementList from "../pages/serviceManagementList/ServiceManagementList";
import SalesManagementList from "../pages/salesManagementList/SalesManagementList";
import NewOrder from "../pages/newOrder/NewOrder";
import OrderList from "../pages/orderList/OrderList";
import { OrderInvoice } from "../pages/orderInvoice/OrderInvoice";

export const DashboardRoutes = () => {
  const isInvoice = window.location.pathname.split("/")[1].includes("invoice");
  if (isInvoice) {
    return (
      <Routes>
        <Route path="/invoice/:invoiceId" element={<OrderInvoice />} />
      </Routes>
    );
  }
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

          {/*Products routes */}
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

          {/*Suppliers routes */}
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/supplier/:supplierId" element={<Supplier />} />
          <Route path="/newsupplier" element={<NewSupplier />} />

          {/*Service routes */}
          <Route path="/services" element={<ServiceList />} />
          <Route path="/service/:serviceId" element={<Service />} />
          <Route path="/newservice" element={<NewService />} />

          {/*Orders routes */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Service />} />
          <Route path="/neworder" element={<NewOrder />} />

          <Route
            path="/servicemanagement"
            element={<ServiceManagementList />}
          />
          <Route
            path="/salesmanagementlist"
            element={<SalesManagementList />}
          />

          {/*Not Found routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
