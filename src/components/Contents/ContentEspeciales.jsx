import React, { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import Grid from "../Grids/Grid";
import { Box } from "@mui/system";

const ContentEspeciales = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosEquipo = [];
  const productosPelota = [];
  const productosEstadio = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.tipo == "pelota") productosPelota.push(producto);
    if (producto.tipo == "estadio") productosEstadio.push(producto);
    if (producto.tipo == "equipo") productosEquipo.push(producto);
  });
  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "60%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };
  return (
    <>
      <Paper elevation={10} style={paperStyle}>
        <Box m={5} display="flex" justifyContent="center" alignItems="center">
          <Button
            sx={{
              borderRadius: 3,
              background: "#CAF0F8",
              fontWeight: "bold",
              color: "#023E8A",
            }}
            onClick={() => {
              setProductos(productosPelota);
            }}
            variant="outlined"
          >
            Pelota
          </Button>
          <Button
            sx={{
              borderRadius: 3,
              background: "#CAF0F8",
              fontWeight: "bold",
              color: "#023E8A",
            }}
            onClick={() => {
              setProductos(productosEstadio);
            }}
            variant="outlined"
          >
            Estadios
          </Button>
          <Button
            sx={{
              borderRadius: 3,
              background: "#CAF0F8",
              fontWeight: "bold",
              color: "#023E8A",
            }}
            onClick={() => {
              setProductos(productosEquipo);
            }}
            variant="outlined"
          >
            Selecciones
          </Button>
        </Box>
        <Typography margin="auto" mb="50px" variant="h4">
          El resultado de la busqueda
        </Typography>
        <Grid productos={productos} />
      </Paper>
    </>
  );
};

export default ContentEspeciales;
