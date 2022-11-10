import React from "react";

import { Container, Grid } from "@mui/material";
import CardFavs from "../../commons/Cards/CardFavs";

const GrillaFavs = ({ productos }) => {
  if (!productos) return <p>Recargar su carrito</p>;

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {productos.map((product, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <CardFavs product={product.producto} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GrillaFavs;
