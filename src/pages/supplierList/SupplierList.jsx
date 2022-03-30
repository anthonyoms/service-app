import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Fab } from "@mui/material";
import { DeleteOutline, Add } from "@material-ui/icons";

import "./supplierList.css";
import { userRows } from "../../dummyData";

const fabStyle = {
  position: "absolute",
  bottom: 70,
  right: 30,
};

export default function SupplierList() {
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Nombre de suplidor", width: 200 },
    {
      field: "supplier",
      headerName: "Usuario",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="supplierListSupplier">
            <img
              className="supplierListImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrIJd0VXBhuzW4AOMssMlDBO-A5qhaGUvN4wF4t8pgJlaSkF5aB_W0Rqucp8Z8tELzMg&usqp=CAU"
              alt=""
            />
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
            <Link to={"/supplier/" + params.row.id}>
              <button className="supplierListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="supplierListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="supplierList">
      <Link to="/newsupplier">
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}
