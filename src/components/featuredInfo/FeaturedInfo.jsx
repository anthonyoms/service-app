import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { formatter } from "../../utils/constants/formatNumber";

export default function FeaturedInfo() {
  const [{ sales, entry, userCount }, setData] = useState({
    sales: 0,
    entry: 0,
    userCount: 0,
  });

  useEffect(() => {
    loadDashboardInfo();
  }, []);

  const loadDashboardInfo = async () => {
    const [dataResponse, dataResponseEntry, userCount] = await Promise.all([
      getServiceApp(endpoints.dashboard + "/monthsales"),
      getServiceApp(endpoints.dashboard + "/entrysales"),
      getServiceApp(endpoints.dashboard + "/usercount"),
    ]);

    const validData = dataValidation(dataResponse, false);
    console.log(validData);
    const validDataEntry = dataValidation(dataResponseEntry, false);
    const validDatauserCount = dataValidation(userCount, false);
    if (validData.ok || validDataEntry.ok) {
      setData({
        sales: dataResponse?.sales,
        entry: validDataEntry?.entry,
        userCount: validDatauserCount?.usersCount,
        loading: false,
      });
    }
  };
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Clientes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userCount}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatter.format(sales)}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Compras</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatter.format(entry)}</span>
        </div>
      </div>
    </div>
  );
}
