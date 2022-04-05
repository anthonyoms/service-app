import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Fab, TextField } from "@mui/material";
import { DeleteOutline, Add } from "@material-ui/icons";

import "./customerList.css";
import { userRows } from "../../dummyData";

const fabStyle = {
  position: "absolute",
  bottom: 70,
  right: 30,
};

export default function CustomerList() {
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
          <div className="customerListUser">
            <img className="customerListImg" src={params.row.avatar} alt="" />
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
            <Link to={"/customer/" + params.row.id}>
              <button className="customerListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="customerListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="customerList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />
      <Link to="/newcustomer">
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <div className="dataGrid">
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
