import React from "react";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceHead from "./InvoiceHead";

const InvoiceBox = ({ cliente, dataInvoice }) => {
  console.log(cliente, dataInvoice )
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
      </div>
    </div>
  );
};

export default InvoiceBox;
