import React, { useCallback, useEffect, useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { desktopForm } from "../../schemas/yupShemas";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import "../newCategory/newCategory.css";

export const DesktopRegistered = () => {
  const [users, setUsers] = useState([]);
  const [desk, setDesk] = useState([]);
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
    initialValues: { name: "", user: null },
    validationSchema: desktopForm,
    onSubmit: async ({ name, user }) => {
      const payload = { nombre: name, usuarioAsignado: user.correo };
      const isSaveDesktop = await postServiceApp(payload, endpoints.desk);
      const validData = dataValidation(isSaveDesktop);
      if (validData.ok) {
        resetForm();
      }
      loadDesk();
    },
  });

  const loadDesk = useCallback(async () => {
    const dataResponse = await getServiceApp(endpoints.desk);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setDesk(validData?.desk);
      setFieldValue(
        "name",
        `ESCRITORIO ${Number(validData?.desk?.length) + 1}`
      );
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

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Escritorio",
      flex: 1,
    },
    {
      field: "usuarioAsignado",
      headerName: "Usuario Asignado",
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            {params.row.estado ? "Activo" : "Inactivo"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.uid}>
              <button className="categoryListEdit">Editar</button>
            </Link>
            {params.row.estado && (
              <DeleteOutline className="categoryListDelete" />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <MyBackdrop loading={false} />

      <div className="newCategory">
        <h1 className="addCategoryTitle">Estaciones de trabajo</h1>
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
            Crear
          </button>
        </form>
        <div style={{ height: "60%" }}>
          <DataGrid
            rows={desk}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e.uid}
            loading={false}
            filterMode="client"
            density="comfortable"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </>
  );
};
