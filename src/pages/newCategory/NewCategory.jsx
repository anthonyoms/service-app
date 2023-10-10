import { useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useForm from "../../hooks/useForm";
import { endpoints } from "../../utils/constants/endpoints";
import { saveWithImage } from "../../services/serviceApp";
import { MyBackdrop } from "../../components/ui/Backdrop";
import "./newCategory.css";

export default function NewCategory() {
  const [loading, setLoading] = useState(false);
  const [{ nombre, descripcion, img, estado, tipo }, handleInputChange, reset] =
    useForm({
      nombre: "",
      descripcion: "",
      img: "",
      tipo: "",
      estado: true,
    });
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        nombre,
        descripcion,
        img,
        estado,
        tipo,
      };
      const isSaveCategory = await saveWithImage(
        payload,
        image,
        endpoints.categories
      );
      if (!!isSaveCategory.ok) {
        reset();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      reset();
    }
  };
  return (
    <>
      <MyBackdrop loading={loading} />

      <div className="newCategory">
        <h1 className="addCategoryTitle">Nueva categoría</h1>
        <form onSubmit={handleSubmit} className="addCategoryForm">
          <div className="addCategoryItem">
            <InputLabel htmlFor="img">Imagen de la categoría</InputLabel>
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
          <div className="addCategoryItem">
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
          <div className="addCategoryItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-tipo">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label-tipo"
                id="demo-simple-select-tipo"
                name="tipo"
                label="Tipo"
                autoComplete="off"
                value={tipo}
                onChange={handleInputChange}
              >
                <MenuItem value={"Producto"} defaultValue={true}>
                  Producto
                </MenuItem>
                <MenuItem value={"Servicio"}>Servicio</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="addCategoryItem">
            <TextField
              id="outlined-multiline-flexible"
              name="descripcion"
              label="Descripción"
              multiline
              rows={2}
              autoComplete="off"
              inputProps={{ maxLength: "50" }}
              value={descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div className="addCategoryItem">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-estado">
                Estado
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-estado"
                id="demo-simple-select-estado"
                name="estado"
                label="Estado"
                autoComplete="off"
                value={estado}
                onChange={handleInputChange}
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <button className="addCategoryButton">Crear</button>
        </form>
      </div>
    </>
  );
}
