import { useDispatch, useSelector } from "react-redux";
import {
  NotificationsNone,
  Settings,
  ExitToAppTwoTone,
  ListAlt,
} from "@material-ui/icons";
import Tooltip from "@mui/material/Tooltip";
import "./topbar.css";
import { startChecking, startLogout } from "../../actions/auth";
import FormDialog from "../dialog/Dialog";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import WebSocketClient from "websocket";
import audioFile from "../../assets/sounds/noti.mp4";
import { Alert, Snackbar } from "@mui/material";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { nombre, img, msg, correo, rol } = useSelector((state) => state.auth);
  const configuration = useSelector((state) => state.info);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [snippet, setSnippet] = React.useState("");

  const handleClick = () => {
    setOpenMessage(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };
  const handle = () => {
    setOpen(true);
  };
  useEffect(() => {
    // Establecer la conexión WebSocket al montar el componente
    const ws = new WebSocketClient.w3cwebsocket("ws://localhost:4000/ws");

    // Evento cuando se abre la conexión
    ws.onopen = () => {
      console.log("Conectado al servidor WebSocket");
      // Ejemplo de enviar un mensaje al servidor cuando se abre la conexión
      ws.send("Hola servidor, soy un cliente");
    };

    // Evento cuando llega un mensaje del servidor
    ws.onmessage = (message) => {
      const { type, payload } = JSON.parse(message.data);
      if (type !== "on-new-message") {
        return;
      }
      dispatch(startChecking());
      if (payload.usuario === correo) {
        let audio = new Audio(audioFile);
        audio.play();
        setSnippet(`${payload.subject} : ${payload.snippet}`);
        handleClick();
      }
    };

    // Evento cuando se cierra la conexión
    ws.onclose = () => {
      console.log("Conexión cerrada");
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      ws.close();
    };
  }, [dispatch, correo]);

  return (
    <>
      <Snackbar
        open={openMessage}
        autoHideDuration={30000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snippet}
        </Alert>
      </Snackbar>
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
            {rol !== "CUSTOMER_ROLE" && (
              <div className="topbarIconContainer">
                <Tooltip title="Tickets">
                  <Link to={"/ticket"} target="_blank">
                    <AddCircleOutlineRounded />
                  </Link>
                </Tooltip>
              </div>
            )}
            {rol !== "CUSTOMER_ROLE" && (
              <div className="topbarIconContainer">
                <Tooltip title="Tickets">
                  <Link to={"/ticket-public"} target="_blank">
                    <ListAlt />
                  </Link>
                </Tooltip>
              </div>
            )}
            <div className="topbarIconContainer">
              <NotificationsNone onClick={() => navigate("/emails-list")} />
              {msg > 0 && <span className="topIconBadge">{msg}</span>}
            </div>
            {rol === "ADMIN_ROLE" && (
              <div className="topbarIconContainer">
                <Settings onClick={() => handle()} />
              </div>
            )}
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
