import React, { useEffect, useState } from "react";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import MyFab from "../../components/fab/MyFab";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import {
  confirmActionMessage,
  dataValidation,
} from "../../utils/helpers/messages";

export const SearchContract = () => {
  const [{ loading, conrtactData: contractData }, setConrtactData] = useState({
    loading: true,
    conrtactData: [],
  });

  const loadContract = async () => {
    const { contratosDeServicio } = await getServiceApp(
      endpoints.contratoDeServicio
    );
    setConrtactData({
      loading: false,
      conrtactData: contratosDeServicio,
    });
  };

  const dataParaFiltro = () => {
    return contractData.map((data) => {
      return {
        ...data,
        servicio: data.servicio.descripcion,
        cliente: data.cliente.cedula,
        nombre: data.cliente.nombre,
        estado: data?.estado ? "Activo" : "Inactivo",
        calle: data.calle,
      };
    });
  };

  const handleDelete = async (id) => {
    const result = await confirmActionMessage();
    if (result.isConfirmed) {
      const dataResponse = await deleteServiceApp(
        id,
        endpoints.contratoDeServicio
      );
      const validData = dataValidation(dataResponse);
      if (validData.ok) {
        loadContract();
      }
    }
  };

  useEffect(() => {
    loadContract();
  }, []);

  const columns = [
    { field: "uid", headerName: "uid", hide: true, flex: 1 },
    { field: "id", headerName: "id", flex: 1 },
    { field: "servicio", headerName: "Descripción", flex: 1 },
    { field: "cliente", headerName: "Cedula", flex: 1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 1 },
    { field: "calle", headerName: "Calle", flex: 1 },

    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/contractdetail/" + params.row.uid}>
              <button className="productListEdit">Ver Contrato</button>
            </Link>
            {params.row.estado === "Activo" && (
              <DeleteOutline
                className="productListDelete"
                onClick={() => handleDelete(params.row.uid)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <MyFab route="/addservice" />
      <div className="dataGrid">
        <DataGrid
          rows={dataParaFiltro()}
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
};
