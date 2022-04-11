import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Print, CreditCardSharp } from "@material-ui/icons";

import ServiceDataGrid from "../../components/dataGrid/ServiceDataGrid";
import ProductDataGrid from "../../components/dataGrid/ProductDataGrid";

import "./salesWidgetLg.css";

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
              <MenuItem>Tarjeta</MenuItem>
              <MenuItem>Efectivo</MenuItem>
              <MenuItem>Crédito</MenuItem>
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
        </Grid>
      </Grid>
      <h3 className="title">Agregar {title}</h3>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        size="small"
        sx={{ mb: 1 }}
      />
      <div className="salesDataGrid">
        {title === "Servicio" ? <ServiceDataGrid /> : <ProductDataGrid />}
      </div>
    </div>
  );
};

export default SalesWidgetLg;
