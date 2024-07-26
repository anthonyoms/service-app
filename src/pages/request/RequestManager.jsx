import React, { useEffect, useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import {
  AssignmentIndOutlined,
  CakeOutlined,
  Details,
  Info,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  SignalCellular1BarTwoTone,
  SignalWifi0Bar,
} from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { Person2, Task } from "@mui/icons-material";

export const RequestManager = () => {
  const [{ request, customer, loading }, setRequest] = useState({
    request: null,
    customer: null,
    loading: true,
  });

  useEffect(() => {
    loadRequest();
  }, []);

  const loadRequest = async () => {
    const id = getIdUrl();

    const data = await getServiceApp(`${endpoints.request}/${id}`);
    console.log(data);

    if (!data.ok) {
      dataValidation(data);
      setRequest({ loading: false });
      return;
    }
    setRequest({
      request: data.request,
      customer: data.customer,
      loading: false,
    });
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Solicitud de Usuario</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <span className="userUpdateTitle">Detalles del Ticket</span>
            <div className="userShowBottom">
              <span className="userShowTitle">Detalles de usuario</span>
              <div className="userShowInfo">
                <AssignmentIndOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">{customer?.cedula}</span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{customer?.nombre}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{customer?.direccion}</span>
              </div>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{customer?.telefono}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{customer?.correo}</span>
              </div>
              <div className="userShowInfo">
                <SignalCellular1BarTwoTone className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {request?.servicio?.nombre}
                </span>
              </div>
              <span className="userShowTitle">Detalles del incidente</span>
              <div className="userShowInfo">
                <Task className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {request?.tipoRequest}
                </span>
              </div>
              <div className="userShowInfo">
                <Info className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {request?.description}
                </span>
              </div>
              <span className="userShowTitle">Técnico Asignado</span>
              <div className="userShowInfo">
                <Person2 className="userShowIcon" />
                <span className="userShowInfoTitle">{request?.tecnico}</span>
              </div>
              <span className="userShowTitle">Usuario Creador</span>
              <div className="userShowInfo">
                <Person2 className="userShowIcon" />
                <span className="userShowInfoTitle">{request?.usuario?.correo}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Atender Ticket</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <TextField
                    id="cedula"
                    label="Cedula"
                    name="cedula"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    disabled
                    readOnly
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="correo"
                    label="Email"
                    name="correo"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    disabled
                    readOnly
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="fechaRegistro"
                    label="Fecha registro"
                    name="fechaRegistro"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "50" }}
                    disabled
                    readOnly
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ maxLength: "50" }}
                    size="small"
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="telefono"
                    label="Teléfono"
                    name="telefono"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    inputProps={{ maxLength: "10" }}
                  />
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="direccion"
                    label="Dirección"
                    name="direccion"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={5}
                    autoComplete="off"
                    inputProps={{ maxLength: "100" }}
                  />
                </div>
                <div className="userUpdateItem">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-genero">
                      Genero
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-genero"
                      id="demo-simple-select-genero"
                      name="genero"
                      label="Genero"
                      size="small"
                    >
                      <MenuItem value={"masculino"}>Masculino</MenuItem>
                      <MenuItem value={"femenino"}>Femenino</MenuItem>
                      <MenuItem value={"otro"}>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="userUpdateItem">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-estadoCivil">
                      Estado Civil
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-estadoCivil"
                      id="demo-simple-select-estadoCivil"
                      name="estadoCivil"
                      label="Estado Civil"
                      size="small"
                    >
                      <MenuItem value={"Casado"}>Casado</MenuItem>
                      <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                      <MenuItem value={"Soltero"}>Soltero</MenuItem>
                      <MenuItem value={"Viudo"}>Viudo</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="userUpdateItem">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-label-rol"
                      id="demo-simple-select-rol"
                      name="rol"
                      label="Rol"
                      size="small"
                    >
                      <MenuItem value={"ADMIN_ROLE"}>Administrador</MenuItem>
                      <MenuItem value={"CAJERO"}>Cajero</MenuItem>
                      <MenuItem value={"TECNICO_MESA"}>
                        Técnico mesa de ayuda
                      </MenuItem>
                      <MenuItem value={"TECNICO"}>Tecnico</MenuItem>
                      <MenuItem value={"CUSTOMER_ROLE"}>Cliente</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
