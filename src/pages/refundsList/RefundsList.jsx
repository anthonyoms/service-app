import React, { useEffect, useState } from "react";
import MyFab from "../../components/fab/MyFab";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";

export const RefundsList = () => {
  const [{ loading, devolucionesData }, setOrdenesData] = useState({
    loading: true,
    devolucionesData: [],
  });
  const columns = [
    { field: "uid", headerName: "UID", flex: 1, hide: true },
    { field: "id", headerName: "Devolución ID", flex: 1 },
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
