import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { formatter } from "../../../utils/constants/formatNumber";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { getServiceApp } from "../../../services/serviceApp";
import { endpoints } from "../../../utils/constants/endpoints";

export default function CustomerDialog({
  open,
  setOpen,
  total,
  setDataState,
  discount,
  totalAfterDiscount,
  sendInvoice,
  sequenceDataResponse,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchangeVoucherType = async ({ target: { value } }) => {
    const { secuencial } = await getServiceApp(
      endpoints.secuencial + `?tipoComprobante=${value}`
    );

    const nuevaCadena = `${value}${sequenceDataResponse.substring(3)}`;
    const cadenaFinal = `${nuevaCadena.substring(
      0,
      nuevaCadena.length - String(secuencial.length + 1).length
    )}${String(secuencial.length + 1)}`;
    setDataState((data) => ({ ...data, sequenceDataResponse: cadenaFinal }));
  };

  const handlePayType = ({ target }) => {
    setDataState((data) => {
      return {
        ...data,
        tipoPago: target.value,
      };
    });
  };

  const handleDiscount = ({ value }) => {
    const perncentDiscount = Number(value) / 100;
    setDataState((data) => {
      return {
        ...data,
        discount: value,
        totalAfterDiscount: total - total * perncentDiscount,
      };
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Pagar factura`}</DialogTitle>
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
              defaultValue={"Tarjeta"}
              onChange={handlePayType}
            >
              <MenuItem value={"Tarjeta"}>Tarjeta</MenuItem>
              <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
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
            value={sequenceDataResponse}
          />
          <NumericFormat
            customInput={TextField}
            id="discount"
            label="Descuento %*"
            name="discount"
            inputProps={{ maxLength: "2" }}
            variant="standard"
            autoComplete="off"
            size="small"
            sx={{ mt: 2, mb: 2 }}
            value={discount}
            onValueChange={handleDiscount}
          />
          <h3>Total: {formatter.format(total)}</h3>
          {Number(discount) !== 0 ? (
            <h3>Total con descuento {formatter.format(totalAfterDiscount)}</h3>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => sendInvoice(sequenceDataResponse)} autoFocus>
            Facturar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
