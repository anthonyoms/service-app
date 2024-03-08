import React from "react";
import { productData } from "../../dummyData";
import Chart from "../chart/Chart";
import "../../pages/productService/service.css";

export default function WidgetProductDetail({ name, data, showImage = true }) {
  const elementToRender = [];
  for (const property in data) {
    elementToRender.push(
      <div key={property} className="serviceInfoItem">
        <span className="serviceInfoKey">{property}:</span>
        &nbsp;
        <span className="serviceInfoValue">{`${data[property]}`}</span>
      </div>
    );
  }
  return (
    <div className="serviceTop">
      <div className="serviceTopLeft">
        <Chart  data={productData} dataKey="Sales" title="Sales Performance" />
      </div>
      <div className="serviceTopRight">
        <div className="serviceInfoTop">
          {showImage && (
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="serviceInfoImg"
            />
          )}
          <span className="serviceName">{name}</span>
        </div>
        <div className="serviceInfoBottom">{elementToRender}</div>
      </div>
    </div>
  );
}
