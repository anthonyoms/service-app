import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Sidebar } from "../components/sidebar/Sidebar";
import { Home } from "../pages/home/Home";
import Topbar from "../components/topbar/Topbar";
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
import NewOrder from "../pages/newOrder/NewOrder";
import OrderList from "../pages/orderList/OrderList";
import { Invoice } from "../pages/invoices/Invoice";
import Entry from "../pages/entry/Entry";
import EntryList from "../pages/entryList/EntryList";
import { EntryInvoice } from "../pages/invoices/EntryInvoice";
import { SellScreen } from "../pages/sell/SellScreen";
import { SellInvoice } from "../pages/invoices/SellInvoice";
import { Refunds } from "../pages/refunds/Refunds";
import { RefundsList } from "../pages/refundsList/RefundsList";
import { RefundsInvoice } from "../pages/invoices/RefundsInvoice";
import { AddService } from "../pages/addService/AddService";
import { Contract } from "../pages/addService/Contract";
import { SearchContract } from "../pages/searchs/SearchContract";
import { ContractDetail } from "../pages/contractDetail/ContractDetail";
import { ServiceInvoice } from "../pages/invoices/ServiceInvoice";
import { SearchInvoice } from "../pages/searchs/SearchInvoice";
import { useSelector } from "react-redux";
import { CustomerSidebar } from "../components/sidebar/CustomerSidebar";
import { PaymentService } from "../pages/customerService/PaymentService";
import { PayServiceInvoice } from "../pages/customerService/PayServiceInvoice";
import { Pay } from "../pages/customerService/Pay";
import TicketPublicScreen from "../pages/ticket/TicketPublicScreen";
import TicketGenerator from "../pages/ticket/TicketGenerator";
import Ticket from "../pages/ticket/Ticket";
import { DesktopRegistered } from "../pages/desktop/DesktopRegistered";
import { SetDesktop } from "../pages/desktop/SetDesktop";
import { AddRequest } from "../pages/request/AddRequest";
import { RequestList } from "../pages/request/RequestList";
import { RequestManager } from "../pages/request/RequestManager";
import MessageList from "../pages/emails/MessageList";
import EmailDetail from "../pages/emails/EmailDetail";
import { SellByProduct } from "../pages/report/SellByProduct";
import { CustomerReport } from "../pages/report/CustomerReport";
import { InvoiceServiceReport } from "../pages/report/InvoiceServiceReport";
import { WorkStationReport } from "../pages/report/WorkStationReport";
import { RequestReport } from "../pages/report/RequestReport";
import { TicketReport } from "../pages/report/TicketReport";
import { MesaSidebar } from "../components/sidebar/MesaSidebar";
import UnauthorizedAccess from "../pages/Unauthorized/UnauthorizedAccess";
import { TecnicoSidebar } from "../components/sidebar/TecnicoSidebar";
import { CajeroSidebar } from "../components/sidebar/CajeroSidebar";
import { RequestService } from "../request-service/RequestService";
import { MonthSalesReport } from "../pages/report/MonthSalesReport";
import { CustomerLate } from "../pages/report/CustomerLate";

