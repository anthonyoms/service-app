import { useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  reporteVentas,
  reporteVentasProdusctos,
} from "../../schemas/yupShemas";
import {
  downloadFileServiceApp,
  getServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { formatter } from "../../utils/constants/formatNumber";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, TextField } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";

export const MonthSalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      fechaDesde: moment(),
      fechaHasta: moment(),
    },
    validationSchema: reporteVentas,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const dataResponse = await getServiceApp(
          `${endpoints.report}/ventaspormes?fechaDesde=${moment(
            values.fechaDesde
          ).format("YYYY-MM-DD")}&fechaHasta=${moment(values.fechaHasta).format(
            "YYYY-MM-DD"
          )}`
        );
        const validData = dataValidation(dataResponse, false);
        if (validData.ok) {
          console.log(validData);
          setReportData(validData.facturas);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    },
  });

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "id", headerName: "ID factura", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      renderCell: (params) => formatter.format(params.row.total),
      flex: 1,
    },
    {
      field: "subTotal",
      headerName: "subTotal",
      renderCell: (params) => formatter.format(params.row.subTotal),
      flex: 1,
    },
    {
      field: "itbis",
      headerName: "Itbis",
      renderCell: (params) => formatter.format(params.row.itbis),
      flex: 1,
    },

    {
      field: "fechaEmision",
      headerName: "Fecha",
      renderCell: (params) =>
        moment(params.row.fechaEmision).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "usuario",
      headerName: "Cliente",
      renderCell: (params) => params.row.cliente.nombre,
      flex: 1,
    },
    {
      field: "vendedor",
      headerName: "Vendedor",
      renderCell: (params) => params.row.usuario.nombre,
      flex: 1,
    },
    {
      field: "tipoPago",
      headerName: "Método de Pago",
      flex: 1,
    },
  ];
  return (
    <>
      <MyBackdrop loading={loading} />
      <form onSubmit={handleSubmit} style={{ flex: 4 }}>
        <h1 style={{ marginBottom: 15 }}>Reporte de ventas por productos</h1>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Fecha Desde"
            inputFormat="dd/MM/yyyy"
            value={values.fechaDesde}
            onChange={(date) => {
              setFieldValue("fechaDesde", date ? date : moment()); // Actualiza el valor de Formik
            }}
            renderInput={(params) => (
              <TextField
                error={touched.fechaDesde && Boolean(errors.fechaDesde)}
                helperText={touched.fechaDesde && errors.fechaDesde}
                autoComplete="off"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Fecha Hasta"
            inputFormat="dd/MM/yyyy"
            value={values.fechaHasta}
            onChange={(date) => {
              setFieldValue("fechaHasta", date ? date : moment()); // Actualiza el valor de Formik
            }}
            renderInput={(params) => (
              <TextField
                error={touched.fechaHasta && Boolean(errors.fechaHasta)}
                helperText={touched.fechaHasta && errors.fechaDesde}
                autoComplete="off"
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: 10 }}
          variant="text"
          startIcon={<PlayCircle />}
          type="submit"
        >
          Generar Reporte
        </Button>
        <div style={{ height: "70%", marginTop: "10px" }}>
          <DataGrid
            rows={reportData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e.uid}
            loading={false}
            filterMode="client"
            density="compact"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </form>
    </>
  );
};
