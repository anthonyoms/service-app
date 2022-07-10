import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ flex: "4" }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "27%" }}>
        <Box sx={{ width: "80%" }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
