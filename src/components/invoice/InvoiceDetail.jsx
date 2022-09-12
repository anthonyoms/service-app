import React from "react";

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
                <td>${producto.precio_compra}</td>
                <td>${totalPrice}</td>
                <td>${totalTax}</td>
                <td>${total}</td>
              </tr>
            );
          }
        )}

      <tr className="total">
        <td></td>
        <td></td>
        <td></td>
        <td>Neto: ${subTotal}</td>
        <td>Itbis: ${totalTax}</td>
        <td>Total: ${total}</td>
      </tr>
    </>
  );
};

export default InvoiceDetail;
