import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { getServiceApp, postServiceApp } from "../../services/serviceApp";
import { dataValidation } from "../../utils/helpers/messages";
import { endpoints } from "../../utils/constants/endpoints";
import { useFormik } from "formik";
import { ticketGeneratorForm } from "../../schemas/yupShemas";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "linear-gradient(to bottom right, #007bff, #1a8cff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: 4,
    maxWidth: 500,
    width: "100%",
    textAlign: "center",
  },
  form: {
    "& .MuiTextField-root": {
      margin: 1,
      width: "calc(100% - 16px)",
    },
    "& .MuiButton-root": {
      margin: 2,
    },
  },
}));

const TicketGenerator = () => {
  const classes = useStyles();

  const [{ lastTicket }, setData] = useState({
    data: [],
  });
  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { customer: null },
    validationSchema: ticketGeneratorForm,
    onSubmit: async ({ customer }) => {
      console.log(customer);
      const isSaveTicket = await postServiceApp(
        { customer },
        endpoints.tickets
      );
      dataValidation(isSaveTicket);
      resetForm();
      loadLastTicket();
    },
  });

  useEffect(() => {
    loadLastTicket();
  }, []);

  const loadLastTicket = async () => {
    const dataResponse = await getServiceApp(`${endpoints.tickets}/last`);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setData({ lastTicket: validData.total, loading: false });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Conteo de Tickets
          </Typography>
          <h1 style={{ fontSize: 120 }}>{lastTicket}</h1>
          <Typography style={{ marginTop: 50 }} variant="h5" gutterBottom>
            Generar Nuevo Ticket
          </Typography>
          <form
            onSubmit={handleSubmit}
            className={classes.form}
            noValidate
            autoComplete="off"
          >
            <Grid container direction="column" alignItems="center">
              <TextField
                inputProps={{ maxLength: "11" }}
                id="customer"
                name="customer"
                label="Cedula Cliente"
                variant="outlined"
                required
                value={values?.customer || ""}
                error={!!errors.customer && !!touched.customer}
                helperText={
                  !!errors.customer && !!touched.customer && errors.customer
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button type="submit" variant="contained" color="primary">
                Generar Ticket
              </Button>
            </Grid>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default TicketGenerator;
