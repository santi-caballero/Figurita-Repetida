import React, { useState } from "react";
import { Button, colors, Paper, Typography } from "@mui/material";
import Grid from "../Grids/Grid";
import { Box } from "@mui/system";
const ContentRareza = ({ Todas }) => {
  const [productos, setProductos] = useState([]);

  const productosRarezaCero = [];
  const productosRareza1 = [];
  const mapeadas = Todas.map((producto) => {
    if (producto.rareza == 0) productosRarezaCero.push(producto);
    if (producto.rareza == 1) productosRareza1.push(producto);
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
              setProductos(productosRarezaCero);
            }}
            variant="outlined"
          >
            Normales
          </Button>
          <Button
            sx={{
              borderRadius: 3,
              background: "#CAF0F8",
              fontWeight: "bold",
              color: "#023E8A",
            }}
            onClick={() => {
              setProductos(productosRareza1);
            }}
            variant="outlined"
          >
            Dorados
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

export default ContentRareza;
