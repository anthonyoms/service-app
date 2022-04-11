import SalesWidgetLg from "../../components/sales/SalesWidgetLg";
import SalesWidgetSm from "../../components/sales/SalesWidgetSm";

import "./sales.css";

const Sales = () => {
  return (
    <div className="sales">
      <div className="salesWidgets">
        <SalesWidgetLg title={"Producto"} />
        <SalesWidgetSm />
      </div>
    </div>
  );
};

export default Sales;
