import React from "react";
import SalesWidgetLg from "../../components/sales/SalesWidgetLg";
import SalesWidgetSm from "../../components/sales/SalesWidgetSm";

import "./sales.css";

const ServiceSales = () => {
  return (
    <div className="sales">
      <div className="salesWidgets">
        <SalesWidgetLg title={"Servicio"} />
        <SalesWidgetSm />
      </div>
    </div>
  );
};

export default ServiceSales;
