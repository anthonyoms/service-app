import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Publish } from "@material-ui/icons";
import "./category.css";
import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import Loading from "../../components/ui/Loading";

export default function Category() {
  const [{ category, loading }, setCategory] = useState({
    category: null,
    loading: true,
  });
  const [categoryValues, handleInputChange, reset] = useForm({
    img: "",
    nombre: "",
    descripcion: "",
    estado: "",
  });
  const { img, nombre, descripcion, estado } = categoryValues;

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const id = window.location.pathname.split("/")[2];
    const { categoria } = await getServiceApp(`${endpoints.categories}/${id}`);
    setCategory({ category: categoria, loading: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img: img || category.img,
      nombre: nombre || category.nombre,
      descripcion: descripcion || category.descripcion,
      estado: estado || category.estado,
    };
    await updateServiceApp(payload, endpoints.categories, category.uid);
    reset();
    loadCategory();
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Categoria</h1>
        <Link to="/newcategory">
          <button className="categoryAddButton">Crear</button>
        </Link>
      </div>
      <div className="categoryTop">
        <div className="categoryTopRight">
          <div className="categoryInfoTop">
            <img src={category?.img} alt="" className="categoryInfoImg" />
            <span className="categoryName">{category?.nombre}</span>
          </div>
          <div className="categoryInfoBottom">
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">Nombre:&nbsp;</span>
              <span className="categoryInfoValue">{category?.nombre}</span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">Descripción:&nbsp;</span>
              <span className="categoryInfoValue">{category?.descripcion}</span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">Estado:&nbsp;</span>
              <span className="categoryInfoValue">
                {category?.estado ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="categoryInfoItem">
              <span className="categoryInfoKey">in stock:&nbsp;</span>
              <span className="categoryInfoValue">si</span>
            </div>
          </div>
        </div>
        <div className="categoryTopLeft"></div>
      </div>
      <div className="categoryBottom">
        <form onSubmit={handleSubmit} className="categoryForm">
          <div className="categoryFormLeft">
            <TextField
              id="img"
              label="Imagen url"
              name="img"
              variant="outlined"
              sx={{ m: 1 }}
              value={img}
              onChange={handleInputChange}
            />
            <TextField
              id="nombre"
              label="Nombre"
              name="nombre"
              variant="outlined"
              sx={{ m: 1 }}
              inputProps={{ maxLength: "50" }}
              value={nombre}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              name="descripcion"
              label="Descripción"
              multiline
              sx={{ m: 1 }}
              inputProps={{ maxLength: "50" }}
              maxRows={5}
              value={descripcion}
              onChange={handleInputChange}
            />
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
                value={estado}
                onChange={handleInputChange}
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="categoryFormRight">
            <div className="categoryUpload">
              <img src={category?.img} alt="" className="categoryUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="categoryButton">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
