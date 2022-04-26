import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState } from "react";
import { TextField } from "@mui/material";
import { salesManagementRows } from "../../dummyData";
import MyFab from "../../components/fab/MyFab";
import "./salesManagementList.css";

export default function SalesManagementList() {
  const [data, setData] = useState(salesManagementRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "date",
      headerName: "Fecha",
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
            className="salesManagementListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  return (
    <div className="salesManagementList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />

      <MyFab route="/sales" />
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
