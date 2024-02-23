import React, { useEffect, useState } from "react";
import "./sellScreen.css";
import { Navigate } from "react-router-dom";
import { Box, Fab, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation, infoMsg } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { CustomerBoxTopLeft } from "./components/CustomerBoxTopLeft";
import { CustomerBoxTopRight } from "./components/CustomerBoxTopRight";
import { InvoiceDatagrid } from "./components/InvoiceDatagrid";
import CustomerDialog from "./components/CustomerDialog";
import { MonetizationOn } from "@material-ui/icons";
import moment from "moment";

export const SellScreen = () => {
  const configuration = useSelector((state) => state.info);
  const [open, setOpen] = useState(false);
  const style = {
    margin: 0,
    top: "auto",
    right: "5em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };

  const initialState = {
    loading: true,
    subTotal: 0,
    sequenceDataResponse: 0,
    secuencialLoading: true,
    devolucionLoading: false,
    devolucionLoadingError: false,
    codigoDevolucion: "",
    total: 0,
    itbis: 0,
    discount: 0,
    totalAfterDiscount: 0,
    lastInvoiceNumber: 0,
    customersData: [],
    productsData: [],
    invoiceCustomer: [],
    tipoComprobante: "B01",
    tipoPago: "Tarjeta",
    invoiceProductsData: [],
    customerKey: true,
    prodctKey: true,
    invoiceProduct: {
      cantidadRequerida: 0,
      impuestos: 0,
      subTotal: 0,
      total: 0,
    },
  };

  const [
    {
      loading,
      secuencialLoading,
      devolucionLoading,
      devolucionLoadingError,
      codigoDevolucion,
      customersData,
      invoiceCustomer,
      productsData,
      invoiceProduct,
      invoiceProductsData,
      customerKey,
      prodctKey,
      subTotal,
      sequenceDataResponse,
      total,
      itbis,
      lastInvoiceNumber,
      discount,
      totalAfterDiscount,
      tipoPago,
    },
    setDataState,
  ] = useState(initialState);

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSendInvoice = () => {
    if (!invoiceCustomer.cedula) {
      return infoMsg(
        `Antes de emitir la factura, recuerda seleccionar un cliente. 
        Este paso es esencial para garantizar una transacción precisa. 
        ¡Gracias por tu atención a este detalle!`
      );
    }
    if (invoiceProductsData.length <= 0) {
      return infoMsg(
        `Antes de proceder con la facturación, por favor, 
        asegúrate de agregar al menos un producto a la lista. 
        Tu atención a este paso es fundamental para completar 
        la transacción con éxito!`
      );
    }
    setOpen(true);
  };

  const setFormatProduct = (detalle = []) => {
    return detalle.map((producto) => {
      return {
        producto: producto.uid,
        itbisProducto: Number(producto.impuestos),
        totalProducto: producto.total,
        subTotalProducto: producto.subTotal,
        cantidadRequerida: producto.cantidadRequerida,
      };
    });
  };

  const sendInvoice = async (sequence) => {
    setOpen(false);
    setDataState((data) => {
      return { ...data, loading: true };
    });
    const payload = {
      id: lastInvoiceNumber,
      cliente: invoiceCustomer.uid,
      fechaEmision: moment().toDate(),
      fechaVencimiento: moment().add(1, "M").toDate(),
      itbis,
      total,
      subTotal,
      tipoComprobante: sequence.substring(0, 3),
      numeroComprobante: sequence,
      tipoPago,
      productos: setFormatProduct(invoiceProductsData),
      discount,
      totalAfterdiscount: totalAfterDiscount,
    };
    const isSaveInvoice = await postServiceApp(payload, endpoints.facturacion);

    if (!isSaveInvoice.ok) {
      setDataState((data) => {
        return { ...data, loading: false };
      });
      return dataValidation(isSaveInvoice, false);
    }
    const { factura } = dataValidation(isSaveInvoice);
    setDataState((data) => ({
      ...initialState,
      customerKey: !data.customerKey,
      prodctKey: !data.prodctKey,
      loading: false,
    }));
    loadCustomers();

    window.open("/sellinvoice/" + factura.uid, "_blank");
    return <Navigate to={"/"} replace={true} />;
  };

  const loadCustomers = async () => {
    const [
      customersDataResponse,
      productsDataResponse,
      invocieDataResponse,
      sequenceDataResponse,
    ] = await Promise.all([
      getServiceApp(endpoints.users),
      getServiceApp(endpoints.products + `?estado=true`),
      getServiceApp(endpoints.facturacion),
      getServiceApp(endpoints.secuencial + `?tipoComprobante=B01`),
    ]);
    const validDataCustomers = dataValidation(customersDataResponse, false);
    const validDataProduct = dataValidation(productsDataResponse, false);
    const validDataSequence = dataValidation(sequenceDataResponse, false);
    const validDataInvoice = dataValidation(invocieDataResponse, false);
    if (
      validDataCustomers.ok &&
      validDataProduct.ok &&
      validDataInvoice.ok &&
      validDataSequence.ok
    ) {
      setDataState((data) => ({
        ...data,
        customersData: validDataCustomers.usuarios.filter(
          (usuarios) => usuarios.rol === "CUSTOMER_ROLE"
        ),
        productsData: validDataProduct.productos,
        lastInvoiceNumber: invocieDataResponse?.total + 1,
        sequenceDataResponse: `B010000000${
          sequenceDataResponse.secuencial.length + 1
        }`,
        secuencialLoading: false,
        loading: false,
      }));
    }
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="sellScreen">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://res.cloudinary.com/dg9hg5urc/image/upload/v1660843841/logotipo-orbit-01-e1653580643499_vvd4sa.png"
            alt="Company logo"
            style={{ width: "100%", maxWidth: "150px" }}
          />
          <h5>{configuration.cedula_rnc}</h5>
          <h5>{configuration.direccion}</h5>
          <h5>
            {configuration.correo} / {configuration.telefono}
          </h5>
        </Box>
        <div className="sellScreenTitleContainer">
          <h2 className="sellScreenTitle">
            Factura de compra No. {lastInvoiceNumber}
          </h2>
        </div>
        <div className="sellScreenTop">
          <CustomerBoxTopLeft
            setDataState={setDataState}
            customersData={customersData}
            invoiceCustomer={invoiceCustomer}
            prodctKey={prodctKey}
            subTotal={subTotal}
            total={total}
            itbis={itbis}
          />
          <CustomerBoxTopRight
            productData={productsData}
            invoiceProduct={invoiceProduct}
            setDataState={setDataState}
            customerKey={customerKey}
            invoiceProductsData={invoiceProductsData}
          />
        </div>
        <InvoiceDatagrid
          setDataState={setDataState}
          invoiceProductsData={invoiceProductsData}
        />
      </div>
      <Tooltip title="Facturar">
        <Fab
          style={style}
          onClick={handleSendInvoice}
          color="success"
          aria-label="add"
        >
          <MonetizationOn />
        </Fab>
      </Tooltip>
      <CustomerDialog
        open={open}
        setOpen={setOpen}
        total={total}
        setDataState={setDataState}
        discount={discount}
        totalAfterDiscount={totalAfterDiscount}
        sendInvoice={sendInvoice}
        sequenceDataResponse={sequenceDataResponse}
        codigoDevolucion={codigoDevolucion}
        secuencialLoading={secuencialLoading}
        devolucionLoading={devolucionLoading}
        devolucionLoadingError={devolucionLoadingError}
      />
    </>
  );
};
