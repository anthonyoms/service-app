import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { serviceForm } from "../../schemas/yupShemas";
import { formatter } from "../../utils/constants/formatNumber";

export const AddServiceForm = React.forwardRef(
  ({ serviceData, generalData, setDisableButtom, onSuccess }, ref) => {
    const {
      values,
      errors,
      touched,
      isValid,
      resetForm,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
    } = useFormik({
      initialValues: generalData,
      validationSchema: serviceForm,
      onSubmit: async (values) => {
        !!onSuccess && onSuccess({ ...generalData, ...values });
      },
    });
    React.useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(),
    }));

    React.useEffect(() => {
      !!setDisableButtom && setDisableButtom(!isValid);
    }, [setDisableButtom, isValid]);

    const handleAutoCompleteChange = (e, params) => {
      if (!params) {
        return resetForm();
      }
      setFieldValue("description", params.descripcion);
      setFieldValue(
        "installingPrice",
        formatter.format(params.precio_instalacion)
      );

      setFieldValue("price", formatter.format(params.precio_venta));

      setFieldValue("billing", params.periodoFacturacion);
    };
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Seleccion de Servicio
        </Typography>
        <Grid item xs={12} mb={2}>
          <Autocomplete
            disablePortal
            id="service"
            options={serviceData}
            onChange={(e, params) => {
              handleAutoCompleteChange(e, params);
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
            renderInput={(params) => (
              <TextField
                size="small"
                name="service"
                {...params}
                label="Seleccione Servicio*"
                variant="standard"
                error={touched.service && Boolean(errors.service)}
                helperText={touched.service && errors.service}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <InputLabel id="demo-simple-select-label-comprobante">
            Tipo Comprobante
          </InputLabel>
          <Select
            labelId="demo-simple-select-label-comprobante"
            id="demo-simple-select-comprobante"
            label="Tipo Comprobante"
            name="comprobante"
            onChange={(e, params) => {
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  name: "comprobante",
                  value: !!params ? params.props.value : null,
                },
              });
            }}
            value={values.comprobante}
            onBlur={handleBlur}
            variant="standard"
            fullWidth
          >
            <MenuItem value={"B01"}>Valor Fiscal</MenuItem>
            <MenuItem value={"B02"}>Factura de Consumo</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            required
            id="description"
            name="description"
            label="Descripción"
            InputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
            value={values.description}
            error={!!errors.description && !!touched.description}
            helperText={
              !!errors.description &&
              !!touched.description &&
              errors.description
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            required
            id="installingPrice"
            name="installingPrice"
            label="Precion de instalación"
            InputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
            value={values.installingPrice}
            error={!!errors.installingPrice && !!touched.installingPrice}
            helperText={
              !!errors.installingPrice &&
              !!touched.installingPrice &&
              errors.installingPrice
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            required
            id="price"
            name="price"
            label="Precio"
            InputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
            value={values.price}
            error={!!errors.price && !!touched.price}
            helperText={!!errors.price && !!touched.price && errors.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6} mb={2}>
          <TextField
            required
            id="billing"
            name="billing"
            label="Facturación"
            InputProps={{ readOnly: true }}
            fullWidth
            variant="standard"
            value={values.billing}
            error={!!errors.billing && !!touched.billing}
            helperText={!!errors.billing && !!touched.billing && errors.billing}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </React.Fragment>
    );
  }
);
