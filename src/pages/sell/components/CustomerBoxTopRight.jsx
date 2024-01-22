import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import { infoMsg } from "../../../utils/helpers/messages";

export const CustomerBoxTopRight = ({
  productData,
  invoiceProduct,
  setDataState,
  customerKey,
  invoiceProductsData,
}) => {
  const { itbis, itbisPercentage } = useSelector((state) => state.info);
  const resetInvoiceProduct = () => {
    setDataState((data) => {
      return {
        ...data,
        invoiceProduct: {
          cantidadRequerida: 0,
          impuestos: 0,
          subTotal: 0,
          total: 0,
        },
      };
    });
  };
  const handleProduct = (e, params) => {
    resetInvoiceProduct();
    setDataState((data) => {
      return {
        ...data,
        invoiceProduct: { ...data.invoiceProduct, ...params },
      };
    });
  };

  const handleAddProduct = () => {
    if (!invoiceProduct?.nombre || invoiceProduct?.cantidadRequerida <= 0) {
      return infoMsg(
        `Los campos: "Produto" y "Cantidad" deben ser completados.`
      );
    }

    if (invoiceProduct.cantidad <= 0) {
      return infoMsg(`Producto no tiene existencia`);
    }

    if (
      !!invoiceProductsData.find(
        (product) => product.uid === invoiceProduct.uid
      )
    ) {
      return infoMsg(
        `El producto ya existe en la factura, por favor verificar`
      );
    }

    setDataState((data) => {
      return {
        ...data,
        customerKey: !data.customerKey,
        invoiceProductsData: [...data.invoiceProductsData, data.invoiceProduct],
        subTotal: data.subTotal + data.invoiceProduct.subTotal,
        total: data.total + data.invoiceProduct.total,
      };
    });
    resetInvoiceProduct();
  };
  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        key={customerKey}
        options={productData}
        getOptionLabel={(option) => `${option.nombre} - ${option.codigoBarras}`}
        onChange={(e, params) => handleProduct(e, params)}
        sx={{ padding: "8px", marginBottom: "6px" }}
        size="small"
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            label="Seleccione Producto*"
            variant="standard"
          />
        )}
      />
      <TextField
        id="cantidad"
        label="Existencia"
        name="cantidad"
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        inputProps={{ readOnly: true }}
        value={invoiceProduct?.cantidad || "0"}
      />
      <NumericFormat
        customInput={TextField}
        id="precioVenta"
        label="Precio de Unitario"
        name="precioVenta"
        variant="standard"
        autoComplete="off"
        size="small"
        sx={{ m: 1, mr: 6 }}
        prefix={"$"}
        type="text"
        thousandSeparator={true}
        inputProps={{ readOnly: true }}
        value={invoiceProduct?.precio_venta || "0"}
      />
      <TextField
        id="cantidadRequerida"
        label="Cantidad"
        name="cantidadRequerida"
        inputProps={{ maxLength: "5" }}
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        value={invoiceProduct?.cantidadRequerida}
        onChange={(e) => {
          setDataState((data) => {
            return {
              ...data,
              invoiceProduct: {
                ...data.invoiceProduct,
                cantidadRequerida: e.target.value,
                impuestos:
                  (e.target.value *
                  invoiceProduct.precio_venta *
                  itbisPercentage).toFixed(2),
                subTotal: e.target.value * invoiceProduct.precio_venta,
                total:
                  e.target.value *
                    invoiceProduct.precio_venta *
                    itbisPercentage +
                  e.target.value * invoiceProduct.precio_venta,
              },
            };
          });
        }}
      />
      <NumericFormat
        customInput={TextField}
        id="impuestos"
        label={`Impuestos ${itbis}%`}
        name="impuestos"
        variant="standard"
        autoComplete="off"
        size="small"
        sx={{ m: 1, mr: 6 }}
        prefix={"$"}
        type="text"
        thousandSeparator={true}
        inputProps={{ readOnly: true }}
        value={invoiceProduct?.impuestos}
      />
      <NumericFormat
        customInput={TextField}
        id="subTotal"
        label={`Subtotal`}
        name="subTotal"
        variant="standard"
        autoComplete="off"
        size="small"
        sx={{ m: 1, mr: 6 }}
        prefix={"$"}
        type="text"
        thousandSeparator={true}
        inputProps={{ readOnly: true }}
        value={invoiceProduct?.subTotal}
      />
      <NumericFormat
        customInput={TextField}
        id="total"
        label={`Total`}
        name="total"
        variant="standard"
        autoComplete="off"
        size="small"
        sx={{ m: 1, mr: 6 }}
        prefix={"$"}
        type="text"
        thousandSeparator={true}
        inputProps={{ readOnly: true }}
        value={invoiceProduct?.total}
      />
      <Button
        sx={{ m: 1, mr: 6 }}
        variant="contained"
        size="small"
        startIcon={<Add />}
        onClick={handleAddProduct}
      >
        Agregar Producto
      </Button>
    </Box>
  );
};
