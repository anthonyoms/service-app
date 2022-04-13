import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Print, CreditCardSharp } from "@material-ui/icons";

import ServiceDataGrid from "../../components/dataGrid/ServiceDataGrid";
import ProductDataGrid from "../../components/dataGrid/ProductDataGrid";

import "./salesWidgetLg.css";
import { ButtonGroup } from "@mui/material";

const SalesWidgetLg = ({ title }) => {
  return (
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
            <InputLabel id="demo-simple-select-label">Tipo de pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value="1">Tarjeta</MenuItem>
              <MenuItem value="2">Efectivo</MenuItem>
              <MenuItem value="3">Crédito</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ mt: 2, ml: 5 }}
          >
            <Button variant="contained" endIcon={<Print />}>
              Imprimir
            </Button>
            <Button
              sx={{
                backgroundColor: "#008080",
                borderColor: "#008080",
                "&:hover": {
                  backgroundColor: "#027071",
                  borderColor: "#027071",
                },
              }}
              variant="contained"
              endIcon={<CreditCardSharp />}
            >
              Facturar
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <h3 className="title">Agregar {title}</h3>
      <div className="salesDataGrid">
        {title === "Servicio" ? <ServiceDataGrid /> : <ProductDataGrid />}
      </div>
    </div>
  );
};

export default SalesWidgetLg;
