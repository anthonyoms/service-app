import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceBox from "../../components/invoice/InvoiceBox";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { dataValidation } from "../../utils/helpers/messages";
import "../../assets/style/invoiceStyle.css";

export const Invoice = () => {
  const configuration = useSelector((state) => state.info);
  const [dataInvoice, setDataInvoice] = useState({
    type: "Orden de compra",
  });
  useEffect(() => {
    loadDataInvoice();
  }, []);

  const loadDataInvoice = async () => {
    const id = getIdUrl();
    const dataResponse = await getServiceApp(
      `${endpoints.detalleOrdenes}/${id}`
    );
    const { ordenDetalles } = dataValidation(dataResponse, false);
    console.log(ordenDetalles)
    setDataInvoice((prevState) => ({
      ...prevState,
      creada: ordenDetalles.ordenCompra.fechaEmision,
      vence: ordenDetalles.ordenCompra.fechaVencimiento,
      numero: ordenDetalles.ordenCompra.id,
      suplidor: ordenDetalles.ordenCompra.suplidor,
      total: ordenDetalles.ordenCompra.total,
      totalTax: ordenDetalles.ordenCompra.totalTax,
      subTotal: ordenDetalles.ordenCompra.subTotal,
      productos: ordenDetalles.productos,
      estado: ordenDetalles.ordenCompra.estado,
    }));
  };

  return <InvoiceBox dataInvoice={dataInvoice} cliente={configuration} />;
};
