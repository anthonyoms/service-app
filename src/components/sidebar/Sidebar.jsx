import React from "react";
import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";
import { seguridad, inventario } from "../../utils/constants/sidebarMenuItems";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu {...seguridad} />
        <SidebarMenu {...inventario} />
      </div>
    </div>
  );
};
