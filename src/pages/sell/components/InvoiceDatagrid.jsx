import { DeleteOutline } from "@material-ui/icons";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import React from "react";

export const InvoiceDatagrid = ({ invoiceProductsData, setDataState }) => {
  const handleDelete = (id) => {
    const { subTotal, total } = invoiceProductsData.find(
      (item) => item.uid === id
    );
    setTimeout(() => {
      setDataState((data) => {
        return {
          ...data,
          subTotal: (data.subTotal - subTotal).toFixed(2),
          total: (data.total - total).toFixed(2),
          invoiceProductsData: invoiceProductsData.filter(
            (item) => item.uid !== id
          ),
        };
      });
    });
  };
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Producto",
      flex: 1,
    },
    {
      field: "cantidadRequerida",
      headerName: "Cantidad",
      flex: 1,
      type: "number",
    },
    {
      field: "precio_venta",
      headerName: "Precio unitario",
      flex: 1,
      type: "number",
    },
    {
      field: "subTotal",
      headerName: "Precio total",
      flex: 1,
      type: "number",
    },
    {
      field: "impuestos",
      headerName: "Impuesto",
      flex: 1,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      type: "number",
    },

    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <DeleteOutline
            onClick={() => handleDelete(params.row.uid)}
            className="orderListDelete"
          />
        );
      },
    },
  ];
  return (
    <Box sx={{ marginTop: 2, flex: 1, boxShadow: 2, height: "50%" }}>
      <DataGrid
        rows={invoiceProductsData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        getRowId={(e) => e?.uid || 0}
        components={{ Toolbar: GridToolbar }}
        filterMode="client"
        density="compact"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};
