import React from "react";
import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";
import { seguridad, inventario, home } from "../../utils/constants/sidebarMenuItems";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        
        <SidebarMenu {...home} />
        <SidebarMenu {...seguridad} />
        <SidebarMenu {...inventario} />
      </div>
    </div>
  );
};
