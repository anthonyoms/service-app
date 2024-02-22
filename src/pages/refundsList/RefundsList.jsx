import React, { useEffect, useState } from "react";
import MyFab from "../../components/fab/MyFab";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import moment from "moment";
import { formatter } from "../../utils/constants/formatNumber";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";

export const RefundsList = () => {
  const [{ loading, devolucionesData }, setOrdenesData] = useState({
    loading: true,
    devolucionesData: [],
  });
  const handleDelete = async (id) => {
    console.log(id);
  };
  const columns = [
    { field: "_id", headerName: "UID", flex: 1, hide: true },
    { field: "id", headerName: "Devolución ID", flex: 1 },

    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: (params) => formatter.format(params.row.total),
    },
    {
      field: "canjeada",
      headerName: "Canjeada",
      flex: 1,
      renderCell: (params) => (params.row.canjeada ? "si" : "no"),
    },
    {
      field: "cliente",
      headerName: "Cliente",
      flex: 1,
      renderCell: (params) => params.row.cliente.nombre,
    },
    {
      field: "documento",
      headerName: "Documento",
      flex: 1,
      renderCell: (params) => params.row.cliente.cedula,
    },
    {
      field: "fechaEmision",
      headerName: "Fecha emisión",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.fechaEmision).format("DD/MM/YYYY"),
    },
    {
      field: "fechaVencimiento",
      headerName: "Vencimiento",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.fechaVencimiento).format("DD/MM/YYYY"),
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (params.row.canjeada ? "Activa" : "Anulada"),
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/refundsinvoice/" + params.row._id} target="_blank">
              <button className="serviceListEdit">Ver</button>
            </Link>
            {params.row.estado && (
              <DeleteOutline
                className="serviceListDelete"
                onClick={() => handleDelete(params.row._id)}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const { devolucion } = await getServiceApp(endpoints.devoluciones);
    setOrdenesData({
      loading: false,
      devolucionesData: devolucion,
    });
  };

  return (
    <div className="serviceList">
      <MyFab route="/refunds" />
      <div className="dataGrid">
        <DataGrid
          rows={devolucionesData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          loading={loading}
          filterMode="client"
          density="comfortable"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
};
