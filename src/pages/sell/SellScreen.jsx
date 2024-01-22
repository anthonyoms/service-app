import React, { useEffect, useState } from "react";
import "./sellScreen.css";
import { Box, Fab, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { CustomerBoxTopLeft } from "./components/CustomerBoxTopLeft";
import { CustomerBoxTopRight } from "./components/CustomerBoxTopRight";
import { InvoiceDatagrid } from "./components/InvoiceDatagrid";
import CustomerDialog from "./components/CustomerDialog";
import { MonetizationOn } from "@material-ui/icons";

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

  const handleSendInvoice = () => {
    setOpen(true);
  };
  const initialState = {
    loading: true,
    subTotal: 0,
    total: 0,
    customersData: [],
    productsData: [],
    invoiceCustomer: [],
    invoiceProductsData: [],
    customerKey: true,
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
      customersData,
      invoiceCustomer,
      productsData,
      invoiceProduct,
      invoiceProductsData,
      customerKey,
      subTotal,
      total,
    },
    setDataState,
  ] = useState(initialState);

  const loadCustomers = async () => {
    const [customersDataResponse, productsDataResponse] = await Promise.all([
      getServiceApp(endpoints.users),
      getServiceApp(endpoints.products + `?estado=true`),
    ]);
    const validDataCustomers = dataValidation(customersDataResponse, false);
    const validDataProduct = dataValidation(productsDataResponse, false);
    if (validDataCustomers.ok && validDataProduct.ok) {
      setDataState((data) => ({
        ...data,
        loading: false,
        customersData: validDataCustomers.usuarios.filter(
          (usuarios) => usuarios.rol === "CUSTOMER_ROLE"
        ),
        productsData: validDataProduct.productos,
      }));
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

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
          <h2 className="sellScreenTitle">Factura de compra No. 1</h2>
        </div>
        <div className="sellScreenTop">
          <CustomerBoxTopLeft
            setDataState={setDataState}
            customersData={customersData}
            invoiceCustomer={invoiceCustomer}
            subTotal={subTotal}
            total={total}
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
      <Tooltip title="Facturar.">
        <Fab style={style} onClick={handleSendInvoice} color="success" aria-label="add">
          <MonetizationOn />
        </Fab>
      </Tooltip>
      <CustomerDialog open={open} setOpen={setOpen} />
    </>
  );
};
