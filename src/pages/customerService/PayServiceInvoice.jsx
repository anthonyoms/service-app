import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { formatter } from "../../utils/constants/formatNumber";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { Link } from "react-router-dom";
import { CreditCard } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { dataValidation } from "../../utils/helpers/messages";
import { getServiceApp } from "../../services/serviceApp";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { endpoints } from "../../utils/constants/endpoints";
import { Tooltip } from "@mui/material";

export const PayServiceInvoice = () => {
  const navigate = useNavigate();
  const [{ contract, loading }, setContract] = useState({
    contract: null,
    loading: true,
  });

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    const id = getIdUrl();

    const data = await getServiceApp(`${endpoints.contratoDeServicio}/${id}`);

    if (!data.ok) {
      dataValidation(data);
      setContract({ loading: false });
      return;
    }
    setContract({ contract: data.contrato, loading: false });
  };

  const handlePay = async (param) => {
    navigate(param);
  };

  const handleChangeColorRow = (pago, fechaLimiteDePago) => {
    if (pago === "SI") {
      return "rowPagoSuccess";
    }
    const today = moment().format("DD/MM/YYYY");
    // Comparar las fechas
    if (
      moment(today, "DD/MM/YYYY").isAfter(
        moment(fechaLimiteDePago, "DD/MM/YYYY")
      ) &&
      pago === "NO"
    ) {
      return "rowPagoNo";
    }
  };

  const getGeneratedInvoice = () => {
    const hoy = new Date();
    let generatedInvoice =
      contract?.facturas.filter(
        (comprobante) => new Date(comprobante.fechaCorte) < hoy
      ) || [];

    if (!!contract?.fechaCancelacion) {
      generatedInvoice = generatedInvoice.filter(
        (data) =>
          new Date(data.fechaCorte) < new Date(contract.fechaCancelacion)
      );
    }

    generatedInvoice = generatedInvoice.map((data) => {
      return {
        ...data,
        total: formatter.format(data.total),
        fechaEmision: moment.utc(data.fechaEmision).format("DD/MM/YYYY"),
        fechaCorte: moment.utc(data.fechaCorte).format("DD/MM/YYYY"),
        fechaLimitePago: moment.utc(data.fechaLimitePago).format("DD/MM/YYYY"),
        fechaPagoCliente: !!data.fechaPagoCliente
          ? moment.utc(data.fechaPagoCliente).format("DD/MM/YYYY")
          : null,
        pago: data.pago ? "SI" : "NO",
      };
    });

    return generatedInvoice;
  };

  const columns = [
    { field: "uid", headerName: "ID", hide: true, flex: 1 },
    { field: "id", headerName: "ID", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    {
      field: "fechaEmision",
      headerName: "Fecha Emisión",
      flex: 1,
      type: "date",
    },
    {
      field: "fechaPagoCliente",
      headerName: "Fecha Pago",
      flex: 1,
      type: "date",
    },
    { field: "fechaCorte", headerName: "Fecha Corte", flex: 1, type: "date" },
    {
      field: "fechaLimitePago",
      headerName: "Pagar antes de",
      type: "date",
      flex: 1,
    },
    { field: "numeroComprobante", headerName: "Comprobante", flex: 1 },
    {
      field: "pago",
      headerName: "Pago",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.pago === "NO" && (
              <Tooltip title="Pagar esta Factura">
                <CreditCard
                  className=""
                  onClick={() =>
                    handlePay(
                      `/paymentservice/${contract?.uid}/${params.row._id}`
                    )
                  }
                />
              </Tooltip>
            )}
            <Link
              to={`/serviceinvoice/${contract?.uid}/${params.row._id}`}
              target="_blank"
            >
              <button className="productListView">Ver Factura</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="product">
        <div className="dataGrid">
          <DataGrid
            rows={getGeneratedInvoice()}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(e) => e.id}
            loading={loading}
            filterMode="client"
            density="compact"
            getRowClassName={(params) =>
              handleChangeColorRow(params.row.pago, params.row.fechaLimitePago)
            }
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </>
  );
};
