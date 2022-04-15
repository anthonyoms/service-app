import React from "react";
import { Add } from "@material-ui/icons";
import { Fab } from "@mui/material";

import { Link } from "react-router-dom";

const MyFab = ({ route }) => {
  const style = {
    margin: 0,
    top: "auto",
    right: '2em',
    bottom: "6em",
    left: "auto",
    position: "fixed",
  };
  return (
    <Link to={route}>
      <Fab style={style} color="primary" aria-label="add">
        <Add />
      </Fab>
    </Link>
  );
};

export default MyFab;
