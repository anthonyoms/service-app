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
import { getUsersById, putUser } from "../../services/users";
import useForm from "../../hooks/useForm";

export default function User() {
  const { pathname } = useLocation();
  const [data, setData] = useState({
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

  const [{ nombre, telefono, direccion }, handleInputChange, reset] = useForm({
    nombre: "",
    telefono: "",
    direccion: "",
    generoNew: "",
    rolNew: "",
  });

  useEffect(() => {
    if (data.usuario.length === 0) {
      loadUser();
    }
  });

  const loadUser = async () => {
    const userId = pathname.split("/")[2];
    const userData = await getUsersById(userId);
    setData(userData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setData({ ...data, nombre, telefono, direccion });
    await putUser(data.uid, {
      nombre,
      telefono,
      direccion,
      rol: data.rol,
    });
    reset();
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
              <span className="userShowUsername">{data.nombre}</span>
              <span className="userShowUserTitle">{data.rol}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.usuario}</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{data.genero}</span>
            </div>
            <span className="userShowTitle">Detalles de contacto</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.telefono}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.correo}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.direccion}</span>
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
                  value={data.usuario}
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
                  value={nombre}
                  onChange={handleInputChange}
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={data.correo}
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
                  value={telefono}
                  onChange={handleInputChange}
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={direccion}
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
              <button className="userUpdateButton" onClick={handleUpdate}>
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
