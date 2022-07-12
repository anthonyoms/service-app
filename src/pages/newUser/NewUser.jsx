import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import "./newUser.css";
import useForm from "../../hooks/useForm";
import { createUsername } from "../../utils/helpers/createUsername";
import { endpoints } from "../../utils/constants/endpoints";
import {
  postServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { useState } from "react";

export default function NewUser() {
  const [
    {
      cedula,
      correo,
      usuario,
      nombre,
      password,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estadoCivil,
      rol,
      img,
    },
    handleInputChange,
    reset,
  ] = useForm({
    cedula: "",
    correo: "",
    usuario: "",
    nombre: "",
    password: "",
    telefono: "",
    fechaNacimiento: moment().toDate(),
    direccion: "",
    genero: "",
    estadoCivil: "",
    rol: "",
    img: "",
  });

  const [userImage, setUserImage] = useState(null);

  const handleChangeDate = (newValue) => {
    handleInputChange({ target: { name: "fechaNacimiento", value: newValue } });
  };
  const getUsername = (e) => {
    const username = createUsername(e);
    if (!!username) {
      handleInputChange(username);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cedula,
      correo: correo.toLowerCase(),
      usuario,
      nombre,
      password,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estadoCivil,
      rol,
    };
    const dataResponse = await postServiceApp(payload, endpoints.users);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      const data = await uploadFileServiceApp(
        userImage,
        endpoints.users,
        validData.usuario.uid
      );
      dataValidation(data, false);
      reset();
    }
  };
  const textFieldValidation = (e, regex) => {
    // if value is not blank, then test the regex

    if (e.target.value === "" || regex.test(e.target.value)) {
      handleInputChange(e);
    }
  };
  const handleChangeNumber = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 10) {
      handleInputChange({ target: { name: e.target.name, value: onlyNums } });
    } else if (onlyNums.length === 10) {
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      handleInputChange({ target: { name: e.target.name, value: number } });
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registro de usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="newUserForm">
          <div className="newUserItem">
            <TextField
              id="cedula"
              label="Cedula*"
              name="cedula"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "11" }}
              value={cedula}
              onChange={(e) => textFieldValidation(e, /^[0-9\b]+$/)}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="correo"
              label="Email"
              name="correo"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={correo}
              onChange={handleInputChange}
              onBlur={getUsername}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="usuario"
              label="Nombre de usuario"
              name="usuario"
              variant="outlined"
              autoComplete="off"
              value={usuario}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="nombre"
              label="Nombre"
              name="nombre"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={nombre}
              onChange={(e) => textFieldValidation(e, /^[a-zA-Z ]*$/)}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="password"
              label="Contraseña"
              name="password"
              variant="outlined"
              inputProps={{ maxLength: "50" }}
              type={"password"}
              autoComplete="off"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="telefono"
              label="Teléfono"
              name="telefono"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "10" }}
              value={telefono}
              onChange={handleChangeNumber}
            />
          </div>
          <div className="newUserItem">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="dd/MM/yyyy"
                value={fechaNacimiento}
                onChange={handleChangeDate}
                renderInput={(params) => (
                  <TextField autoComplete="off" {...params} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label-rol"
                id="demo-simple-select-rol"
                name="rol"
                label="Rol"
                value={rol}
                onChange={handleInputChange}
              >
                <MenuItem value={"ADMIN_ROLE"}>Administrador</MenuItem>
                <MenuItem value={"TECNICO_MESA"}>
                  Técnico mesa de ayuda
                </MenuItem>
                <MenuItem value={"CAJERO"}>Cajero</MenuItem>
                <MenuItem value={"TECNICO"}>Tecnico</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-genero">
                Genero
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-genero"
                id="demo-simple-select-genero"
                name="genero"
                label="Genero"
                value={genero}
                onChange={handleInputChange}
              >
                <MenuItem value={"masculino"}>Masculino</MenuItem>
                <MenuItem value={"femenino"}>Femenino</MenuItem>
                <MenuItem value={"otro"}>Otro</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-estadoCivil">
                Estado Civil
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-estadoCivil"
                id="demo-simple-select-estadoCivil"
                name="estadoCivil"
                label="Estado Civil"
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
          <div className="newUserItem2">
            <TextField
              id="direccion"
              label="Dirección"
              name="direccion"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "100" }}
              value={direccion}
              onChange={handleInputChange}
            />
          </div>
          <div className="newUserItem2">
            <InputLabel htmlFor="img">Imagen de usuario</InputLabel>
            <TextField
              id="img"
              name="img"
              variant="outlined"
              type="file"
              value={img}
              onChange={(e) => {
                handleInputChange(e);
                setUserImage(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
