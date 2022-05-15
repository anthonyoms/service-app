
import {
  WcOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";

import "./user.css";

export default function User() {




  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Actualización de usuario</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername"></span>
              <span className="userShowUserTitle"></span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle"></span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle"></span>
            </div>
            <span className="userShowTitle">Detalles de contacto</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle"></span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle"></span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle"></span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
