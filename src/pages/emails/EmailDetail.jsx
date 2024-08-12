import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import {
  Reply as ReplyIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

const EmailDetail = () => {
  const { id } = useParams();
  const [email, setEmails] = useState(null);

  const loadMessage = useCallback(async () => {
    const data = await getServiceApp(`${endpoints.message}/${id}`);

    if (!data.ok) {
      dataValidation(data);

      return;
    }

    setEmails(data.msg);
  }, [id]);

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  if (!email) {
    return <Typography variant="h6">Correo no encontrado</Typography>;
  }

  const handleReply = () => {
    // Lógica para responder al correo
    alert("Reply functionality not implemented.");
  };

  const handleArchive = () => {
    // Lógica para archivar el correo
    alert("Archive functionality not implemented.");
  };

  const handleDelete = () => {
    // Lógica para eliminar el correo
    alert("Delete functionality not implemented.");
  };

  return (
    <div style={{ flex: 4 }}>
      <Paper
        elevation={3}
        style={{ padding: 16, maxWidth: 800, margin: "auto" }}
      >
        <Box mb={2}>
          <Typography variant="h4">{email.subject}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email.sender}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date().toLocaleDateString()}
          </Typography>
        </Box>
        <Divider />
        <Box my={2}>
          <Typography variant="body1" paragraph>
            {email.content}
          </Typography>
        </Box>
        <Divider />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReplyIcon />}
              onClick={handleReply}
            >
              Responder
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArchiveIcon />}
              onClick={handleArchive}
              style={{ marginLeft: 8 }}
            >
              Archivar
            </Button>
          </Box>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </div>
  );
};

export default EmailDetail;
