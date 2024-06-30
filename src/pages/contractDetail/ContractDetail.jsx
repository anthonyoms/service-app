import React, { useEffect, useState } from "react";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import "../product/product.css";
import "../productList/productList.css";
import { Link } from "react-router-dom";
import { formatter } from "../../utils/constants/formatNumber";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import moment from "moment";

export const ContractDetail = () => {
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

  const handleDelete = async () => {};

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

    generatedInvoice = generatedInvoice.map((data) => {
      return {
        ...data,
        total: formatter.format(data.total),
        fechaEmision: moment.utc(data.fechaEmision).format("DD/MM/YYYY"),
        fechaCorte: moment.utc(data.fechaCorte).format("DD/MM/YYYY"),
        fechaLimitePago: moment.utc(data.fechaLimitePago).format("DD/MM/YYYY"),
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
            <Link
              to={`/serviceinvoice/${contract?.uid}/${params.row._id}`}
                target="_blank"
            >
              <button className="productListView">Ver Factura</button>
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
    <>
      <MyBackdrop loading={loading} />
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Detalle Contrato</h1>
          <Link to="/addservice">
            <button className="productAddButton">Crear</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <span className="productName">{contract?.nombre}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">Codigo:&nbsp;</span>
                <span className="productInfoValue">{contract?.id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Servicio:&nbsp;</span>
                <span className="productInfoValue">
                  {contract?.servicio.nombre}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Periodo Facturación:&nbsp;
                </span>
                <span className="productInfoValue">
                  {contract?.servicio.periodoFacturacion}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Facturación:&nbsp;</span>
                <span className="productInfoValue">
                  {formatter.format(contract?.servicio.precio_venta)}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">
                  Precio Instalación:&nbsp;
                </span>
                <span className="productInfoValue">
                  {formatter.format(contract?.servicio.precio_instalacion)}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Cedula Cliente:&nbsp;</span>
                <span className="productInfoValue">
                  {contract?.cliente.cedula}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Nombre Cliente:&nbsp;</span>
                <span className="productInfoValue">
                  {contract?.cliente.nombre}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Provincia:&nbsp;</span>
                <span className="productInfoValue">{contract?.provincia}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Municipio:&nbsp;</span>
                <span className="productInfoValue">{contract?.municipio}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Sector:&nbsp;</span>
                <span className="productInfoValue">{contract?.sector}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Calle:&nbsp;</span>
                <span className="productInfoValue">{contract?.calle}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Referencia:&nbsp;</span>
                <span className="productInfoValue">{contract?.referencia}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Estado:&nbsp;</span>
                <span className="productInfoValue">
                  {" "}
                  {contract?.estado ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>
          <div className="productTopLeft"></div>
        </div>
        <div className="productTitleContainer">
          <h2 className="productTitle">Facturas Generadas</h2>
        </div>
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
            density="comfortable"
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
