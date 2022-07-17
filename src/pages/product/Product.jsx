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
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/Loading";
import {
  getServiceApp,
  updateServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation, swalLoading } from "../../utils/helpers/messages";

export default function Product() {
  const [{ product, loading }, setProducts] = useState({
    product: null,
    loading: true,
  });
  const [categories, setCategories] = useState([]);
  const [productsValues, handleInputChange, reset] = useForm({
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
  } = productsValues;
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const id = window.location.pathname.split("/")[2];
    const [{ categorias }, { producto }] = await Promise.all([
      getServiceApp(endpoints.categories),
      getServiceApp(`${endpoints.products}/${id}`),
    ]);
    setCategories(categorias);
    setProducts({ product: producto, loading: false });
  };
  const getPrecioVentas = () => {
    const precio = precio_compra || product.precio_compra;
    const utilidadActual = utilidad || product.utilidad;
    return ((utilidadActual / 100) * precio + +precio).toFixed(2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img: img || product.img,
      nombre: nombre || product.nombre,
      estado: estado,
      disponible: disponible,
      precio_compra: precio_compra || product.precio,
      utilidad: utilidad || product.utilidad,
      precio_venta: getPrecioVentas(),
      categoria: categoria || product?.categoria?.uid,
      descripcion: descripcion || product.descripcion,
    };
    swalLoading();
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.products,
      product.uid
    );
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      reset();
      loadProducts();
    }
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
  const textFieldValidation = (e, regex) => {
    // if value is not blank, then test the regex

    if (e.target.value === "" || regex.test(e.target.value)) {
      handleInputChange(e);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
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
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.nombre}</span>
          </div>
          <div className="productInfoBottom">
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
              <span className="productInfoValue">{product?.precio_compra}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Precio venta:&nbsp;</span>
              <span className="productInfoValue">{product?.precio_venta}</span>
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
            <TextField
              id="precio_compra"
              label="Precio compra"
              name="precio_compra"
              variant="outlined"
              autoComplete="off"
              sx={{ m: 1 }}
              size="small"
              value={precio_compra}
              onChange={(e) => textFieldValidation(e, /^[0-9,.\b]+$/)}
            />
            <TextField
              id="utilidad"
              label="Utilidad %"
              name="utilidad"
              variant="outlined"
              autoComplete="off"
              sx={{ m: 1 }}
              size="small"
              value={utilidad}
              onChange={(e) => textFieldValidation(e, /^[0-9,.\b]+$/)}
            />
            <TextField
              id="precio_ventas"
              label="Precio ventas"
              name="precio_ventas"
              variant="outlined"
              autoComplete="off"
              sx={{ m: 1 }}
              size="small"
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
              <img src={product.img} alt="" className="productUploadImg" />
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
  );
}
