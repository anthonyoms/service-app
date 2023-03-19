import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceBox from "../../components/invoice/InvoiceBox";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { dataValidation } from "../../utils/helpers/messages";
import "../../assets/style/invoiceStyle.css";

export const EntryInvoice = () => {
  const configuration = useSelector((state) => state.info);
  const [dataInvoice, setDataInvoice] = useState({
    type: "Entrada de inventario",
  });
  useEffect(() => {
    loadDataInvoice();
  }, []);

  const loadDataInvoice = async () => {
    const id = getIdUrl();
    const dataResponse = await getServiceApp(`${endpoints.entrada}/${id}`);
    const { entrada } = dataValidation(dataResponse, false);
    console.log(entrada);
    setDataInvoice((prevState) => ({
      ...prevState,
      creada: entrada.fechaEmision,
      vence: entrada.fechaVencimiento,
      numero: entrada.id,
      suplidor: entrada.suplidor,
      total: entrada.total,
      totalTax: entrada.totalTax,
      subTotal: entrada.subTotal,
      productos: entrada.productos,
      estado: entrada.estado,
    }));
  };

  return <InvoiceBox dataInvoice={dataInvoice} cliente={configuration} />;
};
