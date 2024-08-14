import { PlayCircle } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { reporteVentasProdusctos } from "../../schemas/yupShemas";
import moment from "moment";
import {
  downloadFileServiceApp,
  getServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { formatter } from "../../utils/constants/formatNumber";
import { axios } from "axios/dist/axios";

export const SellByProduct = () => {
  const [products, setProducts] = useState([]);
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
      product: null,
    },
    validationSchema: reporteVentasProdusctos,
    onSubmit: async (values) => {
      setLoading(true);
      const dataResponse = await getServiceApp(
        `${endpoints.report}/ventas-productos/${
          values.product.uid
        }?fechaDesde=${moment(values.fechaDesde).format(
          "YYYY-MM-DD"
        )}?fechaHasta=${moment(values.fechaHasta).format("YYYY-MM-DD")}`
      );
      const validData = dataValidation(dataResponse, false);
      if (validData.ok) {
        console.log(validData);
        setReportData(validData.facturas);
      }

      await downloadFileServiceApp(
        `${endpoints.report}/ventas-productos-download/${
          values.product.uid
        }?fechaDesde=${moment(values.fechaDesde).format(
          "YYYY-MM-DD"
        )}?fechaHasta=${moment(values.fechaHasta).format("YYYY-MM-DD")}`,
        `reporte_ventas_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
      );

      setLoading(false);
    },
  });

  const loadProduct = useCallback(async () => {
    setLoading(true);
    const dataResponse = await getServiceApp(endpoints.products);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setProducts(validData.productos);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "id", headerName: "ID factura", flex: 1 },
    {
      field: "nombre",
      headerName: "Producto",
      flex: 1,
    },
    { field: "cantidad", headerName: "Cantidad vendida", flex: 1 },
    {
      field: "precioUnitario",
      headerName: "Precio unitario",
      renderCell: (params) => formatter.format(params.row.precioUnitario),
      flex: 1,
    },
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
      field: "fechaAnulada",
      headerName: "Fecha Anulada",
      renderCell: (params) => {
        if (params.row.fechaAnulada === "N/A") {
          return params.row.fechaAnulada;
        }
        return moment(params.row.fechaAnulada).format("DD/MM/YYYY");
      },
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
      headerName: "Usuario Venta",
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

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={products}
          getOptionLabel={(option) => `${option.codigo} - ${option.nombre} `}
          onChange={(e, params) => {
            handleChange({
              ...e,
              target: {
                ...e.target,
                name: "product",
                value: !!params ? params : null,
              },
            });
          }}
          sx={{ mt: 1, width: "34%" }}
          size="small"
          renderInput={(params) => (
            <TextField
              size="small"
              name="product"
              label="Seleccione Producto"
              error={touched.product && Boolean(errors.product)}
              helperText={touched.product && errors.product}
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
        <div style={{ height: "60%", marginTop: "10px" }}>
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
