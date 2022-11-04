import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "./Grid";

const ContentEspeciales = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosPelota = [];
  const productosEstadio = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.tipo == "pelota") productosPelota.push(producto);
    if (producto.tipo == "estadio") productosEstadio.push(producto);
  });

  return (
    <>
      <Button
        onClick={() => {
          setProductos(productosPelota);
        }}
        variant="outlined"
      >
        Pelota
      </Button>
      <Button
        onClick={() => {
          setProductos(productosEstadio);
        }}
        variant="outlined"
      >
        Estadios
      </Button>
      <Grid productos={productos} />
    </>
  );
};

export default ContentEspeciales;
