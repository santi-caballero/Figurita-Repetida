import React from "react";
import Card from "../commons/Card";
import fotoMessi from "../commons/utils/messi.jpeg";
import "./componentClass.css";
import Link from "react";
import { Container, Grid } from "@mui/material";

const Grilla = ({ productos }) => {
  // if(!productos) return <p>Esa figurita no existe</p>

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {productos.map((producto, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card product={producto} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Grilla;
