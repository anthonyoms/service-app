import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./newUser.css";
import useForm from "../../hooks/useForm";
import { postUser } from "../../services/users";

export default function NewUser() {
  const [
    { usuario, nombre, correo, password, telefono, direccion, genero, rol },
    handleInputChange,
    reset,
  ] = useForm({
    usuario: "",
    nombre: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
    genero: "",
    rol: "",
  });

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    const userData = {
      usuario,
      nombre,
      correo,
      password,
      telefono,
      direccion,
      genero,
      rol,
    };
    await postUser(userData);
    reset();
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registro de usuario</h1>
      <form onSubmit={handleSubmitChange}>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="usuario"
              value={usuario}
              onChange={handleInputChange}
              placeholder="john"
            />
          </div>
          <div className="newUserItem">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              placeholder="John Smith"
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={handleInputChange}
              placeholder="john@gmail.com"
            />
          </div>
          <div className="newUserItem">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="password"
            />
          </div>
          <div className="newUserItem">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={telefono}
              onChange={handleInputChange}
              placeholder="+1 123 456 78"
            />
          </div>
          <div className="newUserItem">
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={direccion}
              onChange={handleInputChange}
              placeholder="New York | USA"
            />
          </div>
          <div className="newUserItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Genero</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genero}
                name="genero"
                label="Genero"
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
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rol}
                name="rol"
                label="Rol"
                onChange={handleInputChange}
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
