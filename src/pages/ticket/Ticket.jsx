import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import WebSocketClient from "websocket";
import { getServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";

const Ticket = () => {
  const [pending, setPending] = useState("cargando...");

  useEffect(() => {
    loadPendingTicket();
  });
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
      if (type !== "on-ticket-count-changed") {
        return;
      }

      setPending(payload);
    };

    // Evento cuando se cierra la conexión
    ws.onclose = () => {
      console.log("Conexión cerrada");
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      ws.close();
    };
  }, []);
  const loadPendingTicket = async () => {
    const dataResponse = await getServiceApp(`${endpoints.tickets}/pending`);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setPending(validData.total);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ marginTop: "90px", marginRight: "29%" }}
    >
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom align="center">
          Ticket de Servicio
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <TextField fullWidth label="Escritorio" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Atendiendo A" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" fullWidth size="large">
              Siguiente ticket
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="success" fullWidth size="large">
              Terminar
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Tickets Pendientes: {pending}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Ticket;
