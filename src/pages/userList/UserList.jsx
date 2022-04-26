import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { DeleteOutline } from "@material-ui/icons";
import { getUsers } from "../../service/auth";
import MyFab from "../../components/fab/MyFab";
import "./userList.css";

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers().then((result) => setData(result));
  }, []);

  const handleDelete = (uid) => {
    setData(data.filter((item) => item.uid !== uid));
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1 },
    { field: "nombre", headerName: "Nomber Usuario", flex: 1 },
    { field: "usuario", headerName: "Nombre de usuario", flex: 1 },
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
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.estado ? "Usuario Activo" : "Inactivo"}
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
            <Link to={"/user/" + params.row.uid}>
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
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />

      <MyFab route="/newuser" />

      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          getRowId={(e) => e.uid}
        />
      </div>
    </div>
  );
}
