import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar,esES } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./userList.css";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import {
  confirmActionMessage,
  dataValidation,
} from "../../utils/helpers/messages";

export default function UserList() {
  const [{ loading, userData }, setUserData] = useState({
    loading: true,
    userData: [],
  });
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUserData({
        loading: false,
        userData: validData.usuarios,
      });
    }
  };
  const handleDelete = async (id) => {
    const result = await confirmActionMessage();
    if (result.isConfirmed) {
      const dataResponse = await deleteServiceApp(id, endpoints.users);
      dataValidation(dataResponse);
      loadUser();
    }
  };
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "cedula", headerName: "Cedula", flex: 1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    {
      field: "usuario",
      headerName: "Usuario",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {<img className="userListImg" src={params.row.img} alt="" />}
            {params.row.usuario}
          </div>
        );
      },
    },
    { field: "correo", headerName: "Email", flex: 1 },
    { field: "rol", headerName: "Rol", flex: 1 },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.uid}`}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.uid)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <MyFab route="/newuser" />

      <div className="dataGrid">
        <DataGrid
          rows={userData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          loading={loading}
          filterMode="client"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
}
