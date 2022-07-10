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
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";

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
    precio: "",
    categoria: "",
    descripcion: "",
    disponible: true,
  });

  const { img, nombre, estado, precio, categoria, disponible, descripcion } =
    productsValues;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img: img || product.img,
      nombre: nombre || product.nombre,
      estado: estado || product.estado,
      precio: precio || product.precio,
      categoria: categoria || product?.categoria?.uid,
      descripcion: descripcion || product.descripcion,
      disponible: disponible || product.disponible,
    };
    await updateServiceApp(payload, endpoints.products, product.uid);
    reset();
    loadProducts();
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Productos</h1>
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
              <span className="productInfoKey">Precio:&nbsp;</span>
              <span className="productInfoValue">{product?.precio}</span>
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
              id="img"
              label="Imagen url"
              name="img"
              variant="outlined"
              sx={{ m: 1 }}
              size="small"
              value={img}
              onChange={handleInputChange}
            />
            <TextField
              id="nombre"
              label="Nombre"
              name="nombre"
              variant="outlined"
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
              maxRows={5}
              sx={{ m: 1 }}
              size="small"
              value={descripcion}
              onChange={handleInputChange}
            />
            <TextField
              id="precio"
              label="Precio"
              name="precio"
              variant="outlined"
              sx={{ m: 1 }}
              size="small"
              value={precio}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-categoria">
                Categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-categoria"
                id="demo-simple-select-categoria"
                name="categoria"
                label="Categoria"
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
                Estado
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
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
