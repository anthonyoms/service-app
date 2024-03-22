import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { formatter } from "../../utils/constants/formatNumber";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Review({ generalData }) {
  console.log(generalData);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen del pedido
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText primary={"Precio Servicio"} secondary={"Renta Fija"} />
          <Typography variant="body2">
            {formatter.format(generalData.service.precio_venta)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primary={"Precio Instalación"}
            secondary={generalData.service.descripcion}
          />
          <Typography variant="body2">
            {formatter.format(generalData.service.precio_instalacion)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total:" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatter.format(
              Number(generalData.service.precio_instalacion) +
                Number(generalData.service.precio_venta)
            )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos Generales
          </Typography>
          <Typography gutterBottom>{generalData.name}</Typography>
          <Typography gutterBottom>{generalData.cedula}</Typography>
          <Typography
            gutterBottom
          >{`${generalData.province}, ${generalData.municipality}, ${generalData.sector}, ${generalData.avenidaNumero}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalle de pago
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Facturación:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {generalData.service.periodoFacturacion}
                </Typography>
              </Grid>
            </React.Fragment>
            <Link
              to={`/invoice/contract?data=${encodeURIComponent(
                JSON.stringify({
                  name: generalData.name,
                  cedula: generalData.cedula,
                  service: generalData.service,
                })
              )}`}
              target="_black"
            >
              <Button variant="contained" color="info">
                Generar Contrato
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
