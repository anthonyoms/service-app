import {
  WcOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  AssignmentIndOutlined,
  CakeOutlined,
  Group,
} from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { fetchServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { httpMethods } from "../../utils/constants/httpMethods";
import { errorMsg, successMsg } from "../../utils/helpers/messages";

import "./user.css";

export default function User() {
  const [user, setUser] = useState(null);
  const [userValues, handleInputChange, reset] = useForm({
    correo: "",
    nombre: "",
    password: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    genero: "",
    estadoCivil: "",
    rol: "",
  });
  const {
    correo,
    nombre,
    password,
    telefono,
    fechaNacimiento,
    direccion,
    genero,
    estadoCivil,
    rol,
  } = userValues;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const id = window.location.pathname.split("/")[2];
    const { data } = await fetchServiceApp(`${endpoints.users}/${id}`);
    setUser(data.usuario);
  };

  const handleChangeDate = (newValue) => {
    handleInputChange({ target: { name: "fechaNacimiento", value: newValue } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      correo: correo || user?.correo,
      nombre: nombre || user?.nombre,
      password: password || user?.password,
      telefono: telefono || user?.telefono,
      fechaNacimiento: fechaNacimiento || user?.fechaNacimiento,
      direccion: direccion || user?.direccion,
      genero: genero || user?.genero,
      estadoCivil: estadoCivil || user?.estadoCivil,
      rol: rol || user?.rol,
    };
    const { data } = await fetchServiceApp(
      `${endpoints.users}/${user.uid}`,
      payload,
      httpMethods.Put
    );
    if (data.ok) {
      successMsg(data.msg);
      reset();
      loadUsers();
    } else {
      errorMsg(data.errorMsg);
    }
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
              <span className="userShowUsername">{user?.nombre}</span>
              <span className="userShowUserTitle">{user?.rol}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalles de la cuenta</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.usuario}</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.genero}</span>
            </div>
            <span className="userShowTitle">Detalles de contacto</span>
            <div className="userShowInfo">
              <CakeOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                {moment(user?.fechaNacimiento).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="userShowInfo">
              <AssignmentIndOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.cedula}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.telefono}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.correo}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.direccion}</span>
            </div>
            <div className="userShowInfo">
              <Group className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.estadoCivil}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Editar</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <TextField
                  id="correo"
                  label="Email"
                  name="correo"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  value={correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <TextField
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  value={nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <TextField
                  id="password"
                  label="Contraseña"
                  name="password"
                  variant="outlined"
                  size="small"
                  type={"password"}
                  autoComplete="off"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <TextField
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  inputProps={{ maxLength: "10" }}
                  value={telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Fecha de nacimiento"
                    inputFormat="dd/MM/yyyy"
                    value={fechaNacimiento}
                    onChange={handleChangeDate}
                    renderInput={(params) => (
                      <TextField autoComplete="off" size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="userUpdateItem">
                <TextField
                  id="direccion"
                  label="Dirección"
                  name="direccion"
                  variant="outlined"
                  size="small"
                  value={direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userUpdateItem">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label-genero">
                    Genero
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-genero"
                    id="demo-simple-select-genero"
                    name="genero"
                    label="Genero"
                    size="small"
                    value={genero}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Masculino"}>Masculino</MenuItem>
                    <MenuItem value={"Femenino"}>Femenino</MenuItem>
                    <MenuItem value={"Otro"}>Otro</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="userUpdateItem">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label-estadoCivil">
                    Estado Civil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-estadoCivil"
                    id="demo-simple-select-estadoCivil"
                    name="estadoCivil"
                    label="Estado Civil"
                    size="small"
                    value={estadoCivil}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Casado"}>Casado</MenuItem>
                    <MenuItem value={"Soltero"}>Soltero</MenuItem>
                    <MenuItem value={"Viudo"}>Viudo</MenuItem>
                    <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="userUpdateItem">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-rol"
                    id="demo-simple-select-rol"
                    name="rol"
                    label="Rol"
                    size="small"
                    value={rol}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"ADMIN_ROLE"}>Administrador</MenuItem>
                    <MenuItem value={"TECNICO_MESA"}>
                      Técnico mesa de ayuda
                    </MenuItem>
                    <MenuItem value={"CUSTOMER_ROLE"}>Cliente</MenuItem>
                    <MenuItem value={"CAJERO"}>Cajero</MenuItem>
                    <MenuItem value={"TECNICO"}>Tecnico</MenuItem>
                  </Select>
                </FormControl>
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
