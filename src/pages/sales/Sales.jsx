import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Print, CreditCardSharp } from "@material-ui/icons";

import "./sales.css";

const Sales = () => {
  return (
    <div className="sales">
      <div className="salesWidgets">
        <div className="widgetLg">
          <h3 className="widgetTitle">Datos Factura</h3>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="customer"
                label="Cliente"
                fullWidth
                autoComplete="402-0045543-0"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="user"
                label="Vendedor"
                fullWidth
                autoComplete="Juan matos - 1526"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de pago
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Tarjeta</MenuItem>
                  <MenuItem value={20}>Efectivo</MenuItem>
                  <MenuItem value={30}>Crédito</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                sx={{ mt: 2, ml: 3, mr: 3 }}
                variant="contained"
                endIcon={<Print />}
              >
                Imprimir
              </Button>
              <Button
                sx={{
                  mt: 2,
                  backgroundColor: "#008080",
                  borderColor: "#008080",
                }}
                variant="contained"
                endIcon={<CreditCardSharp />}
              >
                Facturar
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className="widgetSm">
          <span className="widgetSmTitle">Detalles Factura</span>
        </div>
      </div>
    </div>
  );
};

export default Sales;
