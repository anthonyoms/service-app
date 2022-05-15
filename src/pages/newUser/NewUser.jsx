import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./newUser.css";
import { TextField } from "@mui/material";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registro de usuario</h1>
      <form>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Cedula</label>
            <input type="text" name="cedula" placeholder="402-0045543-0" />
          </div>
          <div className="newUserItem">
            <label>Nombre de usuario</label>
            <input type="text" name="usuario" placeholder="john" />
          </div>
          <div className="newUserItem">
            <label>Nombre completo</label>
            <input type="text" name="nombre" placeholder="John Smith" />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input type="email" name="correo" placeholder="john@gmail.com" />
          </div>
          <div className="newUserItem">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="password" />
          </div>
          <div className="newUserItem">
            <label>Teléfono</label>
            <input type="text" name="telefono" placeholder="+1 123 456 78" />
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
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="rol"
                label="Rol"
              >
                <MenuItem value={"ADMIN_ROLE"}>Administrador</MenuItem>
                <MenuItem value={"USER_ROLE"}>User</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
