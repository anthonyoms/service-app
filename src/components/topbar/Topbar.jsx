import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsNone, Settings, ExitToApp } from "@material-ui/icons";
import "./topbar.css";
import { startLogout } from "../../actions/auth";

export default function Topbar() {
  const dispatch = useDispatch();
  const { nombre } = useSelector((state) => state.auth);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Orbit Cable S.A</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
            <span className="topIconBadge">2</span>
          </div>
          <div
            onClick={() => dispatch(startLogout())}
            className="topbarIconContainer"
          >
            <ExitToApp />
          </div>
          <div className="topbarIconContainer">{nombre}</div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
