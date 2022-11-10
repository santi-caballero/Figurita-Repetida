import React from "react";
import Card from "../../commons/Cards/Card";

import { Container, Grid } from "@mui/material";
import { Paper } from "@mui/material";

const Grilla = ({ productos }) => {
  // if(!productos) return <p>Esa figurita no existe</p>
  const paperStyle = {
    padding: 20,
    width: 900,
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {productos.map((producto, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card product={producto} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
};

export default Grilla;
