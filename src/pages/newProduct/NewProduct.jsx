import { NumericFormat } from "react-number-format";
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
import { MyBackdrop } from "../../components/ui/Backdrop";

export default function NewProduct() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

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
      codigo,
      codigoBarras,
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
    codigo: "",
    codigoBarras: "",
  });

  if (!codigo) {
    getServiceApp(endpoints.products).then((dataResponse) => {
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
      codigo,
      codigoBarras,
    };
    const isSaveProduct = await saveWithImage(
      payload,
      image,
      endpoints.products
    );
    setLoading(false);
    if (isSaveProduct?.ok) {
      reset();
    }
  };
  return (
    <>
      <MyBackdrop loading={loading} />
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
              id="codigo"
              label="Codigo"
              name="codigo"
              variant="outlined"
              autoComplete="off"
              size="small"
              readOnly
              value={codigo}
            />
          </div>
          <div className="addProductItem">
            <TextField
              id="codigoBarras"
              label="Codigo de barras"
              name="codigoBarras"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: "15" }}
              size="small"
              value={codigoBarras}
              onChange={handleInputChange}
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
            <NumericFormat
              name="precio_compra"
              customInput={TextField}
              label="Precio compra"
              autoComplete="off"
              defaultValue={0}
              inputProps={{ maxLength: "12" }}
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              onValueChange={({ value }) =>
                handleInputChange({
                  target: { name: "precio_compra", value },
                })
              }
            />
          </div>
          <div className="addProductItem">
            <NumericFormat
              name="utilidad"
              customInput={TextField}
              label="Utilidad %"
              autoComplete="off"
              defaultValue={0}
              inputProps={{ maxLength: "3" }}
              type="text"
              thousandSeparator={true}
              onValueChange={({ value }) =>
                handleInputChange({
                  target: { name: "utilidad", value },
                })
              }
            />
          </div>
          <div className="addProductItem">
            <NumericFormat
              name="precio_venta"
              customInput={TextField}
              label="Precio venta"
              autoComplete="off"
              defaultValue={0}
              inputProps={{ maxLength: "12" }}
              prefix={"$"}
              type="text"
              thousandSeparator={true}
              value={(
                (utilidad / 100) * precio_compra +
                +precio_compra
              ).toFixed(2)}
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
    </>
  );
}
