import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getComprobanteSecuencia } from "../../../utils/helpers/getComprobanteSecuencia";
import { useState } from "react";
import { useEffect } from "react";

export default function CustomerDialog({ open, setOpen }) {
  const [sequence, setSequence] = useState();

  useEffect(() => {
    setSequence(getComprobanteSecuencia());
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchangeVoucherType = ({ target: { value } }) => {
    const sequence = getComprobanteSecuencia(value);
    setSequence(sequence);
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
            Antes de facturar, asegúrate de revisar cada ítem en la factura para
            garantizar la exactitud de la información. Tu atención a este
            detalle es crucial para una transacción sin problemas.
          </DialogContentText>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo pago"
              defaultValue={"1"}
            >
              <MenuItem value={"1"}>Tarjeta</MenuItem>
              <MenuItem value={"2"}>Efectivo</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-label-comprobante">
              Tipo Comprobante
            </InputLabel>
            <Select
              labelId="demo-simple-select-label-comprobante"
              id="demo-simple-select-comprobante"
              label="Tipo Comprobante"
              onChange={handleOnchangeVoucherType}
              defaultValue={"B01"}
            >
              <MenuItem value={"B02"}>Factura de Consumo</MenuItem>
              <MenuItem value={"B01"}>Valor Fiscal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="sequence"
            name="sequence"
            label="Secuancial"
            autoComplete="off"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
            value={sequence}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} autoFocus>
            Facturar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
