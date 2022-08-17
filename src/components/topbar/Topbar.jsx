import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsNone, Settings, ExitToApp } from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import "./topbar.css";
import { startLogout } from "../../actions/auth";

export default function Topbar() {
  const dispatch = useDispatch();
  const { nombre, img } = useSelector((state) => state.auth);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Service app</span>
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
            <Tooltip title="Salir">
              <ExitToApp />
            </Tooltip>
          </div>
          <div className="topbarIconContainer">{nombre}</div>
          <img src={img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
