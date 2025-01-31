import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { data } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { endpoints } from "../../utils/constants/endpoints";
import { getServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";

export const Home = () => {
  const [{ data, loading }, setData] = useState({ data: [], loading: true });
  useEffect(() => {
    loadUsersCount();
  }, []);
  const loadUsersCount = async () => {
    const dataResponse = await getServiceApp(
      endpoints.dashboard + "/useractive"
    );
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setData({ data: validData.users, loading: false });
    }
  };
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={data} title="Analiticas de usuarios" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};
