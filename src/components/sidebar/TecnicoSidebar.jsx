import React from 'react'
import SidebarMenu from './SidebarMenu';
import { request, seguridad } from '../../utils/constants/sidebarMenuItems';

export const TecnicoSidebar = () => {
    return (
        <div className="sidebar">
          <div className="sidebarWrapper">
          <SidebarMenu {...seguridad} />
            <SidebarMenu {...request} />
          </div>
        </div>
      );
}
