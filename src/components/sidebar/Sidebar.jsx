import React from "react";
import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";
import {
  seguridad,
  inventario,
  home,
  ventas,
  consultas,
  Tickets,
  request,
} from "../../utils/constants/sidebarMenuItems";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu {...home} />
        <SidebarMenu {...seguridad} />
        <SidebarMenu {...inventario} />
        <SidebarMenu {...ventas} />
        <SidebarMenu {...Tickets} />
        <SidebarMenu {...request} />
        <SidebarMenu {...consultas} />
      </div>
    </div>
  );
};
