import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import { addressForm } from "../../schemas/yupShemas";
import { forwardRef } from "react";
import { useEffect } from "react";

export const AddressForm = forwardRef(
  (
    { customersData, setDisableButtom, onSuccess, setDataState, generalData },
    ref
  ) => {
    const {
      values,
      errors,
      touched,
      isValid,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
    } = useFormik({
      initialValues: generalData,
      validationSchema: addressForm,
      onSubmit: async (values) => {
        !!onSuccess && onSuccess({ ...generalData, ...values });
      },
    });

    React.useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(),
    }));

    useEffect(() => {
      !!setDisableButtom && setDisableButtom(!isValid);
    }, [setDisableButtom, isValid]);

    const handleOnchangeAutoComplete = (e, params) => {
      if (!params) {
        setFieldValue("name", ``);
        setFieldValue("cedula", ``);
        return;
      }
      setFieldValue("name", params.nombre);
      setFieldValue("cedula", params.cedula);
    };
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Dirección de instalación
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="customer"
              options={customersData}
              onChange={(e, params) => {
                handleOnchangeAutoComplete(e, params);
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "customer",
                    value: !!params ? params : null,
                  },
                });
              }}
              value={values.customer}
              getOptionLabel={(option) => `${option.nombre} - ${option.cedula}`}
              size="small"
              sx={{ mb: 2 }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  name="customer"
                  {...params}
                  label="Seleccione Cliente*"
                  variant="standard"
                  error={touched.customer && Boolean(errors.customer)}
                  helperText={touched.customer && errors.customer}
                />
              )}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Nombres"
                InputProps={{ readOnly: true }}
                fullWidth
                variant="standard"
                value={values.name}
                error={!!errors.name && !!touched.name}
                helperText={!!errors.name && !!touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cedula"
                name="cedula"
                label="Cedula/Rnc"
                fullWidth
                variant="standard"
                InputProps={{ readOnly: true }}
                value={values.cedula}
                error={!!errors.cedula && !!touched.cedula}
                helperText={
                  !!errors.cedula && !!touched.cedula && errors.cedula
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="province"
                name="province"
                label="Provincia"
                fullWidth
                variant="standard"
                value={values.province}
                error={!!errors.province && !!touched.province}
                helperText={
                  !!errors.province && !!touched.province && errors.province
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="municipality"
                name="municipality"
                label="Municipio*"
                fullWidth
                variant="standard"
                value={values.municipality}
                error={!!errors.municipality && !!touched.municipality}
                helperText={
                  !!errors.municipality &&
                  !!touched.municipality &&
                  errors.municipality
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="sector"
                name="sector"
                label="Sector"
                fullWidth
                variant="standard"
                value={values.sector}
                error={!!errors.sector && !!touched.sector}
                helperText={
                  !!errors.sector && !!touched.sector && errors.sector
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="avenidaNumero"
                name="avenidaNumero"
                label="Calle / Numero"
                fullWidth
                variant="standard"
                value={values.avenidaNumero}
                error={!!errors.avenidaNumero && !!touched.avenidaNumero}
                helperText={
                  !!errors.avenidaNumero &&
                  !!touched.avenidaNumero &&
                  errors.avenidaNumero
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="referencia"
                name="referencia"
                label="Referencia"
                fullWidth
                variant="standard"
                value={values.referencia}
                error={!!errors.referencia && !!touched.referencia}
                helperText={
                  !!errors.referencia &&
                  !!touched.referencia &&
                  errors.referencia
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
);
