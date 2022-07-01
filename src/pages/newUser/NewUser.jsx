import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./newUser.css";
import { TextField } from "@mui/material";
import useForm from "../../hooks/useForm";
import { createUsername } from "../../utils/helpers/createUsername";
import { post } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { errorMsg, successMsg } from "../../utils/helpers/messages";

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
  });

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
    };
    const response = await post(endpoints.users, payload);
    if (response.ok) {
      successMsg(response.msg);
      reset();
    } else {
      errorMsg(response);
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
              label="Cedula"
              name="cedula"
              variant="outlined"
              inputProps={{ maxLength: "11" }}
              value={cedula}
              onChange={handleInputChange}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="correo"
              label="Email"
              name="correo"
              variant="outlined"
              autoComplete="off"
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
              value={nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="password"
              label="Contraseña"
              name="password"
              variant="outlined"
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
              inputProps={{ maxLength: "10" }}
              value={telefono}
              onChange={handleInputChange}
            />
          </div>
          <div className="newUserItem">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="dd/MM/yyyy"
                value={fechaNacimiento}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="newUserItem">
            <TextField
              id="direccion"
              label="Dirección"
              name="direccion"
              variant="outlined"
              value={direccion}
              onChange={handleInputChange}
            />
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
                <MenuItem value={"casado"}>Casado</MenuItem>
                <MenuItem value={"soltero"}>Soltero</MenuItem>
                <MenuItem value={"viudo"}>Viudo</MenuItem>
                <MenuItem value={"divorciado"}>Divorciado</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value={"CUSTOMER_ROLE"}>Cliente</MenuItem>
                <MenuItem value={"CAJERO"}>Cejero</MenuItem>
                <MenuItem value={"TECNICO"}>Tecnico</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
