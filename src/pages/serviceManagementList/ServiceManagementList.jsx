import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { serviceManagementRows } from "../../dummyData";
import { useState } from "react";
import { TextField } from "@mui/material";
import MyFab from "../../components/fab/MyFab";
import "./serviceManagementList.css";

export default function ServiceManagementList() {
  const [data, setData] = useState(serviceManagementRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Fecha Corte",
      width: 100,
    },
    { field: "customer", headerName: "Cliente", width: 150 },
    { field: "teller", headerName: "Cajero", width: 150 },
    { field: "description", headerName: "Descripción", width: 200 },
    {
      field: "status",
      headerName: "Estatus",
      width: 120,
    },
    {
      field: "amount",
      headerName: "Total",
      width: 150,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <DeleteOutline
            className="serviceManagementListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="serviceManagementList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />

      <MyFab route="/servicesales" />
      <div className="dataGrid">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
