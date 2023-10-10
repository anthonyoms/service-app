import React from "react";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceHead from "./InvoiceHead";

const InvoiceBox = ({ cliente, dataInvoice }) => {
  console.log(cliente, dataInvoice);
  return (
    <div className="divBody">
      <br />
      <br />
      <br />
      <div className="invoice-box">
        <table>
          <tbody>
            <InvoiceHead cliente={cliente} {...dataInvoice} />
            <InvoiceDetail {...dataInvoice} />
          </tbody>
        </table>
        <h5>nota:</h5>
        <h5>Prestar atención a la fecha de vencimiento.</h5>
      </div>
    </div>
  );
};

export default InvoiceBox;
