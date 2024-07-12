import React, { useCallback, useEffect, useState } from "react";
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
import useForm from "../../hooks/useForm";
import { useFormik } from "formik";
import { desktopForm } from "../../schemas/yupShemas";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";

export const DesktopRegistered = () => {
  const [users, setUsers] = useState([]);
  const handleOnchangeAutoComplete = (e, params) => {};
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
    initialValues: { name: "", user: null },
    validationSchema: desktopForm,
    onSubmit: async (values) => {
        console.log(values);
    },
  });

  const loadDesk = useCallback(async () => {
    const dataResponse = await getServiceApp(endpoints.desk);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setFieldValue("name", `ESCRITORIO ${Number(validData?.desk?.length) + 1}`);
    }
  }, [setFieldValue]);

  const loadUser = async () => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUsers(validData?.usuarios.filter(
        (usuarios) => usuarios.rol === "TECNICO_MESA"));
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
        <h1 className="addCategoryTitle">Nueva categoría</h1>
        <form onSubmit={handleSubmit} className="addCategoryForm">
          <div className="addCategoryItem">
            <TextField
              id="name"
              label="name"
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
            <Grid item xs={10}>
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
                  `${option.nombre} - ${option.cedula}`
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
          <button type="submit" className="addCategoryButton">Crear</button>
        </form>
      </div>
    </>
  );
};
