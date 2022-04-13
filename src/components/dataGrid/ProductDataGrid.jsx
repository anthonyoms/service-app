import React from "react";
import { AddShoppingCart } from "@material-ui/icons";
import { IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { productRows } from "../../dummyData";

const ProductDataGrid = () => {
  const columns = [
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
    { field: "stock", headerName: "Stock", width: 90 },
    {
      field: "price",
      headerName: "Precio",
      width: 150,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: () => {
        return (
          <>
            <TextField id="bill" label="Cant." type="search" size="small" />
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCart />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        size="small"
        autoComplete="false"
        sx={{ mb: 1 }}
      />
      <div style={{ height: "45vh" }}>
        <DataGrid
          rows={productRows}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default ProductDataGrid;
