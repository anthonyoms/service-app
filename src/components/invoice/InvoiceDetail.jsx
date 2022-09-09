import React from "react";

const InvoiceDetail = () => {
  return (
    <>
      <tr className="heading">
        <td>Item</td>
        <td>Cantidad</td>
        <td>Precio</td>
        <td>Itbis</td>
        <td>Total</td>
      </tr>

      <tr className="item">
        <td>Website design</td>

        <td>1</td>
        <td>$300.00</td>
        <td>$300.00</td>
        <td>$300.00</td>
      </tr>

      <tr className="item">
        <td>Hosting (3 months)</td>

        <td>100</td>
        <td>$75.00</td>
        <td>$75.00</td>
        <td>$75.00</td>
      </tr>

      <tr className="item last">
        <td>Domain name (1 year)</td>

        <td>10000</td>
        <td>$10.00</td>
        <td>$10.00</td>
        <td>$10.00</td>
      </tr>

      <tr className="total">
        <td></td>
        <td></td>
        <td>Total neto: $385.00</td>
        <td>Itbis: $385.00</td>
        <td>Total: $385.00</td>
      </tr>
    </>
  );
};

export default InvoiceDetail;
