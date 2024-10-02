import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { addRequest } from "../../schemas/yupShemas";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";
import { MyBackdrop } from "../../components/ui/Backdrop";

export const AddRequest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState([]);
  const handleOnchangeAutoComplete = (e, params) => {};
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      request: "",
      user: null,
      description: "",
      service: null,
      detail: "",
    },
    validationSchema: addRequest,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      const isSaveTicket = await postServiceApp(
        {
          tecnico: values.user.correo,
          servicio: values.service.servicio._id,
          customer: values.service.cliente.correo,
          tipoRequest: values.request,
          description: values.description,
        },
        endpoints.request
      );
      dataValidation(isSaveTicket);
      resetForm();
      setLoading(false);
    },
  });

  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    const { contratosDeServicio } = await getServiceApp(
      endpoints.contratoDeServicio
    );
    setService(contratosDeServicio);
  };

  const loadUser = async () => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUsers(
        validData?.usuarios.filter(
          (usuarios) =>
            usuarios.rol === "TECNICO" || usuarios.rol === "ADMIN_ROLE"
        )
      );
    }
  };

  return (
    <>
      <MyBackdrop loading={loading} />

      <Container
        component="main"
        maxWidth="sm"
        style={{ marginTop: "90px", marginRight: "29%" }}
      >
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom align="center">
            Solicitud de Servicio
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label-tipoSolicitud">
                    Tipo Solicitud
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-tipoSolicitud"
                    id="demo-simple-select-tipoSolicitud"
                    name="request"
                    label="Tipo Solicitud"
                    value={values.request}
                    onChange={handleChange}
                    error={touched.request && Boolean(errors.request)}
                  >
                    <MenuItem value={"Orden Instalación"}>
                      Orden Instalación
                    </MenuItem>
                    <MenuItem value={"Orden Avería"}>Orden Avería</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F", margin: 0 }}>
                    {Boolean(errors.request) && "Este campo es requerido"}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="user"
                  options={users}
                  onChange={(e, params) => {
                    handleOnchangeAutoComplete(e, params);
                    handleChange({
                      ...e,
                      target: {
                        ...e.target,
                        name: "user",
                        value: !!params ? params : null,
                      },
                    });
                  }}
                  value={values.user}
                  getOptionLabel={(option) =>
                    `${option.nombre} - ${option.correo} - ${option.cedula}`
                  }
                  size="small"
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      name="user"
                      {...params}
                      label="Seleccione Usuario"
                      variant="standard"
                      error={touched.user && Boolean(errors.user)}
                      helperText={touched.user && errors.user}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="service"
                  options={service}
                  onChange={(e, params) => {
                    handleOnchangeAutoComplete(e, params);
                    setFieldValue("detail", params?.servicio?.nombre || "");
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
                  getOptionLabel={(option) =>
                    `${option.id} - ${option.cliente.cedula} - ${option.cliente.nombre} - ${option.calle}`
                  }
                  size="small"
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      name="service"
                      {...params}
                      label="Seleccione Servicio"
                      variant="standard"
                      error={touched.service && Boolean(errors.service)}
                      helperText={touched.service && errors.service}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="detail"
                  id="detail"
                  fullWidth
                  label="Detalle de Servicio"
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                  value={values.detail}
                  onChange={handleChange}
                  error={touched.detail && Boolean(errors.detail)}
                  helperText={touched.detail && errors.detail}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  id="description"
                  label="Descripción"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  size="large"
                  type="submit"
                >
                  Terminar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};
