import React, { useCallback, useEffect, useState } from "react";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp } from "../../services/serviceApp";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export const PaymentService = () => {
  const { uid } = useSelector((state) => state.auth);
  const [{ loading, conrtactData: contractData }, setConrtactData] = useState({
    loading: true,
    conrtactData: [],
  });

  const loadContract = useCallback(async () => {
    const { contratosDeServicio } = await getServiceApp(
      endpoints.contratoDeServicio
    );
    setConrtactData({
      loading: false,
      conrtactData: contratosDeServicio.filter(
        (data) => data.cliente._id === uid
      ),
    });
  }, [uid]);

  useEffect(() => {
    loadContract();
  }, [loadContract]);

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
            <Link to={"/paymentservice/" + params.row.uid}>
              <button className="productListEdit">Ver Contrato</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
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
