import { Link } from "react-router-dom";
import {  Save } from "@material-ui/icons";
import "./service.css";
import WidgetProductDetail from "../../components/widgetProductDetail/WidgetProductDetail";
import { useEffect, useState } from "react";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { formatter } from "../../utils/constants/formatNumber";
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { NumericFormat } from "react-number-format";
export default function Service() {
  const [{ service, loading }, setService] = useState({
    service: null,
    loading: true,
  });
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    periodoFacturacion: "",
    precio_instalacion: "",
    precio_venta: "",
    estado: "",
    disponible: "",
    categoria: "",
  });
  const {
    nombre,
    descripcion,
    periodoFacturacion,
    precio_instalacion,
    precio_venta,
    estado,
    disponible,
    categoria,
  } = formValues;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadService();
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const loadService = async () => {
    const id = getIdUrl();
    const [{ categorias }, { servicio, ...data }] = await Promise.all([
      getServiceApp(endpoints.categories),
      getServiceApp(`${endpoints.services}/${id}`),
    ]);
    if (!data.ok) {
      dataValidation(data);
      setService({ loading: false });
      return;
    }
    setCategories(categorias);
    setFormValues({ ...servicio, categoria: servicio?.categoria._id });
    setService({ service: servicio, loading: false });
  };

  const handleSubmit = async (e) => {
    setService((prevState) => ({ ...prevState, loading: true }));
    e.preventDefault();
    const payload = {
      nombre,
      estado,
      precio_venta,
      precio_instalacion,
      periodoFacturacion,
      descripcion,
      disponible,
      categoria,
    };

    const dataResponse = await updateServiceApp(
      payload,
      endpoints.services,
      service.uid
    );
    const validData = dataValidation(dataResponse);
    if (!validData.ok) {
      setService((prevState) => ({ ...prevState, loading: false }));
      return;
    }
    loadService();
  };

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: "5em",
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="service">
        <div className="serviceTitleContainer">
          <h1 className="serviceTitle">Servicios</h1>
          <Link to="/newservice">
            <button className="serviceAddButton">Crear</button>
          </Link>
        </div>
        <WidgetProductDetail
          showImage={false}
          name={service?.nombre}
          data={{
            id: service?.uid,
            Codigo: service?.codigo,
            Nombre: service?.nombre,
            "Precio Venta": formatter.format(service?.precio_venta),
            "Precio de instalación": formatter.format(
              service?.precio_instalacion
            ),
            "Tipo de facturación": service?.periodoFacturacion,
            Descripción: service?.descripcion,
            Categoria: service?.categoria?.nombre,
            Disponible: service?.disponible ? "Si" : "No",
            Estado: service?.estado ? "Activo" : "Inactivo",
          }}
        />
        <div className="serviceBottom">
          <form onSubmit={handleSubmit} className="serviceForm">
            <div className="serviceFormLeft">
              <TextField
                id="nombre"
                label="Nombre"
                name="nombre"
                variant="outlined"
                autoComplete="off"
                inputProps={{ maxLength: "50" }}
                sx={{ m: 1 }}
                size="small"
                value={nombre}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-multiline-flexible"
                name="descripcion"
                label="Descripción"
                multiline
                inputProps={{ maxLength: "50" }}
                rows={5}
                sx={{ m: 1 }}
                autoComplete="off"
                size="small"
                value={descripcion}
                onChange={handleInputChange}
              />
              <NumericFormat
                name="precio_instalacion"
                customInput={TextField}
                label="Precio de instalación"
                autoComplete="off"
                value={service?.precio_instalacion}
                inputProps={{ maxLength: "12" }}
                sx={{ m: 1 }}
                size="small"
                prefix={"$"}
                type="text"
                thousandSeparator={true}
                onValueChange={({ value }) =>
                  handleInputChange({
                    target: { name: "precio_instalacion", value },
                  })
                }
              />
              <NumericFormat
                name="precio_venta"
                customInput={TextField}
                label="Precio de venta"
                autoComplete="off"
                value={service?.precio_venta}
                inputProps={{ maxLength: "12" }}
                sx={{ m: 1 }}
                size="small"
                prefix={"$"}
                type="text"
                thousandSeparator={true}
                onValueChange={({ value }) =>
                  handleInputChange({
                    target: { name: "precio_venta", value },
                  })
                }
              />
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-label-facturacion">
                  Periodo de Facturación
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-facturacion"
                  id="demo-simple-select-facturacion"
                  name="periodoFacturacion"
                  label="Periodo de Facturación"
                  value={periodoFacturacion}
                  onChange={handleInputChange}
                >
                  <MenuItem value={"Mensual"}>Mensual</MenuItem>
                  <MenuItem value={"Anual"}>Anual</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-categoria">
                  Categoría
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-categoria"
                  id="demo-simple-select-categoria"
                  name="categoria"
                  label="Categoría"
                  sx={{ m: 1 }}
                  size="small"
                  value={categoria}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category?.uid} value={category?.uid}>
                        {category?.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-disponible">
                  Disponible
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-disponible"
                  id="demo-simple-select-disponible"
                  name="disponible"
                  label="Disponible"
                  sx={{ m: 1 }}
                  size="small"
                  value={disponible}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-estado">
                  Activo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-estado"
                  id="demo-simple-select-estado"
                  name="estado"
                  label="Estado"
                  sx={{ m: 1 }}
                  size="small"
                  value={estado}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Fab
              type="submit"
              style={fabStyle}
              color="success"
              aria-label="add"
            >
              <Save />
            </Fab>
          </form>
        </div>
      </div>
    </>
  );
}
