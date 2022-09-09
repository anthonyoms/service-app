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
    cliente: configuration,
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
    console.log(ordeDetalles);
    setDataInvoice((prevState) => ({ ...prevState, ...ordeDetalles }));
  };

  return <InvoiceBox {...dataInvoice} />;
};
