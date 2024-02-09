import React from "react";
import "./refunds.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
export const Refunds = () => {
  return (
    <div className="refunds">
      <Paper className="refunds-contend">
        <h2 className="title">Devoluciones</h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo"
            sx={{ mb: 2 }}
          >
            <MenuItem value="1">Devolución de dinero</MenuItem>
            <MenuItem value="2">Crédito a factura</MenuItem>
            <MenuItem value="3">Saldo a favor</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="select-motivo">Motivo</InputLabel>
          <Select
            labelId="select-motivo"
            id="demo-simple-select-motivo"
            label="Motivo"
            sx={{ mb: 2 }}
          >
            <MenuItem value="1">Producto incorrecto o diferente al pedido.</MenuItem>
            <MenuItem value="2">Producto dañado durante el envío.</MenuItem>
            <MenuItem value="3">Producto defectuoso o con problemas de calidad.</MenuItem>
            <MenuItem value="4">Caducidad o fecha de vencimiento cercana.</MenuItem>
            <MenuItem value="5">Otro motivo.</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          id="factura"
          name="factura"
          label="Factura ID" 
          inputProps={{ maxLength: "20" }}
          autoComplete="off"
          sx={{ marginBottom: 2 }}
        />
        <TextField
          autoFocus
          id="cliente"
          name="cliente"
          label="Cliente"
          inputProps={{ maxLength: "20" }}
          autoComplete="off"
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained">Enviar</Button>
      </Paper>
    </div>
  );
};
