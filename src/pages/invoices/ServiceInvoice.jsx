import React, { useEffect, useState } from "react";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp } from "../../services/serviceApp";
import InvoiceBox from "../../components/invoice/InvoiceBox";
import { useSelector } from "react-redux";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { dataValidation } from "../../utils/helpers/messages";
import moment from "moment";

export const ServiceInvoice = () => {
  const configuration = useSelector((state) => state.info);
  const [conrtactData, setConrtactData] = useState({
    type: "Factura de Servicio",
  });

  useEffect(() => {
    loadContract();
  }, []);

  const loadContract = async () => {
    const id = getIdUrl();
    const invoiceId = getIdUrl(3);

    const data = await getServiceApp(`${endpoints.contratoDeServicio}/${id}`);
    if (!data.ok) {
      dataValidation(data);
      setConrtactData({ loading: false });
      return;
    }

    const invoiceData = data.contrato.facturas.find(
      (invoice) => invoice._id === invoiceId
    );

    let productos = [
      {
        cantidadRequerida: "N/A",
        totalTax: invoiceData?.itbis,
        totalPrice: invoiceData?.subTotal,
        total: invoiceData?.subTotal,
        producto: {
          totalProducto: data.contrato.servicio.precio_venta,
          precio_compra: data.contrato.servicio.precio_venta,
          _id: data.contrato.servicio._id,
          nombre: data.contrato.servicio.nombre,
          estado: data.contrato.servicio.estado,
        },
      },
    ];

    if (invoiceData.id === 1) {
      productos.push({
        cantidadRequerida: "N/A",
        totalTax: 0,
        totalPrice: data.contrato.servicio.precio_instalacion,
        total: data.contrato.servicio.precio_instalacion,
        producto: {
          totalProducto: data.contrato.servicio.precio_instalacion,
          precio_compra: data.contrato.servicio.precio_instalacion,
          _id: "001",
          nombre: "Instalación",
          estado: data.contrato.servicio.estado,
        },
      });
    }

    setConrtactData((prevState) => ({
      ...prevState,
      estado: data.contrato?.estado,
      ncf: invoiceData?.numeroComprobante,
      tipoPago: invoiceData?.tipoPago,
      creada: moment.utc(invoiceData?.fechaCorte),
      vence: moment.utc(invoiceData?.fechaLimitePago),
      numero: invoiceData?.id,
      suplidorOcliente: {
        ...data.contrato.cliente,
        cedula_rnc: data.contrato.cliente.cedula,
      },
      total: invoiceData?.total,
      totalTax: invoiceData?.itbis,
      subTotal: invoiceData?.subTotal,
      productos,
      vendedor: "Generado por el sisetma",
      nota: "Prestar atención a la fecha de vencimiento",
      rightTitle: "Contratado a:",
    }));
  };

  return <InvoiceBox dataInvoice={conrtactData} cliente={configuration} />;
};
