import React, { useState } from "react";
import { Button } from "@mui/material";
import Grid from "../Grids/Grid";
import { Box } from "@mui/system";

const ContentPaises = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosPaisesBajos = [];
  const productosInglaterra = [];
  const productosSenegal = [];
  const productosIran = [];
  const productosEstadosUnidos = [];
  const productosArgentina = [];
  const productosUruguay = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.pais == "Argentina") productosArgentina.push(producto);
    if (producto.pais == "Uruguay") productosUruguay.push(producto);
    if (producto.pais == "Paises Bajos") productosPaisesBajos.push(producto);
    if (producto.pais == "Inglaterra") productosInglaterra.push(producto);
    if (producto.pais == "Senegal") productosSenegal.push(producto);
    if (producto.pais == "Iran") productosIran.push(producto);
    if (producto.pais == "Estados Unidos") productosEstadosUnidos.push(producto);
  });

  return (
    <>
      <Box m={5} display="flex" justifyContent="center" alignItems="center">
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosArgentina);
          }}
          variant="outlined"
        >
          Argentina
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosUruguay);
          }}
          variant="outlined"
        >
          Uruguay
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosPaisesBajos);
          }}
          variant="outlined"
        >
          Paises Bajos
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosInglaterra);
          }}
          variant="outlined"
        >
          Inglaterra
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosEstadosUnidos);
          }}
          variant="outlined"
        >
          Estados Unidos
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosSenegal);
          }}
          variant="outlined"
        >
          Senegal
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            background: "#CAF0F8",
            fontWeight: "bold",
            color: "#023E8A",
          }}
          onClick={() => {
            setProductos(productosIran);
          }}
          variant="outlined"
        >
          Iran
        </Button>
      </Box>
      <Grid productos={productos} />
    </>
  );
};

export default ContentPaises;
