import {
  AssignmentIndOutlined,
  LocationSearching,
  MailOutline,
  ContactsOutlined,
  PhoneAndroid,
  Public,
  LocationOnOutlined,
} from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";
import { dataValidation } from "../../utils/helpers/messages";
import "./supplier.css";

export default function Supplier() {
  const [{ supplier, loading }, setSupplier] = useState({
    supplier: null,
    loading: true,
  });
  const [formValues, setFormValues] = useState({
    cedula_rnc: "",
    nombre: "",
    direccion: "",
    telefono: "",
    contacto: "",
    ciudad: "",
    pais: "",
    estado: true,
    vendedor: "",
  });
  const {
    nombre,
    direccion,
    telefono,
    contacto,
    ciudad,
    pais,
    estado,
    vendedor,
    cedula_rnc,
  } = formValues;

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    const id = window.location.pathname.split("/")[2];
    const dataResponse = await getServiceApp(`${endpoints.suppliers}/${id}`);
    const validData = dataValidation(dataResponse, false);
    if (!validData.ok) {
      setSupplier({ loading: false });
      return; 
    }
    setFormValues(validData.suplidor);
    setSupplier({ supplier: validData.suplidor, loading: false });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre,
      direccion,
      telefono,
      contacto,
      ciudad,
      pais,
      estado,
      vendedor,
    };
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.suppliers,
      supplier.uid
    );
    const validData = await dataValidation(dataResponse);
    if (validData.ok) {
      loadSupplier();
    }
  };

  const handleChangeNumber = (e) => {
    const target = handleFormatNumber(e);
    handleInputChange(target);
  };
  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="supplier">
        <div className="supplierTitleContainer">
          <h1 className="supplierTitle">Actualización de suplidor</h1>
        </div>
        <div className="supplierContainer">
          <div className="supplierShow">
            <div className="supplierShowTop">
              <div className="supplierShowTopTitle">
                <span className="supplierShowsuppliername">
                  {supplier?.nombre}
                </span>
                <span
                  className={
                    supplier?.estado ? "supplierActive" : "supplierDisabled"
                  }
                >
                  {supplier?.estado ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
            <div className="supplierShowBottom">
              <span className="supplierShowTitle">Detalles de la cuenta</span>
              <div className="supplierShowInfo">
                <ContactsOutlined className="supplierShowIcon" />

                <span className="supplierShowInfoTitle">
                  {supplier?.vendedor || "Sin vendedor registrado"}
                </span>
              </div>
              <div className="supplierShowInfo">
                <AssignmentIndOutlined className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">
                  {supplier?.cedula_rnc}
                </span>
              </div>
              <span className="supplierShowTitle">Detalles de contacto</span>
              <div className="supplierShowInfo">
                <PhoneAndroid className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">
                  {supplier?.telefono}
                </span>
              </div>
              <div className="supplierShowInfo">
                <MailOutline className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">
                  {supplier?.contacto}
                </span>
              </div>
              <div className="supplierShowInfo">
                <Public className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">{supplier?.pais}</span>
              </div>
              <div className="supplierShowInfo">
                <LocationOnOutlined className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">
                  {supplier?.ciudad}
                </span>
              </div>
              <div className="supplierShowInfo">
                <LocationSearching className="supplierShowIcon" />
                <span className="supplierShowInfoTitle">
                  {supplier?.direccion}
                </span>
              </div>
            </div>
          </div>
          <div className="supplierUpdate">
            <span className="supplierUpdateTitle">Editar</span>
            <form onSubmit={handleSubmit} className="supplierUpdateForm">
              <div className="supplierUpdateLeft">
                <div className="supplierUpdateItem">
                  <TextField
                    id="cedula_rnc"
                    label="Cedula/Rnc"
                    name="cedula_rnc"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "11" }}
                    value={cedula_rnc}
                    onChange={handleInputChange}
                    readOnly
                    disabled
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="telefono"
                    label="Teléfono"
                    name="telefono"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "10" }}
                    value={telefono}
                    onChange={handleChangeNumber}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="contacto"
                    label="Contacto"
                    name="contacto"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={contacto}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="direccion"
                    label="Dirección"
                    name="direccion"
                    variant="outlined"
                    autoComplete="off"
                    multiline
                    rows={5}
                    size="small"
                    inputProps={{ maxLength: "100" }}
                    value={direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="vendedor"
                    label="Vendedor"
                    name="vendedor"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={vendedor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="ciudad"
                    label="Ciudad"
                    name="ciudad"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={ciudad}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <TextField
                    id="pais"
                    label="País"
                    name="pais"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    value={pais}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplierUpdateItem">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-estado">
                      Activo
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-estado"
                      id="demo-simple-select-estado"
                      name="estado"
                      label="Estado"
                      size="small"
                      value={estado}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={true}>Si</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="supplierUpdateRight">
                <button className="supplierUpdateButton">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
