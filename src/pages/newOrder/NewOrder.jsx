import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./newOrder.css";
import { useState } from "react";

export default function NewOrder() {
  const [data, setData] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "product",
      headerName: "Servicio",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="serviceListItem">
            <img className="serviceListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "status",
      headerName: "Estatus",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row.id}>
              <button className="serviceListEdit">Editar</button>
            </Link>
            <DeleteOutline className="serviceListDelete" />
          </>
        );
      },
    },
  ];
  return (
    <div className="newOrder">
      <div className="newOrderTitleContainer">
        <h1 className="newOrderTitle">Orden de compra No. #{1}</h1>
        <Link to="/newsupplier">
          <button className="newOrderAddButton">Crear Suplidor</button>
        </Link>
      </div>
      <div className="newOrderTop">
        <div className="newOrderTopLeft">
          <TextField
            id="suplidor"
            label="Suplidor"
            name="suplidor"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "50" }}
          />
          <TextField
            id="vendedor"
            label="Vendedor"
            name="vendedor"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "50" }}
          />
          <TextField
            id="cedulaRnc"
            label="Cedula/Rnc"
            name="cedulaRnc"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "50" }}
          />
          <TextField
            id="contacto"
            label="Contacto"
            name="contacto"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "50" }}
          />
          <TextField
            id="telefono"
            label="Teléfono"
            name="telefono"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "10" }}
          />
          <TextField
            id="fechaEmision"
            label="Fecha de emisión"
            name="fechaEmision"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "10" }}
          />
          <TextField
            id="vence"
            label="Vence"
            name="vence"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "10" }}
          />
          <TextField
            id="total"
            label="Total orden de compra"
            name="total"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ maxLength: "10" }}
          />
        </div>
        <div className="newOrderTopRight">
          <div className="newOrderForm">
            <div className="newOrderItem">
              <TextField
                id="nombreProducto"
                label="Nombre del Producto"
                name="nombre"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="cantidadActual"
                label="Cantidad Actual"
                name="cantidadActual"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="precioCompra"
                label="Costo unidad"
                name="precioCompra"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="cantidadRequerida"
                label="Cantidad requerida"
                name="cantidadRequerida"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="precioVenta"
                label="Precio de venta"
                name="precioVenta"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="totalProducto"
                label="Total"
                name="totalProducto"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
          </div>
          <button className="newOrderButton">Agregar Producto</button>
        </div>
      </div>
      <div className="newOrderBottom">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </div>
    </div>
  );
}
