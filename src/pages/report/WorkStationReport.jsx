import React, { useCallback, useEffect, useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import moment from "moment";

export const WorkStationReport = () => {
  const [desk, setDesk] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadDesk = useCallback(async () => {
    const dataResponse = await getServiceApp(endpoints.desk);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setDesk(validData?.desk);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDesk();
  }, [loadDesk]);

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Escritorio",
      flex: 1,
    },
    {
      field: "usuarioAsignado",
      headerName: "Usuario Asignado",
      flex: 1,
    },
    {
      field: "fechaEmision",
      type: "date",
      renderCell: (params) => {
        return moment(params.row.fechaEmision).format("DD/MM/YYYY");
      },
      headerName: "Fecha Creación",
      flex: 1,
    },
    {
      field: "usuario",
      headerName: "Usuario Creador",
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
  ];

  const dataParaFiltro = () => {
    return desk.map((data) => {
      return {
        ...data,
        estado: data?.estado ? "Activo" : "Inactivo",
        usuario: data.usuario.correo,
      };
    });
  };

  return (
    <>
      <MyBackdrop loading={loading} />

      <div className="newCategory">
        <h1 className="addCategoryTitle">Estaciones de trabajo</h1>
        <div style={{ height: "60%" }}>
          <DataGrid
            rows={dataParaFiltro()}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e.uid}
            loading={loading}
            filterMode="client"
            density="compact"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </>
  );
};
