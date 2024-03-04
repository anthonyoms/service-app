import React, { useEffect, useState } from "react";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { useSelector } from "react-redux";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import InvoiceBox from "../../components/invoice/InvoiceBox";

export const RefundsInvoice = () => {
  const configuration = useSelector((state) => state.info);
  const [dataRefunds, setDataRefunds] = useState({
    type: "Devolucion",
  });
  useEffect(() => {
    loadDataRefunds();
  }, []);

  const loadDataRefunds = async () => {
    const id = getIdUrl();
    const dataResponse = await getServiceApp(`${endpoints.devoluciones}/${id}`);
    const { devolucion } = dataValidation(dataResponse, false);
    const { uidHijo } = devolucion.tipo;
    const { item_text } = devolucion.tipo.colecciongenerica.items.find(
      ({ _id }) => _id === uidHijo
    );
    setDataRefunds((prevState) => ({
      ...prevState,
      descuento: devolucion?.discount,
      totalAfterdiscount: devolucion.totalAfterdiscount,
      vendedor: devolucion.usuario.nombre,
      ncf: devolucion.numeroComprobante,
      tipoPago: item_text,
      creada: devolucion.fechaEmision,
      vence: devolucion.fechaVencimiento,
      numero: devolucion.id,
      suplidorOcliente: {
        ...devolucion.cliente,
        cedula_rnc: devolucion.cliente.cedula,
      },
      total: devolucion.total,
      totalTax: devolucion.itbis,
      subTotal: devolucion.subTotal,
      productos: devolucion.productosDevueltos.map(
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
            _id: producto.uid,
            precio_compra: producto.precio_venta,
          },
        })
      ),
      estado: devolucion.estado,
      nota: "Prestar atención a la fecha de vencimiento",
      rightTitle: "Devuelto a:",
    }));
  };

  return <InvoiceBox dataInvoice={dataRefunds} cliente={configuration} />;
};
