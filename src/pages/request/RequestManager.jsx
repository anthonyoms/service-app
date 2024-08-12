import React, { useCallback, useEffect, useState } from "react";
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
  Star,
} from "@material-ui/icons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { Person2, Task } from "@mui/icons-material";
import { updateRequest } from "../../schemas/yupShemas";
import { useFormik } from "formik";
import moment from "moment";

export const RequestManager = () => {
  const [{ request, customer, loading }, setRequest] = useState({
    request: null,
    customer: null,
    loading: true,
  });
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        estado: "",
        comentarioCierre: "",
      },
      validationSchema: updateRequest,
      onSubmit: async (values) => {
        const id = getIdUrl();
        const dataResponse = await updateServiceApp(
          values,
          endpoints?.request,
          id
        );
        const validData = dataValidation(dataResponse);
        if (validData.ok) {
          loadRequest();
        }
      },
    });

  const loadRequest = useCallback(async () => {
    const id = getIdUrl();

    const data = await getServiceApp(`${endpoints.request}/${id}`);

    if (!data.ok) {
      dataValidation(data);
      setRequest({ loading: false });
      return;
    }
    console.log(data.request);
    setRequest({
      request: data.request,
      customer: data.customer,
      loading: false,
    });
    if (!!values?.estado) {
      return;
    }
    setFieldValue("estado", request?.estado);
    setFieldValue("comentarioCierre", request?.comentarioCierre);
  }, [
    setFieldValue,
    request?.estado,
    values.estado,
    request?.comentarioCierre,
  ]);

  useEffect(() => {
    loadRequest();
  }, [loadRequest]);

  return (
    <>
      <MyBackdrop loading={loading} />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Solicitud de Usuario</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <span className="userUpdateTitle">
              Detalles del Ticket # {request?.number}
            </span>
            <div className="userShowBottom">
              <span className="userShowTitle">Estado</span>
              <div className="userShowInfo">
                <Star className="userShowIcon" />
                <span className="userShowInfoTitle">{request?.estado}</span>
              </div>
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
                <span className="userShowInfoTitle">
                  {request?.usuario?.correo}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Atender Ticket</span>

            <form onSubmit={handleSubmit} className="userUpdateForm">
              <div className="userUpdateLeft">
                {request?.completedWork && (
                  <span className="userUpdateTitle">
                    {" "}
                    cerrado en fecha{" "}
                    {moment(request?.completedWork).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </span>
                )}
                <div className="userUpdateItem">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-estado">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-estado"
                      id="demo-simple-select-estado"
                      name="estado"
                      label="Estado"
                      value={values.estado || ""}
                      onChange={handleChange}
                      inputProps={{ readOnly: !!request?.done }}
                    >
                      <MenuItem value={"Resuelto"}>Resuelto</MenuItem>
                      <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
                      <MenuItem value={"Nuevo"}>Nuevo</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="userUpdateItem">
                  <TextField
                    id="comentarioCierre"
                    label="Comentario Cierre"
                    name="comentarioCierre"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={5}
                    autoComplete="off"
                    inputProps={{ maxLength: "100", readOnly: request?.done }}
                    style={{ marginBottom: 10 }}
                    value={values.comentarioCierre}
                    onChange={handleChange}
                    error={
                      touched.comentarioCierre &&
                      Boolean(errors.comentarioCierre)
                    }
                    helperText={
                      touched.comentarioCierre && errors.comentarioCierre
                    }
                  />
                </div>
                {!request?.done ? (
                  <button type="submit" className="userUpdateButton">
                    Actualizar
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