export const DashboardRoutes = () => {
  const { rol } = useSelector((state) => state.auth);
  const isInvoice = window.location.pathname.split("/")[1].includes("invoice");
  const isTicketPulic = window.location.pathname
    .split("/")[1]
    .includes("ticket");
  if (isInvoice || isTicketPulic) {
    return (
      <Routes>
        {/*Emails*/}
        <Route path="/emails-list" element={<MessageList />} />
        <Route path="/email/:id" element={<EmailDetail />} />
        <Route path="/invoice/:invoiceId" element={<Invoice />} />
        <Route path="/entryinvoice/:invoiceId" element={<EntryInvoice />} />
        <Route path="/sellinvoice/:invoiceId" element={<SellInvoice />} />
        <Route path="/refundsinvoice/:refundId" element={<RefundsInvoice />} />
        <Route path="/invoice/contract" element={<Contract />} />
        <Route path="/ticket-public" element={<TicketPublicScreen />} />
        <Route path="/ticket" element={<TicketGenerator />} />
        <Route
          path="/serviceinvoice/:serviceId/:InvoiceId"
          element={<ServiceInvoice />}
        />
        <Route path="*" element={<UnauthorizedAccess />} />
      </Routes>
    );
  }
  if (rol === "CAJERO") {
    return (
      <>
        <Topbar />
        <div className="container">
          <CajeroSidebar />
          <Routes>
            <Route path="/myuser" element={<User />} />
            {/*Customers routes */}
            <Route path="/customers" element={<UserList />} />
            <Route path="/newcustomer" element={<NewUser />} />
            {/*Emails*/}
            <Route path="/emails-list" element={<MessageList />} />
            <Route path="/email/:id" element={<EmailDetail />} />
            <Route path="/sell" element={<SellScreen />} />

            {/*refunds*/}
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/refundslist" element={<RefundsList />} />
            <Route path="/addservice" element={<AddService />} />
            <Route path="*" element={<UnauthorizedAccess />} />
          </Routes>
        </div>
      </>
    );
  }
  if (rol === "TECNICO") {
    return (
      <>
        <Topbar />
        <div className="container">
          <TecnicoSidebar />
          <Routes>
            <Route path="/myuser" element={<User />} />
            {/*Emails*/}
            <Route path="/emails-list" element={<MessageList />} />
            <Route path="/email/:id" element={<EmailDetail />} />
            {/*Request*/}
            <Route path="/request-manager" element={<AddRequest />} />
            <Route path="/request-manager/:id" element={<RequestManager />} />
            <Route path="/request-list" element={<RequestList />} />
            {/*Not Found routes */}
            <Route path="*" element={<UnauthorizedAccess />} />
          </Routes>
        </div>
      </>
    );
  }

  if (rol === "CUSTOMER_ROLE") {
    return (
      <>
        <Topbar />
        <div className="container">
          <CustomerSidebar />
          <Routes>
            <Route path="/myuser" element={<User />} />
            {/*Emails*/}
            <Route path="/emails-list" element={<MessageList />} />
            <Route path="/email/:id" element={<EmailDetail />} />
            <Route path="/paymentservice" element={<PaymentService />} />
            <Route path="/paymentservice/:id" element={<PayServiceInvoice />} />
            <Route path="/paymentservice/:id/:idForPay" element={<Pay />} />
            <Route path="/requestservice" element={<RequestService />} />
            {/*Not Found routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </>
    );
  }

  if (rol === "TECNICO_MESA") {
    return (
      <>
        <Topbar />
        <div className="container">
          <MesaSidebar />

          <Routes>
            {/*Emails*/}
            <Route path="/emails-list" element={<MessageList />} />
            <Route path="/email/:id" element={<EmailDetail />} />
            {/*Request*/}
            <Route path="/request-manager" element={<AddRequest />} />
            <Route path="/request-manager/:id" element={<RequestManager />} />
            <Route path="/request-list" element={<RequestList />} />
            <Route path="/myuser" element={<User />} />
            <Route path="/user/:userId" element={<User />} />

            {/*Customers routes */}
            <Route path="/customers" element={<UserList />} />
            <Route path="/customer/:userId" element={<User />} />
            <Route path="/newcustomer" element={<NewUser />} />
            {/*Orders routes */}
            <Route path="/sell" element={<SellScreen />} />

            <Route path="/refunds" element={<Refunds />} />
            <Route path="/refundslist" element={<RefundsList />} />

            <Route path="/addservice" element={<AddService />} />

            {/*Searchs*/}
            <Route path="/searchcontract" element={<SearchContract />} />
            <Route path="/buscarfactura" element={<SearchInvoice />} />
            {/*Report*/}
            <Route path="/ventas-productos" element={<SellByProduct />} />
            <Route path="/reporte-clientes" element={<CustomerReport />} />
            <Route
              path="/reporte-servicios"
              element={<InvoiceServiceReport />}
            />
            <Route path="/reporte-estacion" element={<WorkStationReport />} />
            <Route path="/reporte-solicitudes" element={<RequestReport />} />
            <Route path="/reporte-tickets" element={<TicketReport />} />
            {/*Not Found routes */}
            <Route path="*" element={<UnauthorizedAccess />} />
          </Routes>
        </div>
      </>
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
          <Route path="/myuser" element={<User />} />
          <Route path="/newuser" element={<NewUser />} />

          {/*Products routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />

          {/*Customers routes */}
          <Route path="/customers" element={<UserList />} />
          <Route path="/customer/:userId" element={<User />} />
          <Route path="/newcustomer" element={<NewUser />} />

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
          <Route path="/addservice" element={<AddService />} />

          {/*Orders routes */}
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Service />} />
          <Route path="/neworder" element={<NewOrder />} />

          {/*Orders routes */}
          <Route path="/newentry" element={<Entry />} />
          <Route path="/entries" element={<EntryList />} />

          {/*Orders routes */}
          <Route path="/sell" element={<SellScreen />} />

          {/*refunds*/}
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/refundslist" element={<RefundsList />} />

          {/*Searchs*/}
          <Route path="/searchcontract" element={<SearchContract />} />
          <Route path="/buscarfactura" element={<SearchInvoice />} />

          {/*Contract*/}
          <Route
            path="/contractdetail/:contractId"
            element={<ContractDetail />}
          />

          {/*Ticket*/}

          <Route path="/service-manager" element={<Ticket />} />
          <Route path="/desktop-manager" element={<DesktopRegistered />} />
          <Route path="/desktop-manager/:desktop" element={<SetDesktop />} />

          {/*Request*/}
          <Route path="/request-manager" element={<AddRequest />} />
          <Route path="/request-manager/:id" element={<RequestManager />} />
          <Route path="/request-list" element={<RequestList />} />

          {/*Emails*/}
          <Route path="/emails-list" element={<MessageList />} />
          <Route path="/email/:id" element={<EmailDetail />} />

          {/*Report*/}
          <Route path="/ventas-productos" element={<SellByProduct />} />
          <Route path="/reporte-clientes" element={<CustomerReport />} />
          <Route path="/reporte-servicios" element={<InvoiceServiceReport />} />
          <Route path="/reporte-estacion" element={<WorkStationReport />} />
          <Route path="/reporte-solicitudes" element={<RequestReport />} />
          <Route path="/reporte-tickets" element={<TicketReport />} />
          <Route path="/reporte-ventames" element={<MonthSalesReport />} />
          <Route path="/reporte-customerlate" element={<CustomerLate />} />
          {/*Not Found routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};
