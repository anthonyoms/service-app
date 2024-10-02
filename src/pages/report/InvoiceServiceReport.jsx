import { PlayCircle } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { reporteVentasServicios } from "../../schemas/yupShemas";
import moment from "moment";
import {
  downloadFileServiceApp,
  getServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { formatter } from "../../utils/constants/formatNumber";

export const InvoiceServiceReport = () => {
  const [servicio, setServicio] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      fechaDesde: moment(),
      fechaHasta: moment(),
      servicio: null,
    },
    validationSchema: reporteVentasServicios,
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const dataResponse = await getServiceApp(
          `${endpoints.report}/ventas-servicios/${
            values.servicio.uid
          }?fechaDesde=${moment(values.fechaDesde).format(
            "YYYY-MM-DD"
          )}&fechaHasta=${moment(values.fechaHasta).format("YYYY-MM-DD")}`
        );
        const validData = dataValidation(dataResponse, false);
        if (validData.ok) {
          console.log(validData);
          setReportData(validData.facturas);
        }
        await downloadFileServiceApp(
          `${endpoints.report}/ventas-servicios-download/${
            values.servicio.uid
          }?fechaDesde=${moment(values.fechaDesde).format(
            "YYYY-MM-DD"
          )}&fechaHasta=${moment(values.fechaHasta).format("YYYY-MM-DD")}`,
          `reporte_ventas_servicio_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
        );
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
  });

  const loadServicio = useCallback(async () => {
    setLoading(true);
    const dataResponse = await getServiceApp(endpoints.services);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setServicio(validData.servicios);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadServicio();
  }, [loadServicio]);

  const dataParaFiltro = () => {
    return reportData.map((data) => {
      return {
        ...data,
        nombre: data.servicio.nombre,
        usuario: data.cliente.nombre,
        cedulaCliente: data.cliente.cedula,
        total: Number(data.total) + Number(data.mora),
      };
    });
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "id", headerName: "ID factura", flex: 1 },
    { field: "idContrato", headerName: "ID contrato", flex: 1 },
    { field: "numeroComprobante", headerName: "Comprobante", flex: 1 },
    {
      field: "nombre",
      headerName: "Producto",
      hide: true,
      flex: 1,
    },
    {
      field: "mora",
      headerName: "Pago en mora",
      hide: true,
      renderCell: (params) => (params.row.mora > 0 ? "Si" : "No"),
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      renderCell: (params) => formatter.format(params.row.total),
      flex: 1,
    },
    {
      field: "instalacion",
      headerName: "Instalación",
      renderCell: (params) =>
        params.row.id === 1
          ? formatter.format(params.row.servicio.precio_instalacion)
          : "N/A",
      flex: 1,
    },
    {
      field: "subTotal",
      headerName: "Subtotal",
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
      field: "fechaPagoCliente",
      headerName: "Fecha Pago",
      renderCell: (params) =>
        moment(params.row.fechaPagoCliente).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "fechaCorte",
      headerName: "Fecha Corte",
      renderCell: (params) =>
        moment(params.row.fechaCorte).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "fechaLimitePago",
      headerName: "Fecha limite pago",
      renderCell: (params) =>
        moment(params.row.fechaLimitePago).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "usuario",
      headerName: "Cliente",
      flex: 1,
      hide: true,
    },
    {
      field: "cedulaCliente",
      headerName: "Cedula",
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
        <h1 style={{ marginBottom: 15 }}>Reporte de ventas por servicios</h1>
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

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={servicio}
          getOptionLabel={(option) => `${option.codigo} - ${option.nombre} `}
          onChange={(e, params) => {
            handleChange({
              ...e,
              target: {
                ...e.target,
                name: "servicio",
                value: !!params ? params : null,
              },
            });
          }}
          sx={{ mt: 1, width: "34%" }}
          size="small"
          renderInput={(params) => (
            <TextField
              size="small"
              name="servicio"
              label="Seleccione servicio"
              error={touched.servicio && Boolean(errors.servicio)}
              helperText={touched.servicio && errors.servicio}
              {...params}
            />
          )}
        />
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
            rows={dataParaFiltro()}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e._id}
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
