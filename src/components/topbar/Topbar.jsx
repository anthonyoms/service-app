import { useDispatch, useSelector } from "react-redux";
import {
  NotificationsNone,
  Settings,
  ExitToAppTwoTone,
} from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import "./topbar.css";
import { startLogout } from "../../actions/auth";
import FormDialog from "../dialog/Dialog";
import { useState } from "react";

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
