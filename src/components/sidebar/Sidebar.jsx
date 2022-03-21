import React from "react";
import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";
import {
  dashboard,
  quickMenu,
  notifications,
  staff,
} from "../../utils/constants/sidebarMenuItems";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu {...dashboard} />
        <SidebarMenu {...quickMenu} />
        <SidebarMenu {...notifications} />
        <SidebarMenu {...staff} />
      </div>
    </div>
  );
};
