import { Link } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import "./product.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getServiceApp,
  updateServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { NumericFormat } from "react-number-format";
import { formatter } from "../../utils/constants/formatNumber";

export default function Product() {
  const [{ product, loading }, setProducts] = useState({
    product: null,
    loading: true,
  });
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    img: "",
    nombre: "",
    estado: true,
    precio_compra: 0,
    categoria: "",
    descripcion: "",
    disponible: true,
    utilidad: 0,
  });

  const {
    img,
    nombre,
    estado,
    precio_compra,
    categoria,
    disponible,
    descripcion,
    utilidad,
  } = formValues;
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const id = getIdUrl();
    const [{ categorias }, { producto, ...data }] = await Promise.all([
      getServiceApp(endpoints.categories),
      getServiceApp(`${endpoints.products}/${id}`),
    ]);
    if (!data.ok) {
      dataValidation(data);
      setProducts({ loading: false });
      return;
    }
    setCategories(categorias);
    setFormValues({ ...producto, categoria: producto?.categoria._id });
    setProducts({ product: producto, loading: false });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const getPrecioVentas = () => {
    const precio = precio_compra || product.precio_compra;
    const utilidadActual = utilidad || product.utilidad;
    return ((utilidadActual / 100) * precio + +precio).toFixed(2);
  };
  const handleSubmit = async (e) => {
    setProducts((prevState) => ({ ...prevState, loading: true }));
    e.preventDefault();
    const payload = {
      img,
      nombre,
      estado,
      disponible,
      precio_compra,
      utilidad,
      precio_venta: getPrecioVentas(),
      categoria,
      descripcion,
    };

    const dataResponse = await updateServiceApp(
      payload,
      endpoints.products,
      product.uid
    );
    const validData = dataValidation(dataResponse);
    if (!validData.ok) {
      setProducts((prevState) => ({ ...prevState, loading: false }));
      return;
    }
    loadProducts();
  };
  const handleUploadImage = async (e) => {
    setProducts((product) => {
      return { ...product, loading: true };
    });
    const data = await uploadFileServiceApp(
      e.target.files[0],
      endpoints.products,
      product.uid
    );
    const validData = dataValidation(data);
    if (validData.ok) {
      loadProducts();
    } else {
      setProducts((user) => {
        return { ...user, loading: false };
      });
    }
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Actualización de productos</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Crear</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product?.img || ""} alt="" className="productInfoImg" />
              <span className="productName">{product?.nombre}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">Codigo:&nbsp;</span>
                <span className="productInfoValue">{product?.codigo}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Codigo de barras:&nbsp;</span>
                <span className="productInfoValue">
                  {product?.codigoBarras}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Cantidad:&nbsp;</span>
                <span className="productInfoValue">{product?.cantidad}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Descripcion:&nbsp;</span>
                <span className="productInfoValue">{product?.descripcion}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Utilidad %:&nbsp;</span>
                <span className="productInfoValue">{product?.utilidad}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Precio compra:&nbsp;</span>
                <span className="productInfoValue">
                  {formatter.format(product?.precio_compra)}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Precio venta:&nbsp;</span>
                <span className="productInfoValue">
                  {formatter.format(product?.precio_venta)}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Categoria:&nbsp;</span>
                <span className="productInfoValue">
                  {product?.categoria?.nombre}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Disponible:&nbsp;</span>
                <span className="productInfoValue">
                  {" "}
                  {product?.disponible ? "Si" : "No"}
                </span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Estado:&nbsp;</span>
                <span className="productInfoValue">
                  {" "}
                  {product?.estado ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>
          <div className="productTopLeft"></div>
        </div>
        <div className="productBottom">
          <form onSubmit={handleSubmit} className="productForm">
            <div className="productFormLeft">
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
                name="precio_compra"
                customInput={TextField}
                label="Precio compra"
                autoComplete="off"
                value={product?.precio_compra}
                inputProps={{ maxLength: "12" }}
                sx={{ m: 1 }}
                size="small"
                prefix={"$"}
                type="text"
                thousandSeparator={true}
                onValueChange={({ value }) =>
                  handleInputChange({
                    target: { name: "precio_compra", value },
                  })
                }
              />
              <NumericFormat
                name="utilidad"
                customInput={TextField}
                label="Utilidad %"
                autoComplete="off"
                value={product?.utilidad}
                inputProps={{ maxLength: "3" }}
                sx={{ m: 1 }}
                size="small"
                type="text"
                thousandSeparator={true}
                onValueChange={({ value }) =>
                  handleInputChange({
                    target: { name: "utilidad", value },
                  })
                }
              />
              <NumericFormat
                name="precio_venta"
                customInput={TextField}
                label="Precio venta"
                autoComplete="off"
                defaultValue={0}
                inputProps={{ maxLength: "12" }}
                size="small"
                prefix={"$"}
                sx={{ m: 1 }}
                type="text"
                thousandSeparator={true}
                value={(
                  (utilidad / 100) * precio_compra +
                  +precio_compra
                ).toFixed(2)}
              />
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
            <div className="productFormRight">
              <div className="productUpload">
                <img
                  src={product?.img || ""}
                  alt=""
                  className="productUploadImg"
                />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input
                  type="file"
                  onChange={handleUploadImage}
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button className="productButton">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
