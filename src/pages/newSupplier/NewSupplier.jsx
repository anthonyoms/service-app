import "./newSupplier.css";

export default function NewSupplier() {
  return (
    <div className="newSupplier">
      <h1 className="newSupplierTitle">Registro de suplidores</h1>
      <form>
        <div className="newSupplierForm">
          <div className="newSupplierItem">
            <label>Razón social suplidor</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newSupplierItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com" />
          </div>
          <div className="newSupplierItem">
            <label>Teléfono</label>
            <input type="text" placeholder="+1 123 456 78" />
          </div>
          <div className="newSupplierItem">
            <label>Dirección</label>
            <input type="text" placeholder="New York | USA" />
          </div>
          <div className="newSupplierItem">
            <label>Activo</label>
            <select className="newSupplierSelect" name="active" id="active">
              <option value="yes">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <button className="newSupplierButton">Crear</button>
      </form>
    </div>
  );
}
