import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceBox from "../../components/invoice/InvoiceBox";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { dataValidation } from "../../utils/helpers/messages";

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
    const { ordeDetalles } = dataValidation(dataResponse, false);
    setDataInvoice((prevState) => ({
      ...prevState,
      creada: ordeDetalles.ordenCompra.fechaEmision,
      vence: ordeDetalles.ordenCompra.fechaVencimiento,
      numero: ordeDetalles.ordenCompra.id,
      suplidor: ordeDetalles.ordenCompra.suplidor,
      total: ordeDetalles.ordenCompra.total,
      totalTax: ordeDetalles.ordenCompra.totalTax,
      subTotal: ordeDetalles.ordenCompra.subTotal,
      productos: ordeDetalles.productos,
    }));
  };

  return <InvoiceBox dataInvoice={dataInvoice} cliente={configuration} />;
};
