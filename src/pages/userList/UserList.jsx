import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Fab, TextField } from "@mui/material";
import { DeleteOutline, Add } from "@material-ui/icons";

import "./userList.css";
import { userRows } from "../../dummyData";

const fabStyle = {
  position: "absolute",
  bottom: 75,
  right: 30,
};

export default function UserList() {
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Nombre de usuario", width: 200 },
    {
      field: "user",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Estatus",
      type: "number",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transction Volumen",
      type: "number",
      width: 160,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
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
      <Link to="/newuser">
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <div className="DataGrid">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
