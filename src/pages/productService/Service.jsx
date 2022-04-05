import { Link } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import "./service.css";

export default function Service() {
  return (
    <div className="service">
      <div className="serviceTitleContainer">
        <h1 className="serviceTitle">servicios</h1>
        <Link to="/newservice">
          <button className="serviceAddButton">Crear</button>
        </Link>
      </div>
      <div className="serviceTop">
        <div className="serviceTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="serviceTopRight">
          <div className="serviceInfoTop">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="serviceInfoImg"
            />
            <span className="serviceName">Apple Airpods</span>
          </div>
          <div className="serviceInfoBottom">
            <div className="serviceInfoItem">
              <span className="serviceInfoKey">id:</span>
              <span className="serviceInfoValue">123</span>
            </div>
            <div className="serviceInfoItem">
              <span className="serviceInfoKey">sales:</span>
              <span className="serviceInfoValue">5123</span>
            </div>
            <div className="serviceInfoItem">
              <span className="serviceInfoKey">active:</span>
              <span className="serviceInfoValue">yes</span>
            </div>
            <div className="serviceInfoItem">
              <span className="serviceInfoKey">in stock:</span>
              <span className="serviceInfoValue">no</span>
            </div>
          </div>
        </div>
      </div>
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
            <label>Categoria</label>
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
