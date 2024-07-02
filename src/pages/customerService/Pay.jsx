import React, { useCallback, useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../newProduct/newProduct.css";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getIdUrl } from "../../utils/helpers/getIdUrl";
import { getServiceApp, updateServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { formatter } from "../../utils/constants/formatNumber";
import moment from "moment";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { useNavigate } from "react-router-dom";

export const Pay = () => {
  const navigate = useNavigate();
  const configuration = useSelector((state) => state.info);
  const [conrtactData, setConrtactData] = useState({
    loading: true,
    type: "Factura de Servicio",
    total: 0,
    id: "",
    invoiceId: "",
    contrato: null,
    mora: 0,
  });
  const [cardDetails, setCardDetails] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  const loadContract = useCallback(async () => {
    const id = getIdUrl();
    const invoiceId = getIdUrl(3);
    const data = await getServiceApp(`${endpoints.contratoDeServicio}/${id}`);
    if (!data.ok) {
      dataValidation(data);
      setConrtactData({ loading: false });
      return;
    }
    const invoiceData = data.contrato.facturas.find(
      (invoice) => invoice._id === invoiceId
    );
    const today = moment().format("DD/MM/YYYY");
    const fechaLimite = moment
      .utc(invoiceData?.fechaLimitePago)
      .format("DD/MM/YYYY");
    // Comparar las fechas
    const isLate =
      moment(today, "DD/MM/YYYY").isAfter(moment(fechaLimite, "DD/MM/YYYY")) &&
      !invoiceData.pago;

    const mora = isLate ? configuration.mora : 0;

    setConrtactData((prev) => ({
      ...prev,
      total: invoiceData.total + mora,
      loading: false,
      id,
      invoiceId,
      contrato: data.contrato,
      mora,
    }));
  }, [configuration.mora]);

  useEffect(() => {
    loadContract();
  }, [loadContract]);

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setCardDetails({
      ...cardDetails,
      focused: e.target.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los detalles de la tarjeta
    console.log(cardDetails);
    const dataResponse = await updateServiceApp(
      { ...conrtactData?.contrato, mora: conrtactData.mora },
      endpoints?.contratoDeServicio,
      conrtactData?.invoiceId
    );
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      navigate(`/paymentservice/${conrtactData.id}`);
    }
  };

  return (
    <>
      <MyBackdrop loading={conrtactData.loading} />
      <div className="newProduct">
        <Container maxWidth="sm">
          <Box mt={0}>
            <Typography variant="h4" align="center" gutterBottom>
              Pago {conrtactData.type}
            </Typography>
            <Cards
              cvc={cardDetails.cvc}
              expiry={cardDetails.expiry}
              focused={cardDetails.focused}
              name={cardDetails.name}
              number={cardDetails.number}
            />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Typography variant="h6" ml={3} align="center">
                  Pago por concepto de servicio por el importe de{" "}
                  {formatter.format(conrtactData.total)}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="number"
                    label="Card Number"
                    variant="outlined"
                    value={cardDetails.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    inputProps={{ maxLength: 16 }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="outlined"
                    inputProps={{ maxLength: 18 }}
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="expiry"
                    label="Expiry (MM/YY)"
                    variant="outlined"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    inputProps={{ maxLength: 5 }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="cvc"
                    label="CVC"
                    variant="outlined"
                    value={cardDetails.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    inputProps={{ maxLength: 3 }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
};
