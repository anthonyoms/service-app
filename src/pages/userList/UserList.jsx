import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { DeleteOutline } from "@material-ui/icons";
import { getUsers } from "../../service/users";
import MyFab from "../../components/fab/MyFab";
import "./userList.css";
import { searchUsers } from "../../service/search";

export default function UserList() {
  const [data, setData] = useState([]);
  const [termino, setTermino] = useState("");

  useEffect(() => {
    if (termino.length === 0) {
      loadUsers();
    }
  }, [termino]);

  const handleInput = async ({ target }) => {
    setTermino(target.value);
    if (target.value.length > 0) {
      const data = await searchUsers(target.value.trim());
      setData(data);
    }
  };

  const loadUsers = async () => {
    const users = await getUsers();
    setData(users);
  };

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
        name="termino"
        value={termino}
        onChange={handleInput}
        sx={{ mb: 1 }}
      />

      <MyFab route="/newuser" />

      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(e) => e.uid}
        />
      </div>
    </div>
  );
}
