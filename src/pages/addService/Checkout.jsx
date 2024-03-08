import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AddressForm } from "./AddressForm";
import PaymentForm from "./AddServiceForm";
import Review from "./Review";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";
import { useState } from "react";
import { MyBackdrop } from "../../components/ui/Backdrop";
import { useRef } from "react";
import { useCallback } from "react";
import AddServiceForm from "./AddServiceForm";

const steps = ["Dirección", "Payment details", "Review your order"];

export default function Checkout() {
  const addressAndContactFormRef = useRef(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const initialState = {
    loading: false,
    customers: [],
    services: [],
    generalData: {
      customer: null,
      service: null,
      province: "",
      municipality: "",
      sector: "",
      avenidaNumero: "",
      referencia: "",
      name: "",
      cedula: "",
    },
  };

  const [{ loading, customers, generalData, services }, setDataState] =
    useState(initialState);
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(() => {
    loadCustomers();
  }, []);
  const changeDisabledButton = useCallback((value) => {
    setDisabledButton(value);
  }, []);
  const loadCustomers = async () => {
    setDataState((prev) => ({
      ...prev,
      loading: true,
    }));
    const [customersDataResponse, serviceDataResponse] = await Promise.all([
      getServiceApp(endpoints.users),
      getServiceApp(endpoints.services),
    ]);
    const validDataCustomers = dataValidation(customersDataResponse, false);
    const validDataServices = dataValidation(serviceDataResponse, false);

    if (validDataCustomers.ok && validDataServices) {
      setDataState((prev) => ({
        ...prev,
        services: validDataServices.servicios,
        loading: false,
        customers: validDataCustomers.usuarios.filter(
          (usuarios) => usuarios.rol === "CUSTOMER_ROLE"
        ),
      }));
    }
  };
  const setGeneralDataAndAdvance = useCallback(
    (values) => {
      setDataState((prev) => ({
        ...prev,
        generalData: { ...values },
      }));
      setActiveStep(activeStep + 1);
    },
    [setActiveStep, activeStep]
  );

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            customersData={customers}
            setDisableButtom={changeDisabledButton}
            ref={addressAndContactFormRef}
            onSuccess={setGeneralDataAndAdvance}
            setDataState={setDataState}
            generalData={generalData}
          />
        );
      case 1:
        return (
          <AddServiceForm serviceData={services} generalData={generalData} />
        );
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      addressAndContactFormRef.current?.submit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <MyBackdrop loading={loading} />
      <Container component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Contrato de servicio
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={disabledButton}
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </>
  );
}
