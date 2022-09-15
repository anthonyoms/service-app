import moment from "moment/moment";
import React from "react";

const InvoiceHead = ({
  cliente,
  suplidor,
  numero,
  type,
  creada,
  vence,
  total,
  estado,
}) => {
  return (
    <>
      <tr className="top">
        <td colSpan="6">
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
                  <strong>{type}#:</strong> {numero}
                  <br />
                  {estado ? (
                    <>
                      <strong>Creada:</strong>{" "}
                      {moment(creada).format("DD/MM/YYYY")}
                      <br />
                      <strong>Vence:</strong>{" "}
                      {moment(vence).format("DD/MM/YYYY")}
                    </>
                  ) : (
                    <>
                      <strong style={{ color: "red" }}>Estado: Anulada</strong>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr className="information">
        <td colSpan="6">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Datos cliente:</strong>
                  <br />
                  <strong>Nombre: </strong>
                  {cliente.nombre}
                  <br />
                  <strong>Cedula/Rnc: </strong> {cliente.cedula_rnc}
                  <br />
                  <strong>Dirección:</strong> {cliente.direccion}
                </td>

                <td>
                  <strong>Datos Proveedor:</strong>
                  <br />
                  <strong>Nombre:</strong> {suplidor?.nombre}
                  <br />
                  <strong>Cedula/Rnc:</strong> {suplidor?.cedula_rnc}
                  <br />
                  <strong>Dirección:</strong> {suplidor?.direccion}
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
        <td></td>
        <td>Al contado</td>
      </tr>
      <tr className="details">
        <td>Transferencia bancaria</td>

        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>${total}</td>
      </tr>
    </>
  );
};

export default InvoiceHead;
