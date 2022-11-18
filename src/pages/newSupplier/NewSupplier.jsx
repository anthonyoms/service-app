import { TextField } from "@mui/material";
import useForm from "../../hooks/useForm";
import { postServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";
import { dataValidation } from "../../utils/helpers/messages";
import "./newSupplier.css";

export default function NewSupplier() {
  const [
    {
      cedula_rnc,
      nombre,
      ciudad,
      pais,
      telefono,
      contacto,
      direccion,
      vendedor,
    },
    handleInputChange,
    reset,
  ] = useForm({
    cedula_rnc: "",
    nombre: "",
    ciudad: "",
    pais: "",
    telefono: "",
    contacto: "",
    direccion: "",
    vendedor: "",
  });
  const handleChangeNumber = (e) => {
    const target = handleFormatNumber(e);
    handleInputChange(target);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cedula_rnc,
      nombre,
      ciudad,
      pais,
      telefono,
      contacto,
      direccion,
      vendedor,
    };
    const dataResponse = await postServiceApp(payload, endpoints.suppliers);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      reset();
    }
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
      <form onSubmit={handleSubmit}>
        <div className="newSupplierForm">
          <div className="newSupplierItem">
            <TextField
              id="cedula_rnc"
              label="Cedula/Rnc"
              name="cedula_rnc"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "11" }}
              value={cedula_rnc}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              id="vendedor"
              label="Vendedor"
              name="vendedor"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={vendedor}
              onChange={handleInputChange}
            />
          </div>
          <div className="newSupplierItem">
            <TextField
              id="direccion"
              label="Dirección"
              name="direccion"
              variant="outlined"
              autoComplete="off"
              maxRows={5}
              inputProps={{ maxLength: "50" }}
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
