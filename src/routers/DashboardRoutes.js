import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { Home } from "../pages/home/Home";

export const DashboardRoutes = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
