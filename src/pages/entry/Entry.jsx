import { Autocomplete, Fab, TextField, Tooltip } from "@mui/material";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { Save, DeleteOutline, Refresh } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation, infoMsg } from "../../utils/helpers/messages";
import moment from "moment";
import { useRef } from "react";
import useForm from "../../hooks/useForm";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { useSelector } from "react-redux";
import "../newOrder/newOrder.css";
import { textFieldValidation } from "../../utils/helpers/textFieldValidation";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";

export default function Entry() {
  const { itbis, itbisPercentage } = useSelector((state) => state.info);

  const initialState = {
    loading: true,
    key: true,
    supplierKey: true,
    suppliersData: [],
    productsData: [],
    supplierSelected: null,
    ordenes: null,
    currentProductSelected: null,
    error: false,
  };
  const style = {
    margin: 0,
    top: "auto",
    right: "5em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  const styleFabProducts = {
    margin: 0,
    top: "auto",
    right: "10em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  const [{ cantidadRequerida, ordenCompra }, handleInputChange, reset] =
    useForm({
      cantidadRequerida: 0,
      ordenCompra: "",
    });
  const [
    {
      loading,
      suppliersData,
      productsData,
      supplierSelected,
      currentProductSelected,
      ordenes,
      key,
      supplierKey,
    },
    setDataState,
  ] = useState(initialState);

  const [detalleOrden, setDetalleOrden] = useState([]);

  let totalRefence = useRef(0);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const [ordenesDataResponse, suppliersDataResponse, productsDataResponse] =
      await Promise.all([
        getServiceApp(endpoints.entrada),
        getServiceApp(endpoints.suppliers),
        getServiceApp(endpoints.products + `?estado=true`),
      ]);

    const validDataSupplier = dataValidation(suppliersDataResponse, false);
    const validDataProduct = dataValidation(productsDataResponse, false);
    const validDataOrdenes = dataValidation(ordenesDataResponse, false);
    if (validDataSupplier.ok && validDataProduct.ok) {
      setDataState({
        loading: false,
        suppliersData: validDataSupplier.suplidor,
        productsData: validDataProduct.productos,
        ordenes: validDataOrdenes,
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
    resetCantidadRequerida();
  };
  const resetCantidadRequerida = () => {
    handleInputChange({ target: { name: "cantidadRequerida", value: 0 } });
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

  const setProductUid = (detalle = []) => {
    return detalle.map((producto) => {
      return { ...producto, producto: producto.uid };
    });
  };

  const saveOrder = async () => {
    if (!detalleOrden.length) return infoMsg(`Ningún producto agregado.`);
    if (!supplierSelected?.cedula_rnc) {
      return infoMsg(`El campo "Suplidor" es requerido.`);
    }

    setDataState((data) => {
      return { ...data, loading: true };
    });

    //save order
    const payload = {
      id: ordenes.total + 1,
      suplidor: supplierSelected.uid,
      fechaEmision: moment(),
      fechaVencimiento: moment().add(1, "M"),
      totalTax: supplierSelected?.total * itbisPercentage,
      subTotal: supplierSelected?.total,
      productos: setProductUid(detalleOrden),
      total:
        supplierSelected?.total + supplierSelected?.total * itbisPercentage,
    };

    console.log(payload);

    const isSaveOrder = await postServiceApp(payload, endpoints.entrada);

    if (!isSaveOrder.ok) {
      setDataState((data) => {
        return { ...data, loading: false };
      });
      dataValidation(isSaveOrder, false);
      return;
    }

    dataValidation(isSaveOrder);
    setDataState({ ...initialState, loading: false });
    totalRefence.current = 0;
    setDetalleOrden([]);
    loadSuppliers();
    reset();
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
            total:
              currentProductSelected?.precio_compra *
                cantidadRequerida *
                itbisPercentage +
              currentProductSelected?.precio_compra * cantidadRequerida,
            totalTax:
              currentProductSelected?.precio_compra *
              cantidadRequerida *
              itbisPercentage,
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

        resetCantidadRequerida();
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

  const validation = (e, regex) => {
    const validEntry = textFieldValidation(e, regex);
    if (!validEntry) {
      return;
    }
    handleInputChange(validEntry);
  };

  const getOrdenCompraHead = async () => {
    const dataResponse = await getServiceApp(
      `${endpoints.ordenes}/${ordenCompra}`
    );
    const { orden } = dataValidation(dataResponse, false);
    return orden?.uid;
  };

  const handleLoadProductsFromOrder = async () => {
    if (!ordenCompra) {
      return Swal.fire(
        "Información",
        "Para cargar los productos el número de orden de compra es obligatorio.",
        "info"
      );
    }
    setDataState((prevState) => ({ ...prevState, loading: true }));
    const orderId = await getOrdenCompraHead();
    if (!orderId) {
      setDataState((prevState) => ({ ...prevState, loading: false }));
      return;
    }
    const dataResponse = await getServiceApp(
      `${endpoints.detalleOrdenes}/${orderId}`
    );
    const { ordenDetalles } = dataValidation(dataResponse, false);
    console.log(ordenDetalles);
    setDataState((prevState) => ({ ...prevState, loading: false }));
    totalRefence.current = ordenDetalles.ordenCompra.subTotal;
    setDetalleOrden(
      ordenDetalles.productos.map(({ producto, ...data }) => {
        setDataState(({ supplierSelected, ...prevState }) => ({
          ...prevState,
          supplierSelected: {
            ...supplierSelected,
            total: totalRefence.current,
          },
        }));
        return { ...producto, ...data, uid: producto._id };
      })
    );
  };
  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Producto",
      flex: 1,
    },
    {
      field: "cantidadRequerida",
      headerName: "Cantidad",
      flex: 1,
      type: "number",
    },
    {
      field: "precio_compra",
      headerName: "Precio unitario",
      flex: 1,
      type: "number",
    },
    {
      field: "totalPrice",
      headerName: "Precio total",
      flex: 1,
      type: "number",
    },
    {
      field: "totalTax",
      headerName: "Impuesto",
      flex: 1,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      type: "number",
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

  return (
    <>
      <MyBackdrop loading={loading} />
      <Tooltip title="Guardar.">
        <Fab onClick={saveOrder} style={style} color="success" aria-label="add">
          <Save />
        </Fab>
      </Tooltip>
      <Tooltip title="Cargar productos desde orden de compra.">
        <Fab
          onClick={handleLoadProductsFromOrder}
          style={styleFabProducts}
          color="primary"
          aria-label="add"
        >
          <Refresh />
        </Fab>
      </Tooltip>

      <div className="newOrder">
        <div className="newOrderTitleContainer">
          <h1 className="newOrderTitle">
            Entrada de inventario No. #{ordenes?.total + 1 || ""}
          </h1>
        </div>
        <div className="newOrderTop">
          <div className="newOrderTopLeft">
            <Autocomplete
              disablePortal
              key={supplierKey}
              id="combo-box-demo"
              options={suppliersData}
              getOptionLabel={(option) =>
                `${option.nombre} -${option.cedula_rnc}`
              }
              onChange={(e, params) => handleSupplier(e, params)}
              sx={{ marginLeft: "8px", marginBottom: "6px", width: "100%" }}
              size="small"
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  label="Suplidor*"
                  variant="standard"
                />
              )}
            />
            <TextField
              id="ordenCompra"
              label="Numero orden de compra"
              name="ordenCompra"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ maxLength: "10" }}
              value={ordenCompra}
              onBlur={getOrdenCompraHead}
              onChange={(e) => validation(e, /^[0-9\b]+$/)}
            />
            <TextField
              id="vendedor"
              label="Vendedor"
              name="vendedor"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              value={supplierSelected?.vendedor || ""}
            />
            <TextField
              id="cedulaRnc"
              label="Cedula/Rnc"
              name="cedulaRnc"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              value={supplierSelected?.cedula_rnc || ""}
            />
            <TextField
              id="contacto"
              label="Contacto"
              name="contacto"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              value={supplierSelected?.contacto || ""}
            />
            <TextField
              id="telefono"
              label="Teléfono"
              name="telefono"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              value={supplierSelected?.telefono || ""}
            />
            <TextField
              id="fechaEmision"
              label="Fecha de emisión"
              name="fechaEmision"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              defaultValue={moment().format("DD/MM/YYYY")}
            />
            <TextField
              id="vence"
              label="Vence"
              name="vence"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              inputProps={{ readOnly: true }}
              defaultValue={moment().add(1, "M").format("DD/MM/YYYY")}
            />
            <NumericFormat
              customInput={TextField}
              id="totalTax"
              label={`Total impuestos ${itbis}%`}
              name="totalTax"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              inputProps={{ readOnly: true }}
              value={supplierSelected?.total * itbisPercentage || 0}
            />
            <NumericFormat
              customInput={TextField}
              id="subTotal"
              label="Sub-total orden de compra"
              name="subTotal"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              inputProps={{ readOnly: true }}
              value={supplierSelected?.total || 0}
            />
            <NumericFormat
              customInput={TextField}
              id="total"
              label="Total orden de compra"
              name="total"
              variant="standard"
              autoComplete="off"
              sx={{ m: 1, mr: 6 }}
              size="small"
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              inputProps={{ readOnly: true }}
              value={
                supplierSelected?.total +
                  supplierSelected?.total * itbisPercentage || 0
              }
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
              sx={{ marginLeft: "8px", marginBottom: "6px", width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nombre del producto*"
                  variant="standard"
                />
              )}
            />
            <div className="newOrderForm">
              <div className="newOrderItem">
                <TextField
                  id="cantidadActual"
                  label="Cantidad Actual"
                  name="cantidadActual"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.cantidad || 0}
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="precioCompra"
                  label="Costo unidad"
                  name="precioCompra"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  prefix={"$"}
                  type="text"
                  thousandSeparator={true}
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.precio_compra || 0}
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="cantidadRequerida"
                  label="Cantidad requerida*"
                  name="cantidadRequerida"
                  inputProps={{ maxLength: "5" }}
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  value={cantidadRequerida}
                  onValueChange={({ value }) =>
                    handleInputChange({
                      target: { name: "cantidadRequerida", value },
                    })
                  }
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="precioVenta"
                  label="Precio de venta"
                  name="precioVenta"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  prefix={"$"}
                  type="text"
                  thousandSeparator={true}
                  inputProps={{ readOnly: true }}
                  value={currentProductSelected?.precio_venta || 0}
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="tax"
                  label={`Impuestos ${itbis}%`}
                  name="tax"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  prefix={"$"}
                  type="text"
                  thousandSeparator={true}
                  inputProps={{ readOnly: true }}
                  value={
                    currentProductSelected?.precio_compra *
                      cantidadRequerida *
                      itbisPercentage || 0
                  }
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="totalProducto"
                  label="Sub-total"
                  name="totalProducto"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  prefix={"$"}
                  type="text"
                  thousandSeparator={true}
                  inputProps={{ readOnly: true }}
                  value={
                    currentProductSelected?.precio_compra * cantidadRequerida ||
                    0
                  }
                />
              </div>
              <div className="newOrderItem">
                <NumericFormat
                  customInput={TextField}
                  id="total"
                  label="Total"
                  name="total"
                  variant="standard"
                  autoComplete="off"
                  size="small"
                  sx={{ m: 1, mr: 6 }}
                  prefix={"$"}
                  type="text"
                  thousandSeparator={true}
                  inputProps={{ readOnly: true }}
                  value={
                    currentProductSelected?.precio_compra * cantidadRequerida +
                      currentProductSelected?.precio_compra *
                        cantidadRequerida *
                        itbisPercentage || 0
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
            components={{ Toolbar: GridToolbar }}
            filterMode="client"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </div>
    </>
  );
}
