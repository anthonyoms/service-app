import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box,
  MenuItem,
} from "@mui/material";
import { createUsername } from "../../utils/helpers/createUsername";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { endpoints } from "../../utils/constants/endpoints";
import { saveWithImage } from "../../services/serviceApp";

const validationSchema = Yup.object({
  cedula: Yup.string().required("La cédula es obligatoria"),
  correo: Yup.string()
    .email("Correo no válido")
    .required("El correo es obligatorio"),
  usuario: Yup.string().required("El nombre de usuario es obligatorio"),
  nombre: Yup.string().required("El nombre es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  telefono: Yup.string().required("El teléfono es obligatorio"),
  fechaNacimiento: Yup.date().required("La fecha de nacimiento es obligatoria"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  genero: Yup.string().required("El género es obligatorio"),
  estadoCivil: Yup.string().required("El estado civil es obligatorio"),
  rol: Yup.string(),
  img: Yup.string(),
});

const Signup = () => {
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      cedula: "",
      correo: "",
      usuario: "",
      nombre: "",
      password: "",
      telefono: "",
      fechaNacimiento: "",
      direccion: "",
      genero: "",
      estadoCivil: "",
      rol: "CUSTOMER_ROLE",
      img: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const isSaveUser = await saveWithImage(
        values,
        userImage,
        endpoints.users
      );
      setLoading(false);
      if (isSaveUser.ok) {
        formik.resetForm();
      }
    },
  });

  const getUsername = () => {
    const email = formik.values.correo;
    if (!!email) {
      formik.setFieldValue(
        "usuario",
        `${email.split("@")[0]}${Math.floor(Math.random() * 1000)}`
      );
    }
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Registro de Usuario
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="correo"
                  name="correo"
                  label="Correo Electrónico"
                  value={formik.values.correo}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    getUsername();
                  }}
                  error={formik.touched.correo && Boolean(formik.errors.correo)}
                  helperText={formik.touched.correo && formik.errors.correo}
                />
              </Grid>
              {[
                { id: "cedula", label: "Cédula" },
                { id: "usuario", label: "Usuario" },
                { id: "nombre", label: "Nombre Completo" },
                { id: "password", label: "Contraseña", type: "password" },
                { id: "telefono", label: "Teléfono" },
                {
                  id: "fechaNacimiento",
                  label: "Fecha de Nacimiento",
                  type: "date",
                },
                { id: "direccion", label: "Dirección" },
              ].map(({ id, label, type = "text" }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <TextField
                    fullWidth
                    id={id}
                    name={id}
                    label={label}
                    type={type}
                    value={formik.values[id]}
                    onChange={formik.handleChange}
                    error={formik.touched[id] && Boolean(formik.errors[id])}
                    helperText={formik.touched[id] && formik.errors[id]}
                    InputLabelProps={type === "date" ? { shrink: true } : {}}
                  />
                </Grid>
              ))}

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="genero"
                  name="genero"
                  label="Género"
                  value={formik.values.genero}
                  onChange={formik.handleChange}
                  error={formik.touched.genero && Boolean(formik.errors.genero)}
                  helperText={formik.touched.genero && formik.errors.genero}
                >
                  <MenuItem value="masculino">Masculino</MenuItem>
                  <MenuItem value="femenino">Femenino</MenuItem>
                  <MenuItem value="otro">Otro</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  id="estadoCivil"
                  name="estadoCivil"
                  label="Estado Civil"
                  value={formik.values.estadoCivil}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  error={
                    formik.touched.estadoCivil &&
                    Boolean(formik.errors.estadoCivil)
                  }
                  helperText={
                    formik.touched.estadoCivil && formik.errors.estadoCivil
                  }
                >
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Soltero"}>Soltero</MenuItem>
                  <MenuItem value={"Viudo"}>Viudo</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="img"
                  name="img"
                  variant="outlined"
                  type="file"
                  value={formik.values.img}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setUserImage(e.target?.files[0]);
                  }}
                  error={formik.touched.img && Boolean(formik.errors.img)}
                  helperText={formik.touched.img && formik.errors.img}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
