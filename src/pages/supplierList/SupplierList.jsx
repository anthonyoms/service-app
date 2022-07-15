import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";

import "./supplierList.css";
import { userRows } from "../../dummyData";
import MyFab from "../../components/fab/MyFab";

export default function SupplierList() {
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    { field: "username", headerName: "Nombre de suplidor", flex: 1 },
    {
      field: "supplier",
      headerName: "Usuario",
      flex: 1,
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
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "status",
      headerName: "Estatus",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
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
      <MyFab route="/newsupplier" />
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // getRowId={(e) => e.uid}
          // loading={loading}
          filterMode="client"
        />
      </div>
    </div>
  );
}
