import React from "react";

const InvoiceHead = () => {
  return (
    <>
      <tr className="top">
        <td colSpan="5">
          <table>
            <tbody>
              <tr>
                <td className="title">
                  <img
                    src="https://res.cloudinary.com/dg9hg5urc/image/upload/v1660843841/logotipo-orbit-01-e1653580643499_vvd4sa.png"
                    alt="Company logo"
                    style={{ width: "100%", maxWidth: "150px" }}
                  />
                </td>

                <td>
                  <strong>Orden de compra#:</strong> 123
                  <br />
                  <strong>Creada:</strong> January 1, 2015
                  <br />
                  <strong>Vence:</strong> February 1, 2015
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr className="information">
        <td colSpan="5">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Datos cliente:</strong>
                  <br />
                  <strong>Nombre:</strong> Sparksuite, Inc.
                  <br />
                  <strong>Cedula/Rnc:</strong> 402-00455430-0
                  <br />
                  <strong>Dirección:</strong> Expreso John F. Kennedy Km. 16,
                  Santo Domingo 10203
                </td>

                <td>
                  <strong>Datos Proveedor:</strong>
                  <br />
                  <strong>Nombre:</strong> Acme Corp.
                  <br />
                  <strong>Cedula/Rnc:</strong> 402-00455430-0
                  <br />
                  <strong>Dirección:</strong> Expreso John F. Kennedy Km. 16,
                  Santo Domingo 10203
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr className="heading">
        <td>Método de pago</td>

        <td></td>
        <td></td>
        <td></td>
        <td>Al contado</td>
      </tr>
      <tr className="details">
        <td>Transferencia bancaria</td>

        <td></td>
        <td></td>
        <td></td>
        <td>$385.00</td>
      </tr>
    </>
  );
};

export default InvoiceHead;
