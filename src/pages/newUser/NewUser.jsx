import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Registro de usuario</h1>
      <form>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Nombre de usuario</label>
            <input type="text" placeholder="john" />
          </div>
          <div className="newUserItem">
            <label>Nombre completo</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com" />
          </div>
          <div className="newUserItem">
            <label>Contraseña</label>
            <input type="password" placeholder="password" />
          </div>
          <div className="newUserItem">
            <label>Teléfono</label>
            <input type="text" placeholder="+1 123 456 78" />
          </div>
          <div className="newUserItem">
            <label>Dirección</label>
            <input type="text" placeholder="New York | USA" />
          </div>
          <div className="newUserItem">
            <label>Genero</label>
            <div className="newUserGender">
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="other" value="other" />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          <div className="newUserItem">
            <label>Activo</label>
            <select className="newUserSelect" name="active" id="active">
              <option value="yes">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <button className="newUserButton">Crear</button>
      </form>
    </div>
  );
}
