import "./sidebar.css";
import SidebarMenu from "./SidebarMenu";
import { customer } from "../../utils/constants/sidebarMenuItems";

export const CustomerSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <SidebarMenu {...customer} />
      </div>
    </div>
  );
};
