import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  WcOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";

import "./user.css";
import { getUsersById } from "../../services/users";
import useForm from "../../hooks/useForm";

export default function User() {
  const { pathname } = useLocation();
  const [
    { uid, usuario, nombre, correo, telefono, direccion, genero, rol },
    setData,
  ] = useState({
    uid: "",
    usuario: "",
    nombre: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
    genero: "",
    rol: "",
  });

  const [{ nombreNew, telefonoNew, direccionNew }, handleInputChange] = useForm(
    {
      nombreNew: "",
      telefonoNew: "",
      direccionNew: "",
      generoNew: "",
      rolNew: "",
    }
  );
  useEffect(() => {
    if (usuario.length === 0) {
      loadUser();
    }
  });

  const loadUser = async () => {
    const userId = pathname.split("/")[2];
    const data = await getUsersById(userId);
    setData(data);
  };

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
              <span className="userShowUsername">{nombre}</span>
              <span className="userShowUserTitle">{rol}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{usuario}</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{genero}</span>
            </div>
            <span className="userShowTitle">Detalles de contacto</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{telefono}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{correo}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{direccion}</span>
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
                  value={usuario}
                  placeholder="annabeck99"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Nombre completo</label>
                <input
                  type="text"
                  name="nombreNew"
                  value={nombreNew}
                  onChange={handleInputChange}
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={correo}
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefonoNew"
                  value={telefonoNew}
                  onChange={handleInputChange}
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccionNew"
                  value={direccionNew}
                  onChange={handleInputChange}
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
              <button className="userUpdateButton">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
