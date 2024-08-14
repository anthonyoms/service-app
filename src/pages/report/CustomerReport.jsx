import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "../userList/userList.css";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import {
  confirmActionMessage,
  dataValidation,
} from "../../utils/helpers/messages";
import moment from "moment";

export const CustomerReport = () => {
  const location = useLocation();
  const [{ loading, userData }, setUserData] = useState({
    loading: true,
    userData: [],
  });
  useEffect(() => {
    loadUser(location);
  }, [location]);

  const loadUser = async ({ pathname }) => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUserData({
        loading: false,
        userData: validData.usuarios.filter(
          (usuario) => usuario.rol === "CUSTOMER_ROLE"
        ),
      });
    }
  };

  const dataParaFiltro = () => {
    return userData.map((data) => {
      return {
        ...data,

        estado: data?.estado ? "Activo" : "Inactivo",
      };
    });
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "cedula", headerName: "Cedula", flex: 1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "telefono", headerName: "Telefono", flex: 1 },
    { field: "direccion", headerName: "Direccion", flex: 1 },
    { field: "genero", headerName: "Genero", flex: 1 },
    { field: "estadoCivil", headerName: "Estado civil", flex: 1 },
    {
      field: "fechaNacimiento",
      headerName: "Fecha nacimiento",
      type: "date",
      renderCell: (params) =>
        moment(params.row.fechaNacimiento).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "fechaRegistro",
      headerName: "Registro",
      type: "date",
      renderCell: (params) =>
        moment(params.row.fechaRegistro).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "usuario",
      headerName: "Usuario",
      flex: 1,
      renderCell: (params) => {
        return params.row.usuario;
      },
    },
    { field: "correo", headerName: "Email", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 1 },
  ];

  return (
    <div className="userList">
      <MyFab
        route={
          location.pathname.includes("customers") ? "/newcustomer" : "/newuser"
        }
      />

      <div className="dataGrid">
        <DataGrid
          rows={dataParaFiltro()}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          loading={loading}
          filterMode="client"
          density="comfortable"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
};
