import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
export default function SidebarMenu({ title, listItem }) {
  return (
    <div className="sidebarMenu">
      <h3 className="sidebarTitle"> {title} </h3>
      <ul className="sidebarList">
        {listItem.map(({ link, Icon, sidebarItemName }) => (
          <Link key={sidebarItemName} to={link} className="link">
            <li className="sidebarListItem">
              <Icon className="sidebarIcon" />
              {sidebarItemName}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
