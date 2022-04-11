import { AddShoppingCart } from "@material-ui/icons";
import { IconButton, TextField } from "@mui/material";
export const Product = [
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
  { field: "stock", headerName: "Stock", width: 150 },
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
