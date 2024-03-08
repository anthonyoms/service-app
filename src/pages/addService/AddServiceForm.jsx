import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import { serviceForm } from "../../schemas/yupShemas";

export default function AddServiceForm({ serviceData, generalData }) {
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
    validationSchema: serviceForm,
    onSubmit: async (values) => {},
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Seleccion de Servicio
      </Typography>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="service"
          options={serviceData}
          onChange={(e, params) => {
            //handleOnchangeAutoComplete(e, params);
            handleChange({
              ...e,
              target: {
                ...e.target,
                name: "service",
                value: !!params ? params : null,
              },
            });
          }}
          value={values.service}
          getOptionLabel={(option) => `${option.codigo} - ${option.nombre}`}
          size="small"
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField
              size="small"
              name="service"
              {...params}
              label="Seleccione Cliente*"
              variant="standard"
              error={touched.service && Boolean(errors.service)}
              helperText={touched.service && errors.service}
            />
          )}
        />
      </Grid>
    </React.Fragment>
  );
}
