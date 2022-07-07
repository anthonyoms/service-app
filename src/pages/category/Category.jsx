import { Link } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import "./category.css";

export default function Category() {
  return (
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Categoria</h1>
        <Link to="/newcategory">
          <button className="categoryAddButton">Crear</button>
        </Link>
      </div>
      <div className="categoryTop">
        <div className="categoryTopRight">
          <div className="categoryInfoTop">
            <img
              src="https://www.cqnetcr.com/29633-home_default/patch-cord-nexxt-nab-pcs6a3fbl-3-ft-cat6a-azul.jpg"
              alt=""
              className="categoryInfoImg"
            />
            <span className="categoryName">Cables utp categoria 6</span>
          </div>
          <div className="categoryInfoBottom">
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">id:</span>
              <span className="categoryInfoValue">123</span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">sales:</span>
              <span className="categoryInfoValue">5123</span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">active:</span>
              <span className="categoryInfoValue">yes</span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">in stock:</span>
              <span className="categoryInfoValue">no</span>
            </div>
          </div>
        </div>
        <div className="categoryTopLeft"></div>
      </div>
      <div className="categoryBottom">
        <form className="categoryForm">
          <div className="categoryFormLeft">
            <label>Nombre de la categoria</label>
            <input type="text" placeholder="Cables utp categoria 6" />
            <label>Descripción de la categoria</label>
            <textarea rows="4" cols="50" placeholder="Cable de internet" />
            <label>En Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Activo</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="categoryFormRight">
            <div className="categoryUpload">
              <img
                src="https://www.cqnetcr.com/29633-home_default/patch-cord-nexxt-nab-pcs6a3fbl-3-ft-cat6a-azul.jpg"
                alt=""
                className="categoryUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="categoryButton">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
