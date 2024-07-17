import React, { useCallback, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import WebSocketClient from "websocket";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import {
  dataValidation,
  errorMsg,
  infoMsg,
} from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { currentDesktopForm } from "../../schemas/yupShemas";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const navigate = useNavigate();
  const { correo } = useSelector((state) => state.auth);
  const [pending, setPending] = useState("cargando...");
  const [currentTicket, setCurrentTicket] = useState(null);
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        desktop: "",
        customer: "",
        description: "",
        tipoTicket: "Solicitud de Información",
      },
      validationSchema: currentDesktopForm,
      onSubmit: async (values) => {
        const dataResponse = await updateServiceApp(
          { description: values.description, tipoTicket: values.tipoTicket },
          endpoints.tickets + `/done`,
          currentTicket.uid
        );
        const validData = dataValidation(dataResponse);
        if (validData.ok) {
          setCurrentTicket(null);
          setFieldValue("customer", "");
          setFieldValue("description", "");
          setFieldValue("tipoTicket", "Solicitud de Información");
        }
        loadPendingTicket();
      },
    });
  const loadPendingTicketDesk = useCallback(async () => {
    const dataResponse = await getServiceApp(
      `${endpoints.tickets}/working-on/${values.desktop}`
    );
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setCurrentTicket(validData.ticket);
      setFieldValue("customer", validData?.ticket?.customer || "");
    }
  }, [values.desktop, setFieldValue]);

  const loadDeskUser = useCallback(async () => {
    const dataResponse = await getServiceApp(
      endpoints.desk + `/user/${correo}`
    );
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      return setFieldValue("desktop", validData.desk.nombre);
    }

    if (!validData.data.ok) {
      return navigate("/");
    }
  }, [correo, setFieldValue, navigate]);
  useEffect(() => {
    loadDeskUser();
  }, [loadDeskUser]);

  useEffect(() => {
    loadPendingTicketDesk();
  }, [loadPendingTicketDesk]);

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

  const handleDrawTicket = async () => {
    if (!!currentTicket) {
      return errorMsg("Debe Terminar el ticket antes de trabajar otro.");
    }
    const dataResponse = await getServiceApp(
      `${endpoints.tickets}/draw/${values.desktop}`
    );
    const validData = dataValidation(dataResponse, false);
    if (!validData.ticketForUpdate) {
      return infoMsg("No hay mas ticket para trabajar.🙃");
    }
    if (validData.ok) {
      if (!!validData.ticketForUpdate) {
        setCurrentTicket(validData.ticketForUpdate);
        setFieldValue("customer", validData.ticketForUpdate.customer);
      }
    }
    loadPendingTicket();
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
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="desktop"
                id="desktop"
                inputProps={{ readOnly: true }}
                label="Escritorio"
                variant="outlined"
                value={values.desktop}
                onChange={handleChange}
                error={touched.desktop && Boolean(errors.desktop)}
                helperText={touched.desktop && errors.desktop}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-tipoTicket">
                  Tipo Ticket
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-tipoTicket"
                  id="demo-simple-select-tipoTicket"
                  name="tipoTicket"
                  label="Tipo Ticket"
                  value={values.tipoTicket}
                  onChange={handleChange}
                >
                  <MenuItem value={"Adquirir Productos y Servicios"}>
                    Adquirir Productos y Servicios
                  </MenuItem>
                  <MenuItem value={"Solicitud de Información"}>
                    Solicitud de Información
                  </MenuItem>
                  <MenuItem value={"Servicio Tecnicos"}>
                    Servicio Tecnicos
                  </MenuItem>
                  <MenuItem value={"Cancelaciones"}>Cancelaciones</MenuItem>
                  <MenuItem value={"Solicitud de Cambio"}>
                    Solicitud de Cambio
                  </MenuItem>
                  <MenuItem value={"Inconvenientes con el Servicio"}>
                    Inconvenientes con el Servicio
                  </MenuItem>
                  <MenuItem value={"Pagos y Servicios"}>
                    Pagos y Servicios
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="customer"
                id="customer"
                fullWidth
                label="Atendiendo a"
                variant="outlined"
                inputProps={{ readOnly: true }}
                value={values.customer}
                onChange={handleChange}
                error={touched.customer && Boolean(errors.customer)}
                helperText={touched.customer && errors.customer}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                id="description"
                label="Descripción"
                multiline
                rows={4}
                variant="outlined"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleDrawTicket}
              >
                Siguiente ticket
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                type="submit"
              >
                Terminar
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Tickets Pendientes: {pending}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Ticket;
