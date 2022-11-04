import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "./Grid";

const ContentRareza = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosRarezaCero = [];
  const productosRareza1 = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.rareza == 0) productosRarezaCero.push(producto);
    if (producto.rareza == 1) productosRareza1.push(producto);
  });

  return (
    <>
      <Button
        onClick={() => {
          setProductos(productosRarezaCero);
        }}
        variant="outlined"
      >
        Normales
      </Button>
      <Button
        onClick={() => {
          setProductos(productosRareza1);
        }}
        variant="outlined"
      >
        Dorados
      </Button>
      <Grid productos={productos} />
    </>
  );
};

export default ContentRareza;
