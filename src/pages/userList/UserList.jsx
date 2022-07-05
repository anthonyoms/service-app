import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./userList.css";
import MyFab from "../../components/fab/MyFab";
import { endpoints } from "../../utils/constants/endpoints";
import { errorMsg, successMsg } from "../../utils/helpers/messages";
import { fetchServiceApp } from "../../services/serviceApp";
import { httpMethods } from "../../utils/constants/httpMethods";

export default function UserList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await fetchServiceApp(endpoints.users);
    if (data.ok) {
      setData(data.usuarios);
    } else {
      errorMsg();
    }
  };
  const handleDelete = async (id) => {
    const { data } = await fetchServiceApp(
      `${endpoints.users}/${id}`,
      {},
      httpMethods.Delete
    );
    if (data.ok) {
      successMsg(data.msg);
      loadUsers();
    } else {
      errorMsg(data.errorMsg);
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
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          filterMode="client"
        />
      </div>
    </div>
  );
}
