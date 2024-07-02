import moment from "moment/moment";
import React from "react";
import { formatter } from "../../utils/constants/formatNumber";

const InvoiceHead = ({
  cliente,
  suplidorOcliente,
  numero,
  type,
  creada,
  vence,
  total,
  estado,
  rightTitle,
  tipoPago,
  ncf,
  anulada,
  pagada,
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
                      {vence && (
                        <>Vence: {moment.utc(vence).format("DD/MM/YYYY")}</>
                      )}
                      <br />
                      Creada: {moment.utc(creada).format("DD/MM/YYYY")}
                      <br />
                      {pagada && (
                        <>Pagada: {moment.utc(pagada).format("DD/MM/YYYY")}</>
                      )}
                      <br />
                      {ncf && <>NCF: {ncf}</>}
                    </>
                  ) : (
                    <>
                      <strong style={{ color: "red" }}>Estado: Anulada</strong>
                      <br />
                      {anulada && (
                        <strong style={{ color: "red" }}>
                          Fecha: {moment(anulada).format("DD/MM/YYYY")}
                        </strong>
                      )}
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
                  {cliente.nombre}
                  <br />
                  {cliente.cedula_rnc}
                  <br />
                  {cliente.direccion}
                </td>
                <td>
                  <strong> {rightTitle}</strong>
                  <br />
                  {suplidorOcliente?.nombre}
                  <br /> {suplidorOcliente?.cedula_rnc}
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
        <td>Monto</td>
      </tr>
      <tr className="details">
        <td>{tipoPago}</td>

        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{formatter.format(total)}</td>
      </tr>
    </>
  );
};

export default InvoiceHead;
