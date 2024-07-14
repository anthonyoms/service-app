import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { desktopForm, UpdateDesktopForm } from "../../schemas/yupShemas";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";
import { MyBackdrop } from "../../components/ui/Backdrop";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { useNavigate } from "react-router-dom";

export const SetDesktop = () => {
  const [users, setUsers] = useState([]);
  const [desk, setDesk] = useState([]);
  const navigate = useNavigate();
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
    initialValues: { name: "", user: null, estado: false },
    validationSchema: UpdateDesktopForm,
    onSubmit: async ({ user, estado }) => {
      let newdesk = { ...desk };
      newdesk.usuarioAsignado = user.correo;
      newdesk.estado = estado;

      const dataResponse = await updateServiceApp(
        newdesk,
        endpoints.desk,
        desk.uid
      );
      const validData = dataValidation(dataResponse);
      if (validData.ok) {
        navigate("/desktop-manager");
      }
    },
  });

  const loadDesk = useCallback(async () => {
    const id = getIdUrl();
    const dataResponse = await getServiceApp(endpoints.desk + `/${id}`);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setDesk(validData?.desk);
      setFieldValue("name", validData?.desk?.nombre);
      setFieldValue("estado", validData?.desk?.estado);
    }
  }, [setFieldValue]);

  const loadUser = async () => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUsers(
        validData?.usuarios.filter(
          (usuarios) => usuarios.rol === "TECNICO_MESA"
        )
      );
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadDesk();
  }, [loadDesk]);

  return (
    <>
      <MyBackdrop loading={false} />

      <div className="newCategory">
        <h1 className="addCategoryTitle">Actualizar Escritorio</h1>
        <form onSubmit={handleSubmit} className="addCategoryForm">
          <div className="addCategoryItem">
            <TextField
              id="name"
              label="Nombre"
              variant="outlined"
              autoComplete="off"
              disabled
              inputProps={{ maxLength: "50" }}
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </div>
          <div className="addCategoryItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-estado">
                Activo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-estado"
                id="demo-simple-select-estado"
                name="estado"
                label="Estado"
                value={values.estado}
                onChange={handleChange}
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="addCategoryItem">
            <Grid item xs={10}>
              <Autocomplete
                disablePortal
                id="user"
                disabled={!!values?.estado ? false : true}
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
          </div>
          <button type="submit" className="addCategoryButton">
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
