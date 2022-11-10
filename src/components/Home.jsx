import React from "react";
import Grilla from "./Grids/Grid";
import Carrousel from "./Carrousel";
import { Paper, Typography } from "@mui/material";

const Home = ({ productos }) => {
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: "60%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
    marginBottom: "100px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      {/* <Carrousel /> */}

      <h1 className="promo"> Las mas vendidas</h1>

      <Grilla productos={productos} />
    </Paper>
  );
};

export default Home;
