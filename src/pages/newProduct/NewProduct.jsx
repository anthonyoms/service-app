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
    { img, nombre, estado, precio, categoria, disponible, descripcion },
    handleInputChange,
    reset,
  ] = useForm({
    img: "",
    nombre: "",
    estado: true,
    precio: "",
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
      precio,
      categoria,
      disponible,
      descripcion,
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
            id="precio"
            label="Precio"
            name="precio"
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: "12" }}
            value={precio}
            onChange={(e) => textFieldValidation(e, /^[0-9\b]+$/)}
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
        <div className="addProductItem">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-disponible">
              Disponible
            </InputLabel>
            <Select
              labelId="demo-simple-select-label-disponible"
              id="demo-simple-select-disponible"
              name="disponible"
              label="Disponible"
              value={disponible}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Si</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="addProductItem">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-estado">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label-estado"
              id="demo-simple-select-estado"
              name="estado"
              label="Estado"
              value={estado}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Si</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button className="addProductButton">Crear</button>
      </form>
    </div>
  );
}
