import React from "react";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceHead from "./InvoiceHead";

const InvoiceBox = ({ cliente, dataInvoice }) => {
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
        <h5>Nota: {dataInvoice?.nota}</h5>
        {dataInvoice?.vendedor && <h5>Vendedor: {dataInvoice.vendedor}</h5>}
      </div>
    </div>
  );
};

export default InvoiceBox;
