import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./productList.css";
import { Fab, TextField } from "@mui/material";
const fabStyle = {
  position: "absolute",
  bottom: 70,
  right: 30,
};
export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Producto",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
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
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        sx={{ mb: 1 }}
      />
      <Link to="/newproduct">
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <div className="DataGrid">
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
