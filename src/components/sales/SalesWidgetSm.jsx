import React from "react";
import { DeleteOutlined } from "@material-ui/icons";
import "../widgetSm/widgetSm.css";
import "./salesWidgetSm.css";

const SalesWidgetSm = () => {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Detalles Factura</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Apple Airpods</span>
            <span className="widgetSmUserTitle">
              Cant. {5} X ${150.45}
            </span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Precio Total.</span>
            <span className="widgetSmUserTitle">Total: ${752.25}</span>
          </div>
          <button className="salesWidgetSmButton">
            <DeleteOutlined className="widgetSmIcon" />
            Eliminar
          </button>
        </li>
      </ul>
      <hr />
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Subtotal $</span>
            <span className="widgetSmUserTitle">
              ${150.45}
            </span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Itbis 18%</span>
            <span className="widgetSmUserTitle">${135.36}</span>
          </div>
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Total $</span>
            <span className="widgetSmUserTitle">${487}</span>
          </div>

        </li>
      </ul>
    </div>
  );
};

export default SalesWidgetSm;
