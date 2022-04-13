import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./serviceList.css";
import { TextField } from "@mui/material";
import MyFab from "../../components/fab/MyFab";

export default function ServiceList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Servicio",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="serviceListItem">
            <img className="serviceListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Estatus",
      width: 120,
    },
    {
      field: "price",
      headerName: "Precio",
      width: 160,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row.id}>
              <button className="serviceListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="serviceListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="serviceList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />
      <MyFab route="/newservice" />
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
