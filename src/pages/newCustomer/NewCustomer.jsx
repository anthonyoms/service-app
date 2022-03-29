import "./newCustomer.css";

export default function NewCustomer() {
  return (
    <div className="newCustomer">
      <h1 className="newCustomerTitle">Registro de cliente</h1>
      <form>
        <div className="newCustomerForm">
          <div className="newCustomerItem">
            <label>Cédula</label>
            <input type="text" placeholder="402-0045543-0" />
          </div>
          <div className="newCustomerItem">
            <label>Nombre de usuario</label>
            <input type="text" placeholder="john" />
          </div>
          <div className="newCustomerItem">
            <label>Nombre completo</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newCustomerItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com" />
          </div>
          <div className="newCustomerItem">
            <label>Contraseña</label>
            <input type="password" placeholder="password" />
          </div>
          <div className="newCustomerItem">
            <label>Teléfono</label>
            <input type="text" placeholder="+1 123 456 78" />
          </div>
          <div className="newCustomerItem">
            <label>Dirección</label>
            <input type="text" placeholder="New York | USA" />
          </div>
          <div className="newCustomerItem">
            <label>Genero</label>
            <div className="newCustomerGender">
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="other" value="other" />
              <label htmlFor="other">Other</label>
            </div>
          </div>
          <div className="newCustomerItem">
            <label>Estado civil</label>
            <select
              className="newCustomerSelect"
              name="documentType"
              id="documentType"
            >
              <option value="1">Casado</option>
              <option value="2">Soltero</option>
            </select>
          </div>
          <div className="newCustomerItem">
            <label>Activo</label>
            <select className="newCustomerSelect" name="active" id="active">
              <option value="yes">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <button className="newCustomerButton">Crear</button>
      </form>
    </div>
  );
}
