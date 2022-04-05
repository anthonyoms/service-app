import "./newService.css";

export default function NewService() {
  return (
    <div className="newService">
      <h1 className="addServiceTitle">Servicio Nuevo</h1>
      <form className="addServiceForm">
        <div className="addServiceItem">
          <label>Imagen</label>
          <input type="file" id="file" />
        </div>
        <div className="addServiceItem">
          <label>Nombre</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addServiceItem">
          <label>Precio</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addServiceItem">
          <label>Existencias</label>
          <input type="text" placeholder="0" />
        </div>
        <div className="addServiceItem">
          <label>Categoria</label>
          <select name="active" id="active">
            <option value="">Router</option>
            <option value="">Teléfono</option>
            <option value="">Cableado</option>
          </select>
        </div>
        <div className="addServiceItem">
          <label>Activo</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addServiceButton">Crear</button>
      </form>
    </div>
  );
}
