import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { getServiceApp, saveWithImage } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import "./newProduct.css";

export default function NewProduct() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const [
    {
      img,
      nombre,
      estado,
      categoria,
      disponible,
      descripcion,
      precio_compra,
      utilidad,
    },
    handleInputChange,
    reset,
  ] = useForm({
    img: "",
    nombre: "",
    estado: true,
    precio_compra: 0,
    utilidad: 0,
    categoria: "",
    descripcion: "",
    disponible: true,
  });
  const loadCategories = async () => {
    const dataResponse = await getServiceApp(endpoints.categories);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setCategories(validData.categorias);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img,
      nombre,
      estado,
      categoria,
      disponible,
      descripcion,
      precio_venta: ((utilidad / 100) * precio_compra + +precio_compra).toFixed(
        2
      ),
      precio_compra,
      utilidad,
    };
    const isSaveProduct = await saveWithImage(
      payload,
      image,
      endpoints.products
    );
    if (isSaveProduct.ok) {
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
    <div className="newProduct">
      <h1 className="addProductTitle">Producto Nuevo</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        <div className="addProductItem">
          <InputLabel htmlFor="img">Imagen del producto</InputLabel>
          <TextField
            id="img"
            name="img"
            variant="outlined"
            type="file"
            autoComplete="off"
            value={img}
            onChange={(e) => {
              handleInputChange(e);
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="addProductItem">
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
        <div className="addProductItem">
          <TextField
            id="outlined-multiline-flexible"
            name="descripcion"
            label="Descripción"
            multiline
            inputProps={{ maxLength: "50" }}
            rows={5}
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="addProductItem">
          <TextField
            id="precio_venta"
            label="Precio compra"
            name="precio_compra"
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: "12" }}
            size="small"
            value={precio_compra}
            onChange={(e) => textFieldValidation(e, /^[0-9,.\b]+$/)}
          />
        </div>
        <div className="addProductItem">
          <TextField
            id="utilidad"
            label="Utilidad %"
            name="utilidad"
            variant="outlined"
            autoComplete="off"
            size="small"
            inputProps={{ maxLength: "12" }}
            value={utilidad}
            onChange={(e) => textFieldValidation(e, /^[0-9,.\b]+$/)}
          />
        </div>
        <div className="addProductItem">
          <TextField
            id="precio_venta"
            label="Precio venta"
            name="precio_venta"
            variant="outlined"
            autoComplete="off"
            size="small"
            inputProps={{ maxLength: "12", readOnly: true }}
            value={((utilidad / 100) * precio_compra + +precio_compra).toFixed(
              2
            )}
          />
        </div>
        <div className="addProductItem">
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
        <button className="addProductButton">Crear</button>
      </form>
    </div>
  );
}
