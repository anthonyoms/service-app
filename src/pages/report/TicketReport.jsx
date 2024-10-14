import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { reporteSolicitudes, reporteTicket } from "../../schemas/yupShemas";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PlayCircle } from "@mui/icons-material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";

export const TicketReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fechaDesde: moment(),
        fechaHasta: moment(),
      },
      validationSchema: reporteTicket,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const dataResponse = await getServiceApp(
            `${endpoints.report}/reporte-tickets?fechaDesde=${moment(
              values.fechaDesde
            ).format("YYYY-MM-DD")}&fechaHasta=${moment(
              values.fechaHasta
            ).format("YYYY-MM-DD")}`
          );
          const validData = dataValidation(dataResponse, false);
          if (validData.ok) {
            console.log(validData);
            setReportData(validData.tickets);
          }
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      },
    });
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "number", headerName: "Número", flex: 1 },
    { field: "customer", headerName: "Cedula Cliente", flex: 1 },
    { field: "usuario", headerName: "Tecnico", flex: 1 },
    { field: "tipoTicket", headerName: "Tipo", flex: 1 },
    { field: "handleAtDesk", headerName: "Escritorio", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "start", headerName: "Inicio trabajo", flex: 1 },
    { field: "end", headerName: "Inicio trabajo", flex: 1 },
    {
      field: "minutes",
      headerName: "Duracion",
      flex: 1,
      renderCell: (params) => {
        const format = 'DD/MM/YYYY hh:mm:ss A'; // Define el formato de tu fecha

        const start = moment(params.row.start, format);
        const end = moment(params.row.end, format);
    
        // Verifica que ambas fechas sean válidas
        if (!start.isValid() || !end.isValid()) {
            return 'Fecha inválida'; // Maneja el error como prefieras
        }
    
        // Calcula la diferencia en minutos
        const diferenciaMinutos = end.diff(start, "minutes");
    
        return diferenciaMinutos; // Esto devolverá la diferencia en minutos
      },
    },
    {
      field: "done",
      headerName: "Completado",
      flex: 1,
    },
  ];

  const dataParaFiltro = () => {
    return reportData.map((data) => {
      return {
        ...data,
        start: moment(data.startWork).format("DD/MM/YYYY hh:mm:ss A"),
        end: moment(data.completedWork).format("DD/MM/YYYY hh:mm:ss A"),
        usuario: data.usuario.correo,
        done: data?.done ? "Si" : "No",
      };
    });
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <form onSubmit={handleSubmit} style={{ flex: 4 }}>
        <h1 style={{ marginBottom: 15 }}>Reporte de Tickets</h1>
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
            rows={dataParaFiltro()}
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
