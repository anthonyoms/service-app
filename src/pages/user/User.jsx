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
  Box,
  Button,
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
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { Login } from "../../services/auth";
import {
  getServiceApp,
  updateServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";
import { dataValidation } from "../../utils/helpers/messages";

import "./user.css";

export default function User() {
  const { uid, rol: userRol } = useSelector((state) => state.auth);
  const userId = window.location.pathname.split("/")[1];
  const [{ user, loading }, setUser] = useState({ user: null, loading: true });
  const [formValues, setFormValues] = useState({
    correo: "",
    nombre: "",
    password: "",
    telefono: "",
    fechaNacimiento: "",
    direccion: "",
    genero: "",
    estadoCivil: "",
    rol: "",
    cedula: "",
    currentPassword: "",
    confirmPassword: "",
    fechaRegistro:"",
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
    cedula,
    currentPassword,
    confirmPassword,
    fechaRegistro,
  } = formValues;

  useEffect(() => {
    loadUser(uid, userId);
  }, [uid, userId]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const loadUser = async (id, userId) => {
    const user = userId === "myuser" ? id : getIdUrl();
    const dataResponse = await getServiceApp(`${endpoints.users}/${user}`);
    const validData = dataValidation(dataResponse, false);
    if (!validData.ok) {
      setUser({ loading: false });
      return;
    }
    setFormValues(validData.usuario);
    setUser({ user: validData.usuario, loading: false });
  };

  const handleChangeDate = (newValue) => {
    handleInputChange({ target: { name: "fechaNacimiento", value: newValue } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      correo,
      nombre,
      password,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estadoCivil,
      rol,
      cedula,
    };
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.users,
      user.uid
    );
    const validData = await dataValidation(dataResponse);
    if (validData.ok) {
      loadUser(uid, userId);
    }
  };

  const handleUpdatePws = async () => {
    const isValidPws = await Login(correo, currentPassword);
    if (!isValidPws.ok) {
      Swal.fire("Error", isValidPws, "error");
      return;
    }
    if (!password || !confirmPassword) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    await updateUserPws(password);
  };

  const updateUserPws = async (pws = "1234") => {
    const payload = {
      correo: user.correo,
      nombre: user.nombre,
      password: pws,
      telefono: user.telefono,
      fechaNacimiento: user.fechaNacimiento,
      direccion: user.direccion,
      genero: user.genero,
      estadoCivil: user.estadoCivil,
      rol: user.rol,
      cedula: user.cedula,
    };
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.users,
      user.uid
    );
    const validData = await dataValidation(dataResponse);
    if (validData.ok) {
      loadUser(uid, userId);
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
      loadUser(uid, userId);
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

  const restartUserConfiguration = async () => updateUserPws();

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
              {userRol === "ADMIN_ROLE" && userId !== "myuser" && (
                <Box textAlign="left">
                  <Button
                    onClick={restartUserConfiguration}
                    sx={{ mt: 6 }}
                    variant="contained"
                  >
                    Reiniciar configuración de usuario
                  </Button>
                </Box>
              )}
            </div>
            {userId === "myuser" && (
              <div>
                <span className="userUpdateTitle">Cambiar contraseña</span>
                <div className="userUpdateItem">
                  <TextField
                    id="currentPassword"
                    label="Contraseña actual"
                    name="currentPassword"
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ maxLength: "50" }}
                    size="small"
                    type={"password"}
                    value={currentPassword || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="password"
                    label="Contraseña Nueva"
                    name="password"
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ maxLength: "50" }}
                    size="small"
                    type={"password"}
                    value={password || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="confirmPassword"
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ maxLength: "50" }}
                    size="small"
                    type={"password"}
                    value={confirmPassword || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
                <button
                  className="userUpdateButton2"
                  onClick={handleUpdatePws}
                  color="success"
                >
                  Actulizar contraseña
                </button>
              </div>
            )}
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Editar</span>
            <form onSubmit={handleSubmit} className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <TextField
                    id="cedula"
                    label="Cedula"
                    name="cedula"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={cedula}
                    disabled
                    readOnly
                  />
                </div>
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
                    disabled
                    readOnly
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="fechaRegistro"
                    label="Fecha registro"
                    name="fechaRegistro"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={moment(fechaRegistro).format("DD/MM/YYYY")}
                    disabled
                    readOnly
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
                      <MenuItem value={"masculino"}>Masculino</MenuItem>
                      <MenuItem value={"femenino"}>Femenino</MenuItem>
                      <MenuItem value={"otro"}>Otro</MenuItem>
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
                      disabled = {rol.includes("CUSTOMER_ROLE")}
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
                      <MenuItem value={"CUSTOMER_ROLE"}>Cliente</MenuItem>
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
