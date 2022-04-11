import React from "react";
import { Service } from "../../components/dataGridColumns/Service";
import SalesWidgetLg from "../../components/sales/SalesWidgetLg";
import SalesWidgetSm from "../../components/sales/SalesWidgetSm";
import { productRows } from "../../dummyData";
import "./sales.css";

const ServiceSales = () => {
  return (
    <div className="sales">
      <div className="salesWidgets">
        <SalesWidgetLg
          data={productRows}
          title={"Agregar Servicio"}
          columns={Service}
        />
        <SalesWidgetSm />
      </div>
    </div>
  );
};

export default ServiceSales;
