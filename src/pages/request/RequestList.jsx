import "../../components/featuredInfo/featuredInfo.css";
import React, { useCallback } from "react";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import moment from "moment";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

export const RequestList = () => {
  const { rol, correo } = useSelector((state) => state.auth);

  const [total, setTotal] = useState(0);
  const [pendiente, setPendiente] = useState(0);
  const [completadas, setCompletadas] = useState(0);
  const [vencidas, setVencidas] = useState(0);
  const [solicitudes, setSolicitudes] = useState([]);

  const loadPendingRequest = useCallback(async () => {
    const dataResponse = await getServiceApp(`${endpoints.request}`);
    let validData = dataValidation(dataResponse, false);
    if (rol !== "ADMIN_ROLE") {
      validData.request = validData.request.filter((r) => r.tecnico === correo);
    }
    if (validData.ok) {
      setTotal(validData.total);
      setPendiente(validData.pendientes);
      setCompletadas(validData.completadas);
      setVencidas(validData.vencidas);
      setSolicitudes(validData.request);
    }
  }, [rol, correo]);

  useEffect(() => {
    loadPendingRequest();
  }, [loadPendingRequest]);

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
    {
      field: "fechaEmision",
      headerName: "Fecha Emisión",
      flex: 1,
      type: "date",
      renderCell: (params) =>
        moment.utc(params.row.fechaEmision).format("DD/MM/YYYY"),
    },
    {
      field: "completedWork",
      headerName: "Fecha Completada",
      flex: 1,
      type: "date",
      renderCell: (params) =>
        moment.utc(params.row.completedWork).format("DD/MM/YYYY"),
    },
    {
      field: "fechaVencimiento",
      headerName: "Fecha Vencimiento",
      flex: 1,
      type: "date",
      renderCell: (params) =>
        moment.utc(params.row.fechaEmision).add(5, "days").format("DD/MM/YYYY"),
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.done === "No" ? (
              <Link to={"/request-manager/" + params.row.uid}>
                <button className="categoryListEdit">Atender</button>
              </Link>
            ) : (
              <Link to={"/request-manager/" + params.row.uid}>
                <button className="categoryListEdit">Ver</button>
              </Link>
            )}
          </>
        );
      },
    },
  ];

  const dataParaFiltro = () => {
    return solicitudes.map((data) => {
      return {
        ...data,
        fechaEmision: moment.utc(data.fechaEmision),
        done: data?.done ? "Si" : "No",
        vencida: moment
          .utc(data.fechaEmision)
          .isAfter(moment().subtract(5, "days"))
          ? "No"
          : "Si",
      };
    });
  };

  return (
    <div style={{ flex: 4 }}>
      {rol === "ADMIN_ROLE" && (
        <div className="featured">
          <div className="featuredItem">
            <span className="featuredTitle">Total de Solicitudes</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{total}</span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Vencidas</span>
            <div className="featuredMoneyContainer">
              <span style={{ color: "red" }} className="featuredMoney">
                {vencidas}
              </span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Pendientes</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{pendiente}</span>
            </div>
          </div>
          <div className="featuredItem">
            <span className="featuredTitle">Completadas</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{completadas}</span>
            </div>
          </div>
        </div>
      )}
      <h1 style={{ marginTop: "50px" }}>Lista de solicitudes</h1>
      <div style={{ height: "60%", marginTop: "10px" }}>
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
    </div>
  );
};
