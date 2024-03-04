import { useEffect, useState } from "react";
import "./newService.css";
import useForm from "../../hooks/useForm";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function NewService() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [
    {
      nombre,
      estado,
      codigo,
      precio_venta,
      precio_instalacion,
      periodoFacturacion,
      categoria,
      descripcion,
      disponible,
    },
    handleInputChange,
    reset,
  ] = useForm({
    nombre: "",
    estado: true,
    codigo: null,
    precio_venta: 0,
    precio_instalacion: 0,
    periodoFacturacion: "Mensual",
    categoria: 0,
    descripcion: "",
    disponible: true,
  });

  if (!codigo) {
    getServiceApp(endpoints.services).then((dataResponse) => {
      const validData = dataValidation(dataResponse, false);
      if (validData.ok) {
        const target = {
          target: { name: "codigo", value: dataResponse.total + 1 },
        };
        handleInputChange(target);
      }
    });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const dataResponse = await getServiceApp(endpoints.categories);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setCategories(validData.categorias);
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nombre,
      estado,
      codigo,
      precio_venta,
      precio_instalacion,
      periodoFacturacion,
      categoria,
      descripcion,
      disponible,
    };

    const isSaveService = await postServiceApp(payload, endpoints.services);
    setLoading(false);
    const validData = dataValidation(isSaveService);
    if (validData.ok) {
      reset();
    }
  };
  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="newService">
        <h1 className="addServiceTitle">Servicio Nuevo</h1>
        <form onSubmit={handleSubmit} className="addServiceForm">
          <div className="addServiceItem">
            <TextField
              id="codigo"
              label="Codigo"
              name="codigo"
              variant="outlined"
              autoComplete="off"
              readOnly
              value={codigo || ""}
            />
          </div>
          <div className="addServiceItem">
            <TextField
              id="nombre"
              label="Nombre"
              name="nombre"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="addServiceItem">
            <TextField
              id="descripcion"
              label="Descripción"
              name="descripcion"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="addServiceItem">
            <NumericFormat
              name="precio_venta"
              customInput={TextField}
              label="Precio Venta"
              autoComplete="off"
              value={precio_venta}
              inputProps={{ maxLength: "12" }}
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              onValueChange={({ value }) =>
                handleInputChange({
                  target: { name: "precio_venta", value },
                })
              }
            />
          </div>
          <div className="addServiceItem">
            <NumericFormat
              name="precio_instalacion"
              customInput={TextField}
              label="Precio Instalación"
              autoComplete="off"
              value={precio_instalacion}
              inputProps={{ maxLength: "12" }}
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              onValueChange={({ value }) =>
                handleInputChange({
                  target: { name: "precio_instalacion", value },
                })
              }
            />
          </div>
          <div className="addServiceItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-facturacion">
                Periodo de Facturación
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-facturacion"
                id="demo-simple-select-facturacion"
                name="facturacion"
                label="Periodo de Facturación"
                value={periodoFacturacion}
                onChange={handleInputChange}
              >
                <MenuItem value={"Mensual"}>Mensual</MenuItem>
                <MenuItem value={"Anual"}>Anual</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="addServiceItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-categoria">
                Categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-categoria"
                id="demo-simple-select-categoria"
                name="categoria"
                label="Categoría"
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
          </div>
          <button className="addServiceButton">Crear</button>
        </form>
      </div>
    </>
  );
}
