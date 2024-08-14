import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { formatter } from "../../../utils/constants/formatNumber";
import {
  CircularProgress,
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
  codigoDevolucion,
  secuencialLoading,
  devolucionLoading,
  devolucionLoadingError,
  devolucionLoadingErrorMsg,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchangeVoucherType = async ({ target: { value } }) => {
    const { secuencial } = await getServiceApp(
      endpoints.secuencial + `?tipoComprobante=${value}`
    );

    const newSecuencial = partirCadena(secuencial[0].numeroComprobante);

    setDataState((data) => ({
      ...data,
      sequenceDataResponse: generarSecuencia(value, Number(newSecuencial) + 1),
    }));
  };

  const generarSecuencia = (tipoSecuencia, numero) => {
    const secuencial = numero.toString().padStart(8, "0"); // Asegura que el número tenga 8 dígitos
    return `${tipoSecuencia}${secuencial}`;
  };
  const partirCadena = (cadena) => {
    const match = cadena.match(/(?:B01|B02)?0*(\d{1,8})$/); // Encuentra los últimos 8 dígitos después de B01 o B02
    if (match) {
      return match[1]; // Devuelve los últimos 8 dígitos
    }
    return ""; // Si no se encuentra ningún número, devuelve una cadena vacía
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

  const resetDiscount = (error = false, errorMsg = "") => {
    console.log(error, errorMsg);
    setDataState((prev) => ({
      ...prev,
      totalAfterDiscount: prev.total,
      discount: 0,
      devolucionLoading: false,
      devolucionLoadingError: error,
      devolucionLoadingErrorMsg: errorMsg,
      codigoDevolucion: "",
      devolucion: null,
    }));
  };

  const handleOnBlurRefund = async ({ target: { value } }) => {
    const errorMsg = "Codigo devolución no encontrado";
    if (!value) {
      resetDiscount();
      return;
    }
    setDataState((prev) => ({
      ...prev,
      devolucionLoading: true,
    }));
    const { ok, ...data } = await getServiceApp(
      endpoints.devoluciones + `?id=${value}`
    );
    if (!ok) {
      return resetDiscount(true, errorMsg);
    }
    if (!data?.devolucion[0]?.total) {
      return resetDiscount(true, errorMsg);
    }
    if (!!data?.devolucion[0]?.canjeada) {
      return resetDiscount(
        true,
        "La devolución ya fue canjeada, por favor verificar"
      );
    }
    if (!data?.devolucion[0]?.estado) {
      return resetDiscount(
        true,
        "La devolución no esta diponible , por favor verificar"
      );
    }
    setDataState((prev) => {
      const totalAfterDiscount = prev.total - data?.devolucion[0].total;
      if (totalAfterDiscount < 0) {
        resetDiscount(
          true,
          `Monto total de la devolución igual a ${formatter.format(
            data?.devolucion[0].total
          )}. El valor de la factura no puede ser menor que cero`
        );
      }
      return {
        ...prev,
        totalAfterDiscount,
        discount: 0,
        devolucion: data?.devolucion[0]?._id,
        devolucionLoading: false,
        devolucionLoadingError: false,
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
              endAdornment: secuencialLoading ? (
                <CircularProgress size={30} thickness={4} />
              ) : (
                <></>
              ),
            }}
            inputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
            value={sequenceDataResponse}
          />
          <TextField
            margin="dense"
            id="codigoDevolucion"
            name="codigoDevolucion"
            label="Codigo Devolución"
            autoComplete="off"
            fullWidth
            error={!!devolucionLoadingError ? true : false}
            helperText={
              !!devolucionLoadingError ? devolucionLoadingErrorMsg : ""
            }
            InputProps={{
              endAdornment: devolucionLoading && (
                <CircularProgress size={30} thickness={4} />
              ),
            }}
            inputProps={{ maxLength: "20" }}
            onBlur={handleOnBlurRefund}
            sx={{ mt: 2 }}
            value={codigoDevolucion}
            onChange={({ target }) => {
              setDataState((prevState) => {
                return {
                  ...prevState,
                  codigoDevolucion: target.value,
                };
              });
            }}
          />
          <NumericFormat
            customInput={TextField}
            id="discount"
            label="Descuento %*"
            name="discount"
            disabled={!!codigoDevolucion}
            inputProps={{ maxLength: "2" }}
            variant="standard"
            autoComplete="off"
            size="small"
            sx={{ mt: 2, mb: 2 }}
            value={discount}
            onValueChange={handleDiscount}
          />
          <h3>Total: {formatter.format(total)}</h3>

          <h3>Total con descuento {formatter.format(totalAfterDiscount)}</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={devolucionLoading || devolucionLoadingError}
            onClick={() => sendInvoice(sequenceDataResponse)}
            autoFocus
          >
            Facturar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
