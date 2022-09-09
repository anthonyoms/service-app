import React from "react";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceHead from "./InvoiceHead";

const InvoiceBox = ({
  cliente,
  suplidor,
  type,
  fechaEmision,
  fechaVencimineto,
}) => {
  return (
    <div className="divBody">
      <br />
      <br />
      <br />
      <div className="invoice-box">
        <table>
          <tbody>
            <InvoiceHead />
            <InvoiceDetail />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceBox;
