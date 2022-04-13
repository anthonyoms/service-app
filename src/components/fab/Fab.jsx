import React from "react";
import { Add } from "@material-ui/icons";
import "./fab.css";
const Fab = () => {
  return (
    <div className="fab">
      <Fab color="primary" aria-label="add">
        <Add />
      </Fab>
    </div>
  );
};

export default Fab;
