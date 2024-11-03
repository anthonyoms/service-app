import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const UnauthorizedAccess = () => {
  const handleGoBack = () => {
    // Redirige a la página anterior o a la página de inicio
    window.history.back();
  };

  return (
    <Box
      display="flex"
      flex={4}
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <LockIcon color="error" sx={{ fontSize: 50, mb: 2 }} />
        <Typography variant="h5" color="textPrimary" gutterBottom>
          No está autorizado
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Usted no tiene los permisos necesarios para ver este recurso.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ mt: 3 }}
        >
          Regresar
        </Button>
      </Paper>
    </Box>
  );
};

export default UnauthorizedAccess;
