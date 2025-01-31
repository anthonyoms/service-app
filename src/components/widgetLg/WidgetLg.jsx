import { useEffect, useState } from "react";
import "./widgetLg.css";
import { getServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";
import moment from "moment";
import { formatter } from "../../utils/constants/formatNumber";

export default function WidgetLg() {
  const [{ data, loading }, setData] = useState({ data: [], loading: true });
  useEffect(() => {
    loadLastTransactions();
  }, []);

  const loadLastTransactions = async () => {
    const dataResponse = await getServiceApp(
      endpoints.dashboard + "/lasttransactions"
    );
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      console.log(validData.lastTransactions);
      setData({ data: validData.lastTransactions, loading: false });
    }
  };

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Últimas Transacciones</h3>

      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Cliente</th>
            <th className="widgetLgTh">Fecha</th>
            <th className="widgetLgTh">Monto</th>
            <th className="widgetLgTh">Estado</th>
          </tr>
          {data?.length > 0 ? (
            data?.map((transaction, index) => (
              <tr key={index} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src={transaction.cliente.img}
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">
                    {transaction.cliente.correo}
                  </span>
                </td>
                <td className="widgetLgDate">
                  {moment(transaction.fechaPagoCliente).format("DD/MM/yyyy")}
                </td>
                <td className="widgetLgAmount">
                  {" "}
                  {formatter.format(transaction.total)}
                </td>
                <td className="widgetLgStatus">
                  <Button type="Approved" />
                </td>
              </tr>
            ))
          ) : (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName"></span>
              </td>
              <td className="widgetLgDate"></td>
              <td className="widgetLgAmount"></td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
