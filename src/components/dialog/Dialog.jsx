import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { infoStartUpdate } from "../../actions/info";
import { handleFormatNumber } from "../../utils/helpers/handleFormatNumber";

export default function FormDialog({ isOpen, setOpen, configuration }) {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    cedula_rnc: "",
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    itbis: 0,
  });

  const { cedula_rnc, nombre, telefono, correo, direccion, itbis } = formValues;

  useEffect(() => {
    if (!isOpen) return;
    setFormValues(configuration);
  }, [configuration, isOpen]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    dispatch(infoStartUpdate(formValues));
    handleClose();
  };

  const handleChangeNumber = (e) => {
    const target = handleFormatNumber(e);
    handleInputChange(target);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Configuración</DialogTitle>
        <DialogContent>
          <DialogContentText>
            En este apartado se podra actualizar los datos generales de la
            empresa, el acceso y uso del Sitio Web y/o de los Contenidos
            incluidos en el mismo tiene lugar libre y conscientemente, bajo su
            exclusiva responsabilidad.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            name="nombre"
            label="Razón social"
            inputProps={{ maxLength: "20" }}
            autoComplete="off"
            required
            fullWidth
            variant="standard"
            value={nombre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="cedula_rnc"
            name="cedula_rnc"
            label="RNC"
            autoComplete="off"
            required
            inputProps={{ maxLength: "11" }}
            fullWidth
            variant="standard"
            value={cedula_rnc}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="name"
            name="direccion"
            label="Dirección"
            autoComplete="off"
            required
            inputProps={{ maxLength: "50" }}
            fullWidth
            variant="standard"
            value={direccion}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="correo"
            name="correo"
            label="Correo"
            autoComplete="off"
            required
            inputProps={{ maxLength: "50" }}
            fullWidth
            variant="standard"
            value={correo}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="telefono"
            name="telefono"
            label="Teléfono"
            autoComplete="off"
            required
            inputProps={{ maxLength: "10" }}
            fullWidth
            variant="standard"
            value={telefono}
            onChange={handleChangeNumber}
          />
          <TextField
            margin="dense"
            id="itbis"
            name="itbis"
            label="Itbis %"
            autoComplete="off"
            required
            inputProps={{ maxLength: "2" }}
            fullWidth
            variant="standard"
            value={itbis}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button onClick={() => handleUpdate()}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
