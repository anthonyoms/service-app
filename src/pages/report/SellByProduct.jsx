import { Download, PlayCircle } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

export const SellByProduct = () => {
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    { field: "number", headerName: "ID", flex: 1 },
    {
      field: "tecnico",
      headerName: "Tecnico Asignado",
      flex: 1,
    },
    {
      field: "vencida",
      headerName: "Vencida",
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
    },
    {
      field: "tipoRequest",
      headerName: "Tipo Solicitud",
      flex: 1,
    },
    {
      field: "done",
      headerName: "Completada",
      flex: 1,
    },
  ];
  return (
    <div style={{ flex: 4 }}>
      <h1 style={{ marginBottom: 15 }}>Reporte de ventas por productos</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Fecha Desde"
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField autoComplete="off" {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Fecha Hasta"
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField autoComplete="off" {...params} />}
        />
      </LocalizationProvider>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[]}
        getOptionLabel={(option) => `${option.nombre} - ${option.codigoBarras}`}
        sx={{ mt: 1, width: "34%" }}
        size="small"
        renderInput={(params) => (
          <TextField size="small" {...params} label="Seleccione Producto*" />
        )}
      />
      <Button
        style={{ marginLeft: 10 }}
        variant="text"
        startIcon={<PlayCircle />}
      >
        Generar Reporte
      </Button>
      <div style={{ height: "60%", marginTop: "10px" }}>
        <DataGrid
          rows={[]}
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
    </div>
  );
};
