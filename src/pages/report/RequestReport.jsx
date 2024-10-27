import { PlayCircle } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { reporteSolicitudes } from "../../schemas/yupShemas";
import moment from "moment";
import { useFormik } from "formik";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

export const RequestReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fechaDesde: moment(),
        fechaHasta: moment(),
        statusRequest: "Resuelto",
      },
      validationSchema: reporteSolicitudes,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const dataResponse = await getServiceApp(
            `${endpoints.report}/reporte-solicitudes?fechaDesde=${moment(
              values.fechaDesde
            ).format("YYYY-MM-DD")}&fechaHasta=${moment(
              values.fechaHasta
            ).format("YYYY-MM-DD")}&statusRequest=${values.statusRequest}`
          );
          const validData = dataValidation(dataResponse, false);
          if (validData.ok) {
            console.log(validData);
            setReportData(validData.solicitudes);
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      },
    });

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "number",
      headerName: "Solicitud #",
      flex: 1,
    },
    {
      field: "tipoRequest",
      headerName: "Tipo Solicitud",
      flex: 1,
    },
    {
      field: "fechaEmision",
      headerName: "Fecha Emisión",
      renderCell: (params) =>
        moment(params.row.fechaEmision).format("DD/MM/YYYY"),
      flex: 1,
    },
    {
      field: "completedWork",
      headerName: "Fecha completado",
      renderCell: (params) => {
        return params?.row?.done
          ? moment(params.row.completedWork).format("DD/MM/YYYY")
          : "No completado";
      },
      flex: 1,
    },
    {
      field: "comentarioCierre",
      headerName: "Comentario",
      flex: 1,
    },
    {
      field: "tecnico",
      headerName: "Tecnico",
      flex: 1,
    },
    {
      field: "customer",
      headerName: "Cliente",
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
    },
  ];
  return (
    <>
      <MyBackdrop loading={loading} />
      <form onSubmit={handleSubmit} style={{ flex: 4 }}>
        <h1 style={{ marginBottom: 15 }}>Reporte de solicitudes</h1>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="demo-simple-select-label-estado">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label-estado"
            id="demo-simple-select-estado"
            name="statusRequest"
            label="Estado"
            value={values.statusRequest || ""}
            onChange={handleChange}
          >
            <MenuItem value={"Resuelto"}>Resuelto</MenuItem>
            <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
            <MenuItem value={"Nuevo"}>Nuevo</MenuItem>
            <MenuItem value={"Vencida"}>Vencida</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Fecha Desde"
            inputFormat="dd/MM/yyyy"
            value={values.fechaDesde}
            onChange={(date) => {
              setFieldValue("fechaDesde", date ? date : moment()); // Actualiza el valor de Formik
            }}
            maxDate={
              values.statusRequest === "Vencida"
                ? moment().subtract(5, "days").toDate()
                : null
            }
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
            maxDate={
              values.statusRequest === "Vencida"
                ? moment().subtract(5, "days").toDate()
                : null
            }
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
