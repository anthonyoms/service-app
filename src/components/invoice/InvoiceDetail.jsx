import React from "react";
import { formatter } from "../../utils/constants/formatNumber";

const InvoiceDetail = ({ productos = [], subTotal, totalTax, total }) => {
  return (
    <>
      <tr className="heading">
        <td>Item</td>
        <td>Cantidad</td>
        <td>Precio</td>
        <td>Neto</td>
        <td>Itbis</td>
        <td>Total</td>
      </tr>

      {!!productos.length &&
        productos.map(
          ({ producto, cantidadRequerida, totalTax, total, totalPrice }) => {
            return (
              <tr key={producto?._id} className="item">
                <td>{producto?.nombre}</td>

                <td>{cantidadRequerida}</td>
                <td>{formatter.format(producto.precio_compra)}</td>
                <td>{formatter.format(totalPrice)}</td>
                <td>{formatter.format(totalTax)}</td>
                <td>{formatter.format(total)}</td>
              </tr>
            );
          }
        )}

      <tr className="total">
        <td></td>
        <td></td>
        <td></td>
        <td>Neto: {formatter.format(subTotal)}</td>
        <td>Itbis: {formatter.format(totalTax)}</td>
        <td>Total: {formatter.format(total)}</td>
      </tr>
    </>
  );
};

export default InvoiceDetail;
