import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import "./newOrder.css";
import { useEffect, useState } from "react";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import Loading from "../../components/ui/Loading";
import moment from "moment";
import { useRef } from "react";

export default function NewOrder() {
  const [
    { loading, suppliersData, productsData, supplierSelected },
    setDataState,
  ] = useState({
    loading: true,
    suppliersData: [],
    productsData: [],
    supplierSelected: {},
    currentProductSelected: {},
  });

  let totalRefence = useRef(0);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const [suppliersDataResponse, productsDataResponse] = await Promise.all([
      getServiceApp(endpoints.suppliers),
      getServiceApp(endpoints.products),
    ]);

    const validDataSupplier = dataValidation(suppliersDataResponse, false);
    const validDataProduct = dataValidation(productsDataResponse, false);
    if (validDataSupplier.ok && validDataProduct.ok) {
      setDataState({
        loading: false,
        suppliersData: validDataSupplier.suplidor,
        productsData: validDataProduct.productos,
      });
    }
  };

  const handleSupplier = async (e, params) => {
    e.preventDefault();
    setDataState((data) => {
      return { ...data, supplierSelected: params };
    });
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "product",
      headerName: "Servicio",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="serviceListItem">
            <img className="serviceListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", flex: 1 },
    {
      field: "status",
      headerName: "Estatus",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row.id}>
              <button className="serviceListEdit">Editar</button>
            </Link>
            <DeleteOutline className="serviceListDelete" />
          </>
        );
      },
    },
  ];
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="newOrder">
      <div className="newOrderTitleContainer">
        <h1 className="newOrderTitle">Orden de compra No. #{1}</h1>
        <Link to="/newsupplier">
          <button className="newOrderAddButton">Crear Suplidor</button>
        </Link>
      </div>
      <div className="newOrderTop">
        <div className="newOrderTopLeft">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={suppliersData}
            getOptionLabel={(option) =>
              `${option.nombre} -${option.cedula_rnc}`
            }
            onChange={(e, params) => handleSupplier(e, params)}
            sx={{ marginLeft: "8px", marginBottom: "6px" }}
            size="small"
            renderInput={(params) => (
              <TextField size="small" {...params} label="Suplidor" />
            )}
          />
          <TextField
            id="vendedor"
            label="Vendedor"
            name="vendedor"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            value={supplierSelected?.vendedor || ""}
          />
          <TextField
            id="cedulaRnc"
            label="Cedula/Rnc"
            name="cedulaRnc"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            value={supplierSelected?.cedula_rnc || ""}
          />
          <TextField
            id="contacto"
            label="Contacto"
            name="contacto"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            value={supplierSelected?.contacto || ""}
          />
          <TextField
            id="telefono"
            label="Teléfono"
            name="telefono"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            value={supplierSelected?.telefono || ""}
          />
          <TextField
            id="fechaEmision"
            label="Fecha de emisión"
            name="fechaEmision"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            defaultValue={moment().format("DD/MM/YYYY")}
          />
          <TextField
            id="vence"
            label="Vence"
            name="vence"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            inputProps={{ readOnly: true }}
            defaultValue={moment().add(1, "M").format("DD/MM/YYYY")}
          />
          <TextField
            id="total"
            label="Total orden de compra"
            name="total"
            variant="outlined"
            autoComplete="off"
            sx={{ m: 1 }}
            size="small"
            value={supplierSelected?.total || 0}
          />
        </div>
        <div className="newOrderTopRight">
          <Autocomplete
            disablePortal
            id="combo-box-demo-2"
            options={productsData}
            getOptionLabel={(option) => option.nombre}
            size="small"
            sx={{ marginBottom: "6px" }}
            renderInput={(params) => (
              <TextField {...params} label="Nombre del producto" />
            )}
          />
          <div className="newOrderForm">
            <div className="newOrderItem">
              <TextField
                id="cantidadActual"
                label="Cantidad Actual"
                name="cantidadActual"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="precioCompra"
                label="Costo unidad"
                name="precioCompra"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="cantidadRequerida"
                label="Cantidad requerida"
                name="cantidadRequerida"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="precioVenta"
                label="Precio de venta"
                name="precioVenta"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
            <div className="newOrderItem">
              <TextField
                id="totalProducto"
                label="Total"
                name="totalProducto"
                variant="outlined"
                autoComplete="off"
                size="small"
                inputProps={{ maxLength: "50" }}
              />
            </div>
          </div>
          <button
            onClick={() =>
              setDataState((data) => {
                totalRefence.current++;
                return {
                  ...data,
                  supplierSelected: {
                    ...data.supplierSelected,
                    total: totalRefence.current,
                  },
                };
              })
            }
            className="newOrderButton"
          >
            Agregar Producto
          </button>
        </div>
      </div>
      <div className="newOrderBottom">
        <DataGrid
          rows={[]}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </div>
    </div>
  );
}
