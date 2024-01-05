import { Link } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import "./service.css";
import WidgetProductDetail from "../../components/widgetProductDetail/WidgetProductDetail";
import { useEffect, useState } from "react";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { formatter } from "../../utils/constants/formatNumber";

export default function Service() {
  const [{ service, loading }, setService] = useState({
    service: null,
    loading: true,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const id = getIdUrl();
    const [{ categorias }, { servicio, ...data }] = await Promise.all([
      getServiceApp(endpoints.categories),
      getServiceApp(`${endpoints.services}/${id}`),
    ]);
    if (!data.ok) {
      dataValidation(data);
      setService({ loading: false });
      return;
    }
    setCategories(categorias);
    // setFormValues({ ...producto, categoria: producto?.categoria._id });
    setService({ service: servicio, loading: false });
  };
  return (
    <div className="service">
      <div className="serviceTitleContainer">
        <h1 className="serviceTitle">Servicios</h1>
        <Link to="/newservice">
          <button className="serviceAddButton">Crear</button>
        </Link>
      </div>
      <WidgetProductDetail
        name={service?.nombre}
        data={{
          Codigo: service?.codigo,
          Nombre: service?.nombre,
          "Precio Venta": formatter.format(service?.precio_venta),
          "Precio de instalación": formatter.format(
            service?.precio_instalacion
          ),
          "Tipo de facración": service?.periodoFacturacion,
          Descripción: service?.descripcion,
          Categoria: service?.categoria?.nombre,
          Disponible: service?.disponible ? "Si" : "No",
          Estado: service?.estado ? "Activo" : "Inactivo",
        }}
      />
      <div className="serviceBottom">
        <form className="serviceForm">
          <div className="serviceFormLeft">
            <label>Nombre del servicio</label>
            <input type="text" placeholder="Apple AirPod" />
            <label>Precio</label>
            <input type="text" placeholder="$123.20" />
            <label>En Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Categoría</label>
            <select name="active" id="active">
              <option value="">Router</option>
              <option value="">Teléfono</option>
            </select>
            <label>Activo</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="serviceFormRight">
            <div className="serviceUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="serviceUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="serviceButton">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
