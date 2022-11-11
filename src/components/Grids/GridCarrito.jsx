import React from "react";
import Card from "../../commons/Cards/Card";

import { Container, Grid, Paper } from "@mui/material";
import CardFavs from "../../commons/Cards/CardFavs";

import CardCarrito from "../../commons/Cards/CardCarrito";

const GrillaCarrito = ({ productos, cantidad }) => {
  if (!productos) return <p>Recargar su carrito</p>;

  return (
    <>
      <Container
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="md"
      >
        <Grid direction="column" container spacing={-1}>
          {productos.map((product, i) => (
            <Grid item key={i}>
              <CardCarrito
                cantidad={product.cantidad}
                product={product.producto}
                id={product.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default GrillaCarrito;
