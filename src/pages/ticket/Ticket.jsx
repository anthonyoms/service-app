import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const Ticket = () => {


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
            <TextField
              fullWidth
              label="Escritorio"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Atendiendo A"
              variant="outlined"
            />
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
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
            >
              Terminar
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Tickets Pendientes: {0}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Ticket;
