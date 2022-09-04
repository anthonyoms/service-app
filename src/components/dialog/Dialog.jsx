import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ isOpen, setOpen }) {
  const handleClose = () => {
    setOpen(false);
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
            id="name"
            label="Razón social"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="RNC"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Dirección"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Correo"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Teléfono"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Itbis %"
            autoComplete="off"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
