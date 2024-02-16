import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./refunds.css";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation, infoMsg } from "../../utils/helpers/messages";
import { refundsSchema } from "../../schemas/refundsScreen";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { InvoiceDatagrid } from "../sell/components/InvoiceDatagrid";
import { AddBox, RemoveRedEyeSharp, Send } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { formatter } from "../../utils/constants/formatNumber";
export const Refunds = () => {
  const [open, setOpen] = React.useState(false);
  const { itbis, itbisPercentage } = useSelector((state) => state.info);
  const style = {
    margin: 0,
    top: "auto",
    right: "10em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  const style2 = {
    margin: 0,
    top: "auto",
    right: "5em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  const styleMyFab = {
    margin: 0,
    top: "auto",
    right: "15em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };

  const [
    {
      reasonData,
      typeData,
      loading,
      products,
      invoiceProductsData,
      refundsProduct,
      customerKey,
      error,
      errorMessage,
      uid,
      productosOld,
    },
    setDataState,
  ] = useState({
    reasonData: [],
    typeData: [],
    products: [],
    invoiceProductsData: [],
    loading: true,
    customerKey: true,
    refundsProduct: {
      cantidadRequerida: 0,
      impuestos: 0,
      subTotal: 0,
      total: 0,
    },
    error: false,
    errorMessage: "",
    uid: "",
    productosOld: [],
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      refundsType: "",
      refundsReason: "",
      factura: "",
      cliente: "",
      cantidad: "",
    },
    validationSchema: refundsSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    loadRefundsDropdowns();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFieldValue("cantidad", "");
    resetError();
    resetInvoiceProduct();
    setOpen(false);
  };
  const loadCustomerInvoice = async ({ target }) => {
    setDataState((prevState) => {
      return {
        ...prevState,
        uid: "",
        productosOld: [],
        invoiceProductsData: [],
      };
    });
    if (!target.value || errors.factura) {
      return;
    }

    setDataState((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });

    const result = await getServiceApp(
      endpoints.facuracion + `?id=${target.value}`
    );
    setDataState((prevState) => {
      return {
        ...prevState,
        loading: false,
      };
    });
    const validResult = dataValidation(result, false);

    if (!validResult.ok || validResult.facturas.length <= 0) {
      infoMsg(`Factura #${target.value} no encontrada`);
      setFieldValue("cliente", ``);
      setFieldValue("factura", ``);
      return;
    }

    const cedula = validResult.facturas[0].cliente.cedula;
    const nombre = validResult.facturas[0].cliente.nombre;
    setDataState((prevState) => {
      return {
        ...prevState,
        uid: validResult.facturas[0].uid,
        productosOld: validResult.facturas[0].productos,
      };
    });
    setFieldValue("cliente", `${cedula} - ${nombre}`);
  };

  const loadRefundsDropdowns = async () => {
    const [reasonDataResult, typeDataResult, productsDataResponse] =
      await Promise.all([
        getServiceApp(endpoints.generica + `?id=2`),
        getServiceApp(endpoints.generica + `?id=1`),
        getServiceApp(endpoints.products + `?estado=true`),
      ]);
    const validReasonData = dataValidation(reasonDataResult, false);
    const validtypeData = dataValidation(typeDataResult, false);
    const validDataProduct = dataValidation(productsDataResponse, false);
    if (validReasonData.ok && validtypeData.ok && validDataProduct.ok) {
      setDataState((prevState) => {
        return {
          ...prevState,
          reasonData: validReasonData.generica[0].items,
          typeData: validtypeData.generica[0].items,
          products: validDataProduct.productos,
          loading: false,
        };
      });
    }
  };

  const resetInvoiceProduct = () => {
    setDataState((data) => {
      return {
        ...data,
        refundsProduct: {
          cantidadRequerida: 0,
          impuestos: 0,
          subTotal: 0,
          total: 0,
        },
      };
    });
  };

  const handleProduct = (e, params) => {
    setFieldValue("cantidad", "");
    resetError();
    resetInvoiceProduct();
    setDataState((data) => {
      return {
        ...data,
        refundsProduct: { ...data.invoiceProduct, ...params },
      };
    });
  };

  const resetError = () => {
    setDataState((data) => {
      return {
        ...data,
        error: false,
      };
    });
  };

  const showError = (msg = "") => {
    setDataState((data) => {
      return {
        ...data,
        error: true,
        errorMessage: msg,
      };
    });
  };

  const handleAddProduct = () => {
    if (errors.cantidad) {
      return showError("Datos incorrectos, por favor verificar");
    }
    if (!refundsProduct.nombre || values.cantidad <= 0) {
      return showError(
        `Los campos: "Produto" y "Cantidad" deben ser completados.`
      );
    }

    if (
      !!invoiceProductsData.find(
        (product) => product.uid === refundsProduct.uid
      )
    ) {
      return showError(
        `El producto ya existe en la devolución, por favor verificar`
      );
    }
    const productoOld = productosOld.find(
      (product) => product.producto._id === refundsProduct.uid
    );
    if (!productoOld) {
      return showError(
        `El producto no existe en la factura, por favor verificar`
      );
    }

    if (productoOld.cantidadRequerida < values.cantidad) {
      return showError(`La cantidad excede la de la factura`);
    }
    setDataState((data) => {
      return {
        ...data,
        customerKey: !data.customerKey,
        invoiceProductsData: [data.refundsProduct, ...data.invoiceProductsData],
      };
    });
    setFieldValue("cantidad", "");
    resetInvoiceProduct();
  };

  const handleSendRefund = (e) => {
    handleSubmit(e);
    if (invoiceProductsData.length <= 0) {
      return infoMsg(
        `Antes de proceder con la devolución, por favor, 
        asegúrate de agregar al menos un producto a la lista. 
        Tu atención a este paso es fundamental para completar 
        la transacción con éxito!`
      );
    }
  };

  return (
    <>
      <MyBackdrop loading={isSubmitting || loading} />
      <form onSubmit={(e) => handleSendRefund(e)} className="refunds">
        <Paper className="refunds-contend">
          <h2 className="title">Devoluciones</h2>
          <TextField
            id="factura"
            name="factura"
            label="Factura ID"
            autoFocus
            size="small"
            inputProps={{ maxLength: "20" }}
            value={values.factura}
            error={!!errors.factura && !!touched.factura}
            helperText={!!errors.factura && !!touched.factura && errors.factura}
            onChange={handleChange}
            onBlur={(e) => {
              handleBlur(e);
              setFieldValue("cliente", ``);
              loadCustomerInvoice(e);
            }}
            autoComplete="off"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="cliente"
            name="cliente"
            label="Cliente"
            size="small"
            inputProps={{ maxLength: "20", readOnly: true }}
            value={values.cliente}
            error={!!errors.cliente && !!touched.cliente}
            helperText={!!errors.cliente && !!touched.cliente && errors.cliente}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Tipo
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="refundsType"
              label="Tipo"
              size="small"
              error={!!errors.refundsType && !!touched.refundsType}
              value={values.refundsType}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ mb: 2 }}
            >
              {typeData.map((items) => {
                return (
                  <MenuItem key={items?._id} value={items?.item_id}>
                    {items?.item_text}
                  </MenuItem>
                );
              })}
            </Select>
            {!!errors.refundsType && !!touched.refundsType && (
              <FormHelperText
                sx={{ marginTop: -2, marginBottom: 2 }}
                error={true}
              >
                {errors.refundsType}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel size="small" id="select-motivo-label">
              Motivo
            </InputLabel>
            <Select
              labelId="select-motivo-label"
              id="select-motivo"
              name="refundsReason"
              size="small"
              label="Motivo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.refundsReason}
              error={!!errors.refundsReason && !!touched.refundsReason}
              sx={{ mb: 2 }}
            >
              {reasonData.map((items) => {
                return (
                  <MenuItem key={items?._id} value={items?.item_id}>
                    {items?.item_text}
                  </MenuItem>
                );
              })}
            </Select>
            {!!errors.refundsReason && !!touched.refundsReason && (
              <FormHelperText
                sx={{ marginTop: -2, marginBottom: 2 }}
                error={true}
              >
                {errors.refundsReason}
              </FormHelperText>
            )}
          </FormControl>
          <InvoiceDatagrid
            invoiceProductsData={invoiceProductsData}
            setDataState={setDataState}
          />
        </Paper>
        {productosOld.length !== 0 ? (
          <>
            <Tooltip title="Enviar">
              <Fab
                type="submit"
                style={style2}
                color="success"
                aria-label="add"
              >
                <Send />
              </Fab>
            </Tooltip>
            <Tooltip title="Agregar Producto">
              <Fab
                onClick={handleClickOpen}
                style={style}
                color="primary"
                aria-label="add"
              >
                <AddBox />
              </Fab>
            </Tooltip>
            <Tooltip title="Ver factura">
              <Fab
                onClick={() => {
                  window.open("/sellinvoice/" + uid, "_blank");
                }}
                style={styleMyFab}
                color="info"
                aria-label="add"
              >
                <RemoveRedEyeSharp />
              </Fab>
            </Tooltip>
          </>
        ) : (
          <></>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Agregar producto"}
          </DialogTitle>
          <DialogContent sx={{ height: 300 }}>
            <DialogContentText id="alert-dialog-description">
              Agregar producto para la devolución de factura.
            </DialogContentText>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              key={customerKey}
              options={products}
              getOptionLabel={(option) =>
                `${option.nombre} - ${option.codigoBarras}`
              }
              onChange={(e, params) => handleProduct(e, params)}
              size="small"
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="Seleccione Producto"
                />
              )}
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <TextField
              id="cantidad"
              name="cantidad"
              label="Cantidad"
              size="small"
              fullWidth
              inputProps={{ maxLength: "4" }}
              value={values.cantidad}
              error={!!errors.cantidad && !!touched.cantidad}
              helperText={
                !!errors.cantidad && !!touched.cantidad && errors.cantidad
              }
              onChange={(e) => {
                handleChange(e);
                resetError();
                if (!!refundsProduct.nombre && !e.target.value) {
                  setDataState((data) => {
                    return {
                      ...data,
                      refundsProduct: {
                        ...data.refundsProduct,
                        cantidadRequerida: 0,
                        impuestos: 0,
                        subTotal: 0,
                        total: 0,
                      },
                    };
                  });
                  return;
                }
                if (!refundsProduct.nombre || !e.target.value) {
                  return;
                }
                setDataState((data) => {
                  return {
                    ...data,
                    refundsProduct: {
                      ...data.refundsProduct,
                      cantidadRequerida: e.target.value,
                      impuestos: (
                        parseFloat(e.target.value) *
                        parseFloat(refundsProduct.precio_venta) *
                        itbisPercentage
                      ).toFixed(2),
                      subTotal:
                        parseFloat(e.target.value) *
                        parseFloat(refundsProduct.precio_venta),
                      total:
                        parseFloat(e.target.value) *
                          parseFloat(refundsProduct.precio_venta) *
                          itbisPercentage +
                        parseFloat(e.target.value) *
                          parseFloat(refundsProduct.precio_venta),
                    },
                  };
                });
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              autoComplete="off"
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <Alert sx={{ marginBottom: 1 }} severity="error">
                {errorMessage}
              </Alert>
            )}
            {!!values.cantidad && !errors.cantidad ? (
              <>
                <h3>Impuestos: {formatter.format(refundsProduct.impuestos)}</h3>
                <h3>Subtotal: {formatter.format(refundsProduct.subTotal)}</h3>
                <h3>Total: {formatter.format(refundsProduct.total)}</h3>
              </>
            ) : (
              <></>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
            <Button onClick={handleAddProduct} autoFocus>
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};
