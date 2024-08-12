import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper, Typography, IconButton } from "@mui/material";
import {
  MarkEmailUnread as UnreadIcon,
  MarkEmailRead as ReadIcon,
} from "@mui/icons-material";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { useSelector } from "react-redux";
import WebSocketClient from "websocket";

const columns = [
  { field: "sender", headerName: "Remitente", width: 250 },
  { field: "subject", headerName: "Asunto", width: 300 },
  { field: "snippet", headerName: "Fragmento", width: 500 },
  {
    field: "status",
    headerName: "",
    width: 80,
    renderCell: (params) => (
      <IconButton>
        {params.row.isRead ? (
          <ReadIcon color="action" />
        ) : (
          <UnreadIcon color="primary" />
        )}
      </IconButton>
    ),
  },
];

const MessageList = () => {
  const { correo } = useSelector((state) => state.auth);
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  const loadMessage = useCallback(async () => {
    const dataResponse = await getServiceApp(
      `${endpoints.message}?correo=${correo}`
    );
    const validData = dataValidation(dataResponse, false);
    if (!!validData?.ok) {
      console.log(validData.message);
      setEmails(validData.message);
    }
  }, [correo]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

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

      if (payload.usuario === correo) {
        loadMessage();
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
  }, [correo, loadMessage]);

  const handleRowClick = (params) => {
    // Marcar el correo como leído
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === params.id ? { ...email, isRead: true } : email
      )
    );

    navigate(`/email/${params.id}`);
  };

  return (
    <Paper elevation={3} style={{ height: 600, width: "100%", padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Bandeja de Entrada
      </Typography>
      <div style={{ height: "calc(100% - 40px)", width: "100%" }}>
        <DataGrid
          rows={emails}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          components={{ Toolbar: GridToolbar }}
          pagination
          filterMode="client"
          density="compact"
          disableSelectionOnClick
          getRowId={(e) => e.uid}
          onRowClick={handleRowClick}
          getRowClassName={(params) =>
            params.row.isRead ? "read-email" : "unread-email"
          }
          sx={{
            "& .read-email": {
              backgroundColor: "#f0f0f0",
              fontWeight: "normal",
            },
            "& .unread-email": {
              backgroundColor: "#e8f5e9",
              fontWeight: "bold",
              borderLeft: "5px solid #4caf50", // Línea verde a la izquierda para indicar no leído
            },
            "& .MuiDataGrid-cell": {
              padding: "8px 16px",
            },
          }}
        />
      </div>
    </Paper>
  );
};

export default MessageList;
