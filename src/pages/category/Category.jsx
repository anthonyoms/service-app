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
import {
  getServiceApp,
  updateServiceApp,
  uploadFileServiceApp,
} from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { MyBackdrop } from "../../components/ui/Backdrop";

export default function Category() {
  const [{ category, loading }, setCategory] = useState({
    category: null,
    loading: true,
  });

  const [formValues, setFormValues] = useState({
    img: "",
    nombre: "",
    descripcion: "",
    estado: true,
  });

  const { img, nombre, descripcion, estado } = formValues;

  useEffect(() => {
    loadCategory();
  }, []);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const loadCategory = async () => {
    const id = window.location.pathname.split("/")[2];
    const dataResponse = await getServiceApp(`${endpoints.categories}/${id}`);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setFormValues(validData.categoria);
      setCategory({ category: validData.categoria, loading: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img: img,
      nombre: nombre,
      descripcion: descripcion,
      estado: estado,
    };
    const dataResponse = await updateServiceApp(
      payload,
      endpoints.categories,
      category.uid
    );
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      loadCategory();
    }
  };
  const handleUploadImage = async (e) => {
    setCategory((category) => {
      return { ...category, loading: true };
    });
    const data = await uploadFileServiceApp(
      e.target.files[0],
      endpoints.categories,
      category.uid
    );
    const validData = dataValidation(data);
    if (validData.ok) {
      loadCategory();
    } else {
      setCategory((user) => {
        return { ...user, loading: false };
      });
    }
  };
  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="category">
        <div className="categoryTitleContainer">
          <h1 className="categoryTitle">Actualización de categoría</h1>
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
                <span className="categoryInfoValue">
                  {category?.descripcion}
                </span>
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
                id="nombre"
                label="Nombre"
                name="nombre"
                variant="outlined"
                sx={{ m: 1 }}
                inputProps={{ maxLength: "50" }}
                autoComplete="off"
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
                rows={5}
                autoComplete="off"
                value={descripcion}
                onChange={handleInputChange}
              />
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
                <input
                  type="file"
                  id="file"
                  onChange={handleUploadImage}
                  style={{ display: "none" }}
                />
              </div>
              <button className="categoryButton">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
