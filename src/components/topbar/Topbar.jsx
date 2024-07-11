import { useDispatch, useSelector } from "react-redux";
import {
  NotificationsNone,
  Settings,
  ExitToAppTwoTone,
  ListAlt,
} from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import "./topbar.css";
import { startLogout } from "../../actions/auth";
import FormDialog from "../dialog/Dialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddCircleOutlineRounded } from "@mui/icons-material";

export default function Topbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { nombre, img } = useSelector((state) => state.auth);
  const configuration = useSelector((state) => state.info);
  const handle = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog
        isOpen={open}
        setOpen={setOpen}
        configuration={configuration}
      />
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">{configuration.nombre}</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <Tooltip title="Tickets">
                <Link to={"/ticket"} target="_blank">
                  <AddCircleOutlineRounded />
                </Link>
              </Tooltip>
            </div>
            <div className="topbarIconContainer">
              <Tooltip title="Tickets">
                <Link to={"/ticket-public"} target="_blank">
                  <ListAlt />
                </Link>
              </Tooltip>
            </div>
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Settings onClick={() => handle()} />
            </div>
            <div
              onClick={() => dispatch(startLogout())}
              className="topbarIconContainer"
            >
              <Tooltip title="Salir">
                <ExitToAppTwoTone />
              </Tooltip>
            </div>
            <div className="topbarIconContainer">{nombre}</div>
            <img src={img} alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    </>
  );
}
