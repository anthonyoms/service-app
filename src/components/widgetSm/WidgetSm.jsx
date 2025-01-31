import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

export default function WidgetSm() {
  const navigate = useNavigate(); // Hook para navegar
  const [{ loading, userData }, setUserData] = useState({
    loading: true,
    userData: [],
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const dataResponse = await getServiceApp(endpoints.users);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      const filteredUsers = dataResponse.usuarios
        .filter((usuario) => usuario.rol === "CUSTOMER_ROLE")
        .slice(0, 5);
      setUserData({
        loading: false,
        userData: filteredUsers,
      });
    }
  };
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Nuevos Clientes</span>
      <ul className="widgetSmList">
        {userData?.length > 0 ? (
          userData?.map((usuario, index) => (
            <li key={index} className="widgetSmListItem">
              <img src={usuario.img} alt="" className="widgetSmImg" />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{usuario.nombre}</span>
                <span className="widgetSmUserTitle">{usuario.rol}</span>
              </div>
              <button className="widgetSmButton" onClick={() => navigate(`/user/${usuario.uid}`)}>
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        ) : (
          <p>No users available</p>
        )}
      </ul>
    </div>
  );
}
