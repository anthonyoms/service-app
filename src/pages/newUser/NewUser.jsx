import { useState } from "react";
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

export default function NewUser() {
  const [value, setValue] = useState(moment().toDate());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registro de usuario</h1>
      <form>
        <div className="newUserForm">
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Cedula"
              name="cedula"
              variant="outlined"
              inputProps={{ maxLength: "11" }}
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Email"
              name="correo"
              variant="outlined"
              autoComplete="off"
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Nombre de usuario"
              name="usuario"
              variant="outlined"
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Nombre"
              name="nombre"
              variant="outlined"
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Contraseña"
              name="password"
              variant="outlined"
              type={"password"}
              autoComplete="off"
            />
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Teléfono"
              name="telefono"
              variant="outlined"
              inputProps={{ maxLength: "10" }}
            />
          </div>
          <div className="newUserItem">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />{" "}
            </LocalizationProvider>
          </div>
          <div className="newUserItem">
            <TextField
              id="outlined-basic"
              label="Dirección"
              name="direccionsa"
              variant="outlined"
            />
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Genero</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="genero"
                label="Genero"
              >
                <MenuItem value={"masculino"}>Masculino</MenuItem>
                <MenuItem value={"femenino"}>Femenino</MenuItem>
                <MenuItem value={"otro"}>Otro</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Estado Civil
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="estadoCivil"
                label="Estado Civil"
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="rol"
                label="Rol"
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
