import { Autocomplete, Box, TextField } from "@mui/material";
import moment from "moment";
import React from "react";
import { NumericFormat } from "react-number-format";

export const CustomerBoxTopLeft = ({
  setDataState,
  customersData,
  invoiceCustomer,
  total,
  subTotal,
}) => {
  const handleCustomer = async (e, params) => {
    setDataState((data) => {
      return {
        ...data,
        invoiceCustomer: { ...params },
      };
    });
  };
  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 1,
        boxShadow: 2,
        mr: 3,
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={customersData}
        getOptionLabel={(option) => `${option.nombre} - ${option.cedula}`}
        onChange={(e, params) => handleCustomer(e, params)}
        sx={{ padding: "8px", marginBottom: "6px" }}
        size="small"
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            label="Seleccione Cliente*"
            variant="standard"
          />
        )}
      />
      <TextField
        id="rnc"
        label="Rnc/Cedula"
        name="rnc"
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        inputProps={{ readOnly: true }}
        value={invoiceCustomer?.cedula || ""}
      />
      <TextField
        id="telefono"
        label="Télefono"
        name="telefono"
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        inputProps={{ readOnly: true }}
        value={invoiceCustomer?.telefono || ""}
      />
      <TextField
        id="fechaEmision"
        label="Fecha de emisión"
        name="fechaEmision"
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        inputProps={{ readOnly: true }}
        defaultValue={moment().format("DD/MM/YYYY")}
      />
      <TextField
        id="fechaVencimiento"
        label="Fecha de Vencimiento"
        name="fechaVencimiento"
        variant="standard"
        autoComplete="off"
        sx={{ m: 1, mr: 6 }}
        size="small"
        inputProps={{ readOnly: true }}
        defaultValue={moment().add(1, "M").format("DD/MM/YYYY")}
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
        value={subTotal}
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
        value={total}
      />
    </Box>
  );
};
