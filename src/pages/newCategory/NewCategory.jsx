import "./newCategory.css";

export default function NewCategory() {
  return (
    <div className="newCategory">
      <h1 className="addCategoryTitle">Nueva categoria</h1>
      <form className="addCategoryForm">
        <div className="addCategoryItem">
          <label>Imagen</label>
          <input type="file" id="file" />
        </div>
        <div className="addCategoryItem">
          <label>Nombre</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addCategoryItem">
          <label>Descripción</label>
          <textarea id="w3review" name="w3review" rows="4" cols="50" />
        </div>
        <div className="addCategoryItem">
          <label>Activo</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addCategoryButton">Crear</button>
      </form>
    </div>
  );
}
