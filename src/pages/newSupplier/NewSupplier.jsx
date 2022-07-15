import { TextField } from "@mui/material";
import useForm from "../../hooks/useForm";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";
import "./newSupplier.css";

export default function NewSupplier() {
  const [
    { cedula, nombre, ciudad, pais, telefono, contacto, direccion },
    handleInputChange,
    reset,
  ] = useForm({
    cedula: "",
    nombre: "",
    ciudad: "",
    pais: "",
    telefono: "",
    contacto: "",
    direccion: "",
  });
  const handleChangeNumber = (e) => {
    const target = handleFormatNumber(e);
    handleInputChange(target);
  };
  const textFieldValidation = (e, regex) => {
    // if value is not blank, then test the regex

    if (e.target.value === "" || regex.test(e.target.value)) {
      handleInputChange(e);
    }
  };
  return (
    <div className="newSupplier">
      <h1 className="newSupplierTitle">Registro de suplidores</h1>
      <form>
        <div className="newSupplierForm">
          <div className="newSupplierItem">
            <TextField
              id="cedula"
              label="Cedula/Rnc"
              name="cedula"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "11" }}
              value={cedula}
              onChange={(e) => textFieldValidation(e, /^[0-9\b]+$/)}
            />
          </div>
          <div className="newSupplierItem">
            <TextField
              id="nombre"
              label="Nombre razón social"
              name="nombre"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={nombre}
              onChange={(e) => textFieldValidation(e, /^[a-zA-Z ]*$/)}
            />
          </div>
          <div className="newSupplierItem">
            <TextField
              id="ciudad"
              label="Ciudad"
              name="ciudad"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={ciudad}
              onChange={(e) => textFieldValidation(e, /^[a-zA-Z ]*$/)}
            />
          </div>
          <div className="newSupplierItem">
            <TextField
              id="pais"
              label="País"
              name="pais"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={pais}
              onChange={(e) => textFieldValidation(e, /^[a-zA-Z ]*$/)}
            />
          </div>
          <div className="newSupplierItem">
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
          <div className="newSupplierItem">
            <TextField
              id="contacto"
              label="Contacto"
              name="contacto"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={contacto}
              onChange={handleInputChange}
            />
          </div>
          <div className="newSupplierItem">
            <TextField
              id="direccion"
              label="Dirección"
              name="direccion"
              variant="outlined"
              multiline
              rows={5}
              autoComplete="off"
              inputProps={{ maxLength: "100" }}
              value={direccion}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="newSupplierButton">Crear</button>
      </form>
    </div>
  );
}
