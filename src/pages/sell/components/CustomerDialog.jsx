import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CustomerDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Pagar factura"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo pago"
            >
              <MenuItem value={1}>Tarjeta</MenuItem>
              <MenuItem value={2}>Efectivo</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label-comprobante">Tipo Comprobante</InputLabel>
            <Select
              labelId="demo-simple-select-label-comprobante"
              id="demo-simple-select-comprobante"
              label="Tipo Comprobante"
            >
              <MenuItem value={1}>Cliente</MenuItem>
              <MenuItem value={2}>Valor Fiscal</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
