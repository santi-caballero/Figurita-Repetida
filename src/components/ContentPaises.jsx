import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "./Grid";

const ContentPaises = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosArgentina = [];
  const productosUruguay = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.pais == "argentina") productosArgentina.push(producto);
    if (producto.pais == "uruguay") productosUruguay.push(producto);
  });

  return (
    <>
      <Button
        onClick={() => {
          setProductos(productosArgentina);
        }}
        variant="outlined"
      >
        Argentina
      </Button>
      <Button
        onClick={() => {
          setProductos(productosUruguay);
        }}
        variant="outlined"
      >
        Uruguay
      </Button>
      <Grid productos={productos} />
    </>
  );
};

export default ContentPaises;
