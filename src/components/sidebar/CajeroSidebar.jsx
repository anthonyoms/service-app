import React from "react";
import { seguridad, ventas } from "../../utils/constants/sidebarMenuItems";
import SidebarMenu from "./SidebarMenu";

export const CajeroSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu {...seguridad} />
        <SidebarMenu {...ventas} />
      </div>
    </div>
  );
};
