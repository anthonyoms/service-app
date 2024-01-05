import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";

import "./supplierList.css";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import {
  confirmActionMessage,
  dataValidation,
} from "../../utils/helpers/messages";

export default function SupplierList() {
  const [{ loading, suppliersData }, setSuppliersData] = useState({
    loading: true,
    suppliersData: [],
  });
  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const dataResponse = await getServiceApp(endpoints.suppliers);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setSuppliersData({
        loading: false,
        suppliersData: validData.suplidor,
      });
    }
  };
  const handleDelete = async (id) => {
    const result = await confirmActionMessage();
    if (result.isConfirmed) {
      const dataResponse = await deleteServiceApp(id, endpoints.suppliers);
      dataValidation(dataResponse);
      loadSuppliers();
    }
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "cedula_rnc", headerName: "Rnc/Cedula", flex: 1 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "contacto", headerName: "Contacto", flex: 1 },
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
            <Link to={"/supplier/" + params.row.uid}>
              <button className="supplierListEdit">Editar</button>
            </Link>
            {params.row.estado && (
              <DeleteOutline
                className="categoryListDelete"
                onClick={() => handleDelete(params.row.uid)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="supplierList">
      <MyFab route="/newsupplier" />
      <div className="dataGrid">
        <DataGrid
          rows={suppliersData}
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
