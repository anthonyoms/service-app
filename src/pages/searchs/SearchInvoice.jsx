import React, { useEffect, useState } from "react";
import { endpoints } from "../../utils/constants/endpoints";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import MyFab from "../../components/fab/MyFab";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import "../product/product.css";
import "../productList/productList.css";
import moment from "moment";
import { confirmActionMessage, dataValidation } from "../../utils/helpers/messages";

export const SearchInvoice = () => {
  const [{ loading, invoiceData }, setInvoiceData] = useState({
    loading: true,
    invoiceData: [],
  });

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const { facturas } = await getServiceApp(endpoints.facturacion);
    setInvoiceData({
      loading: false,
      invoiceData: facturas,
    });
  };

  const dataParaFiltro = () => {
    return invoiceData?.map((data) => {
      return {
        ...data,
        cedula: data?.cliente?.cedula,
        fechaEmision: moment.utc(data.fechaEmision).format("DD/MM/YYYY"),
        estado: data?.estado ? "Activo" : "Inactivo",
        fechaVencimiento: moment
          .utc(data.fechaVencimiento)
          .format("DD/MM/YYYY"),
        total:
          data?.totalAfterdiscount > 0
            ? Number(data?.totalAfterdiscount)
            : Number(data?.total),
      };
    });
  };

  const handleDelete = async (id) => {
    const result = await confirmActionMessage();
    if (result.isConfirmed) {
      const dataResponse = await deleteServiceApp(
        id,
        endpoints.facturacion
      );
      const validData = dataValidation(dataResponse);
      if (validData.ok) {
        loadInvoice();
      }
    }
  };

  const columns = [
    { field: "uid", headerName: "uid", hide: true, flex: 1 },
    { field: "id", headerName: "id", flex: 1 },
    { field: "cedula", headerName: "Cedula", flex: 1 },
    { field: "total", type: "number", headerName: "Total", flex: 1 },
    { field: "tipoComprobante", headerName: "Comprobante", flex: 1 },
    { field: "tipoPago", headerName: "Tipo Pago", flex: 1 },
    {
      field: "fechaEmision",
      headerName: "Fecha Emisión",
      flex: 1,
      type: "date",
    },
    { field: "fechaVencimiento", headerName: "Vence", flex: 1, type: "date" },
    { field: "estado", headerName: "Estado", flex: 1 },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/sellinvoice/" + params.row.uid} target="_blank">
              <button className="productListEdit">Ver Factura</button>
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
      <MyFab route="/sell" />
      <div className="dataGrid">
        <DataGrid
          rows={dataParaFiltro() || []}
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
