import { consultas, reportes, request, seguridad, ventas } from "../../utils/constants/sidebarMenuItems";
import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";

import React from "react";

export const MesaSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <SidebarMenu {...request} />
      <SidebarMenu {...ventas} />
      <SidebarMenu {...seguridad} />
      <SidebarMenu {...consultas} />
      <SidebarMenu {...reportes} />
      </div>
    </div>
  );
};
