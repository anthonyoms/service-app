import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import {
  confirmActionMessage,
  dataValidation,
} from "../../utils/helpers/messages";
import moment from "moment";

export default function OrderList() {
  const [{ loading, ordenesData }, setordenesData] = useState({
    loading: true,
    ordenesData: [],
  });

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const { ordenes } = await getServiceApp(endpoints.ordenes);
    setordenesData({
      loading: false,
      ordenesData: ordenes.map((orden) => {
        return { ...orden, nombreSuplidor: orden.suplidor.nombre };
      }),
    });
  };
  const handleDelete = async (id) => {
    const result = await confirmActionMessage();
    if (result.isConfirmed) {
      const dataResponse = await deleteServiceApp(id, endpoints.ordenes);
      const validData = dataValidation(dataResponse);
      if (validData.ok) {
        loadOrder();
      }
    }
  };

  const columns = [
    { field: "uid", headerName: "UID", flex: 1, hide: true },
    { field: "id", headerName: "Orden ID", flex: 1 },
    {
      field: "nombreSuplidor",
      headerName: "Suplidor",
      flex: 1,
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
      headerName: "Fecha de vencimiento",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.fechaVencimiento).format("DD/MM/YYYY"),
    },
    {
      field: "totalTax",
      headerName: "Impuestos",
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
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            {params.row.estado ? "Activo" : "Inactivo"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/invoice/" + params.row.uid} target="_blank">
              <button className="serviceListEdit">Ver</button>
            </Link>
            {params.row.estado && (
              <DeleteOutline
                className="serviceListDelete"
                onClick={() => handleDelete(params.row.uid)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="serviceList">
      <MyFab route="/neworder" />
      <div className="dataGrid">
        <DataGrid
          rows={ordenesData}
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
}
