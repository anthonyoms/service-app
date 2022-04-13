import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { categoryRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./categoryList.css";
import { TextField } from "@mui/material";
import MyFab from "../../components/fab/MyFab";

export default function CategoryList() {
  const [data, setData] = useState(categoryRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "categoria",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            <img className="categoryListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Estatus",
      width: 240,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 250,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.id}>
              <button className="categoryListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="categoryListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="categoryList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />
      <MyFab route="/newcategory" />
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
