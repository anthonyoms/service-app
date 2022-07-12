import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./newCategory.css";
import useForm from "../../hooks/useForm";
import { endpoints } from "../../utils/constants/endpoints";
import { postServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";

export default function NewCategory() {
  const [{ nombre, descripcion, img, estado }, handleInputChange, reset] =
    useForm({
      nombre: "",
      descripcion: "",
      img: "",
      estado: true,
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre,
      descripcion,
      img,
      estado,
    };
    const dataResponse = await postServiceApp(payload, endpoints.categories);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      reset();
    }
  };
  return (
    <div className="newCategory">
      <h1 className="addCategoryTitle">Nueva categoria</h1>
      <form onSubmit={handleSubmit} className="addCategoryForm">
        <div className="addCategoryItem">
          <TextField
            id="img"
            label="Imagen url"
            name="img"
            variant="outlined"
            value={img}
            onChange={handleInputChange}
          />
        </div>
        <div className="addCategoryItem">
          <TextField
            id="nombre"
            label="Nombre"
            name="nombre"
            variant="outlined"
            inputProps={{ maxLength: "50" }}
            value={nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="addCategoryItem">
          <TextField
            id="outlined-multiline-flexible"
            name="descripcion"
            label="Descripción"
            multiline
            inputProps={{ maxLength: "50" }}
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="addCategoryItem">
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
        <button className="addCategoryButton">Crear</button>
      </form>
    </div>
  );
}
