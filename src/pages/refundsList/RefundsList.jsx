import React, { useEffect, useState } from "react";
import MyFab from "../../components/fab/MyFab";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import moment from "moment";
import { formatter } from "../../utils/constants/formatNumber";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { dataValidation } from "../../utils/helpers/messages";

export const RefundsList = () => {
  const [{ loading, devolucionesData }, setOrdenesData] = useState({
    loading: true,
    devolucionesData: [],
  });
  const handleDelete = async (id) => {
    const dataResponse = await deleteServiceApp(id, endpoints.devoluciones);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      loadRefunds();
    }
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
      renderCell: (params) => params.row.canjeada,
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
      renderCell: (params) => params.row.estado,
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
            {params.row.estado === "ACTIVA" && (
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
    loadRefunds();
  }, []);

  const loadRefunds = async () => {
    const { devolucion } = await getServiceApp(endpoints.devoluciones);
    const devolucionesData = devolucion.map(({ canjeada, estado, ...data }) => {
      return {
        canjeada: canjeada ? "SI" : "NO",
        estado: estado ? "ACTIVA" : "ANULADA",
        ...data,
      };
    });
    setOrdenesData({
      loading: false,
      devolucionesData,
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
