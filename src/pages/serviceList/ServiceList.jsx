import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./serviceList.css";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

export default function ServiceList() {
  const [{ loading, serviceData }, setServiceData] = useState({
    loading: true,
    serviceData: [],
  });

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const { servicios } = await getServiceApp(endpoints.services);
    setServiceData({
      loading: false,
      serviceData: servicios,
    });
  };
  const handleDelete = async (id) => {
    const dataResponse = await deleteServiceApp(id, endpoints.services);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      loadService();
    }
  };
  const columns = [
    { field: "codigo", headerName: "ID", flex: 1 },
    {
      field: "nombre",
      headerName: "Servicio",
      flex: 1,
    },
    { field: "periodoFacturacion", headerName: "Periodo facturación", flex: 1 },
   
    { field: "precio_instalacion", headerName: "Precio instalación", type: "number", flex: 1 },
    {
      field: "precio_venta",
      headerName: "Precio",
      type: "number",
      flex: 1,
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
            <Link to={"/service/" + params.row.uid}>
              <button className="serviceListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="serviceListDelete"
              onClick={() => handleDelete(params.row.uid)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="serviceList">
      <MyFab route="/newservice" />
      <div className="dataGrid">
        <DataGrid
          rows={serviceData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          loading={loading}
          filterMode="client"
          density="comfortable"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
}
