import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InvoiceBox from "../../components/invoice/InvoiceBox";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { dataValidation } from "../../utils/helpers/messages";
import "../../assets/style/invoiceStyle.css";

export const SellInvoice = () => {
  const configuration = useSelector((state) => state.info);
  const [dataInvoice, setDataInvoice] = useState({
    type: "Factura",
  });
  useEffect(() => {
    loadDataInvoice();
  }, []);

  const loadDataInvoice = async () => {
    const id = getIdUrl();
    const dataResponse = await getServiceApp(`${endpoints.facuracion}/${id}`);
    const { factura } = dataValidation(dataResponse, false);
    setDataInvoice((prevState) => ({
      ...prevState,
      descuento: factura.discount,
      totalAfterdiscount: factura.totalAfterdiscount,
      vendedor: factura.usuario.nombre,
      ncf: factura.numeroComprobante,
      tipoPago: factura.tipoPago,
      creada: factura.fechaEmision,
      vence: factura.fechaVencimiento,
      numero: factura.id,
      suplidorOcliente: {
        ...factura.cliente,
        cedula_rnc: factura.cliente.cedula,
      },
      total: factura.total,
      totalTax: factura.itbis,
      subTotal: factura.subTotal,
      productos: factura.productos.map(
        ({
          cantidadRequerida,
          itbisProducto,
          subTotalProducto,
          totalProducto,
          producto,
        }) => ({
          cantidadRequerida: cantidadRequerida,
          totalTax: itbisProducto,
          totalPrice: subTotalProducto,
          total: totalProducto,
          producto: {
            ...producto,
            precio_compra: producto.precio_venta,
          },
        })
      ),
      estado: factura.estado,
      rightTitle: "Vendido a:",
    }));
  };

  return <InvoiceBox dataInvoice={dataInvoice} cliente={configuration} />;
};
