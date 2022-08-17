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
import { MyBackdrop } from "../../components/ui/Backdrop";
import useForm from "../../hooks/useForm";
import {
  getServiceApp,
  updateServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";
import { dataValidation } from "../../utils/helpers/messages";

import "./user.css";

export default function User() {
  const [{ user, loading }, setUser] = useState({ user: null, loading: true });
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
    loadUser();
  }, []);

  const loadUser = async () => {
    const id = window.location.pathname.split("/")[2];
    const dataResponse = await getServiceApp(`${endpoints.users}/${id}`);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setUser({ user: validData.usuario, loading: false });
    }
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
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.users,
      user.uid
    );
    const validData = await dataValidation(dataResponse);
    if (validData.ok) {
      reset();
      loadUser();
    }
  };

  const handleUploadImage = async (e) => {
    setUser((user) => {
      return { ...user, loading: true };
    });
    const data = await uploadFileServiceApp(
      e.target.files[0],
      endpoints.users,
      user.uid
    );
    const validData = dataValidation(data);
    if (validData.ok) {
      loadUser();
    } else {
      setUser((user) => {
        return { ...user, loading: false };
      });
    }
  };
  const handleChangeNumber = (e) => {
    const target = handleFormatNumber(e);
    handleInputChange(target);
  };
  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Actualización de usuario</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={user?.img} alt="" className="userShowImg" />
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
                    inputProps={{ maxLength: "50" }}
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
                    inputProps={{ maxLength: "50" }}
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
                    inputProps={{ maxLength: "50" }}
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
                    onChange={handleChangeNumber}
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
                        <TextField
                          autoComplete="off"
                          size="small"
                          {...params}
                        />
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
                    multiline
                    rows={5}
                    autoComplete="off"
                    inputProps={{ maxLength: "100" }}
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
                      <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                      <MenuItem value={"Soltero"}>Soltero</MenuItem>
                      <MenuItem value={"Viudo"}>Viudo</MenuItem>
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
                      <MenuItem value={"CAJERO"}>Cajero</MenuItem>
                      <MenuItem value={"TECNICO_MESA"}>
                        Técnico mesa de ayuda
                      </MenuItem>
                      <MenuItem value={"TECNICO"}>Tecnico</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={user?.img} alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleUploadImage}
                  />
                </div>
                <button className="userUpdateButton">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
