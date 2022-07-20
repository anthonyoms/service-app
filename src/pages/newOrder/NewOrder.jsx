import { Autocomplete, Fab, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Save, DeleteOutline } from "@material-ui/icons";
import "./newOrder.css";
import { useCallback, useEffect, useState } from "react";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation, infoMsg } from "../../utils/helpers/messages";
import Loading from "../../components/ui/Loading";
import moment from "moment";
import { useRef } from "react";
import useForm from "../../hooks/useForm";

export default function NewOrder() {
  const style = {
    margin: 0,
    top: "auto",
    right: "5em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  const [{ cantidadRequerida }, handleInputChange, reset] = useForm({
    cantidadRequerida: 0,
  });
  const [
    {
      loading,
      suppliersData,
      productsData,
      supplierSelected,
      currentProductSelected,
      key,
    },
    setDataState,
  ] = useState({
    loading: true,
    key: true,
    suppliersData: [],
    productsData: [],
    supplierSelected: null,
    currentProductSelected: null,
    error: false,
  });

  const [detalleOrden, setDetalleOrden] = useState([]);

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
    setDataState((data) => {
      const total = data?.supplierSelected?.total || 0;
      return {
        ...data,
        supplierSelected: { ...params, total },
      };
    });
  };
  const handleProducts = async (e, params) => {
    setDataState((data) => {
      return { ...data, currentProductSelected: params };
    });
    reset();
  };
  const handleDelete = useCallback(
    ({ uid, totalPrice }) => {
      setDataState((data) => {
        totalRefence.current -= totalPrice;
        return {
          ...data,

          supplierSelected: {
            ...supplierSelected,
            total: totalRefence.current,
          },
        };
      });
      setTimeout(() => {
        setDetalleOrden((detalleOrden) =>
          detalleOrden.filter((product) => product.uid !== uid)
        );
      });
    },
    [supplierSelected]
  );

  const saveOrder = async () => {
    if (!supplierSelected?.cedula_rnc) {
      infoMsg(`El campo "Suplidor" es requerido.`);
    } else {
      //save order
    }
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!!currentProductSelected && cantidadRequerida > 0) {
      const isExistingProduct = detalleOrden.find(
        (product) => product.uid === currentProductSelected.uid
      );
      if (!isExistingProduct) {
        setDetalleOrden([
          ...detalleOrden,
          {
            ...currentProductSelected,
            totalPrice:
              currentProductSelected?.precio_compra * cantidadRequerida,
            cantidadRequerida,
          },
        ]);
        setDataState((data) => {
          totalRefence.current +=
            currentProductSelected?.precio_compra * cantidadRequerida;
          return {
            ...data,
            currentProductSelected: null,
            supplierSelected: {
              ...supplierSelected,
              total: totalRefence.current,
            },
            key: !key,
          };
        });
        reset();
      } else {
        infoMsg(
          `El producto ${isExistingProduct.nombre} ya existe en la orden.`
        );
      }
    } else {
      infoMsg(
        `Los campos: "Nombre del produto" y "Cantidad requerida" deben ser completados.`
      );
    }
  };
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Producto",
      flex: 1,
    },
    { field: "cantidadRequerida", headerName: "Cantidad", flex: 1 },
    {
      field: "precio_compra",
      headerName: "Precio unitario",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Precio total",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <DeleteOutline
            onClick={() => handleDelete(params.row)}
            className="orderListDelete"
          />
        );
      },
    },
  ];
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Fab onClick={saveOrder} style={style} color="success" aria-label="add">
        <Save />
      </Fab>

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
              inputProps={{ readOnly: true }}
              value={supplierSelected?.total || 0}
            />
          </div>
          <div className="newOrderTopRight">
            <Autocomplete
              disablePortal
              key={key}
              id="combo-box-demo-2"
              options={productsData}
              getOptionLabel={(option) => option.nombre}
              onChange={(e, params) => handleProducts(e, params)}
              size="small"
              sx={{ marginBottom: "6px" }}
              renderInput={(params) => (
                <TextField {...params} label="Nombre del producto*" />
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
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.cantidad || 0}
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
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.precio_compra || 0}
                />
              </div>
              <div className="newOrderItem">
                <TextField
                  id="cantidadRequerida"
                  label="Cantidad requerida*"
                  name="cantidadRequerida"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  value={cantidadRequerida}
                  onChange={handleInputChange}
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
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.precio_venta || 0}
                />
              </div>
              <div className="newOrderItem">
                <TextField
                  id="tax"
                  label="Impuesto 16%"
                  name="tax"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  inputProps={{ readOnly: true }}
                  value={
                    ((currentProductSelected?.precio_compra *
                      cantidadRequerida) /
                      100) *
                      16 || 0
                  }
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
                  inputProps={{ readOnly: true }}
                  value={
                    currentProductSelected?.precio_compra * cantidadRequerida ||
                    0
                  }
                />
              </div>
            </div>
            <button onClick={handleAddProduct} className="newOrderButton">
              Agregar Producto
            </button>
          </div>
        </div>
        <div className="newOrderBottom">
          <DataGrid
            rows={detalleOrden}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            getRowId={(e) => e.uid}
          />
        </div>
      </div>
    </>
  );
}
