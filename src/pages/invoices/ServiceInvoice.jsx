import React, { useState } from "react";
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
        total: Number(invoiceData?.itbis) + Number(invoiceData?.subTotal),
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
        totalPrice: Number(data.contrato.servicio.precio_instalacion),
        total: Number(data.contrato.servicio.precio_instalacion),
        producto: {
          totalProducto: Number(data.contrato.servicio.precio_instalacion),
          precio_compra: Number(data.contrato.servicio.precio_instalacion),
          _id: "001",
          nombre: "Instalación",
          estado: true,
        },
      });
    }
    const today = moment().format("DD/MM/YYYY");
    const fechaLimite = moment
      .utc(invoiceData?.fechaLimitePago)
      .format("DD/MM/YYYY");
    // Comparar las fechas
    const isLate =
      moment(today, "DD/MM/YYYY").isAfter(moment(fechaLimite, "DD/MM/YYYY")) &&
      !invoiceData.pago;
    if (isLate) {
      productos.push({
        cantidadRequerida: "N/A",
        totalTax: 0,
        totalPrice: Number(configuration.mora),
        total: Number(configuration.mora),
        producto: {
          totalProducto: Number(configuration.mora),
          precio_compra: Number(configuration.mora),
          _id: "001",
          nombre: "Mora",
          estado: true,
        },
      });
    }

    setConrtactData((prevState) => ({
      ...prevState,
      estado: true,
      ncf: invoiceData?.numeroComprobante,
      tipoPago: invoiceData?.tipoPago,
      creada: moment.utc(invoiceData?.fechaCorte),
      vence: moment.utc(invoiceData?.fechaLimitePago),
      numero: invoiceData?.id,
      suplidorOcliente: {
        ...data.contrato.cliente,
        cedula_rnc: data.contrato.cliente.cedula,
      },
      total: isLate
        ? invoiceData?.total + Number(configuration.mora)
        : invoiceData?.total,
      totalTax: invoiceData?.itbis,
      subTotal: isLate
        ? invoiceData?.total +
          Number(configuration.mora) -
          Number(invoiceData?.itbis)
        : Number(invoiceData?.total) - Number(invoiceData?.itbis),
      productos,
      vendedor: "Generado por el sisetma",
      nota:
        invoiceData.id === 1
          ? "puede incurrir en cargos adicionales por intalación a su servicio el primer mes de renta"
          : `${
              isLate
                ? `esta factura esta en atraso el cargo por mora es de $${configuration.mora}`
                : "prestar atención a la fecha de vencimiento"
            }`,
      rightTitle: "Contratado a:",
    }));
  };
  loadContract();
  return <InvoiceBox dataInvoice={conrtactData} cliente={configuration} />;
};
