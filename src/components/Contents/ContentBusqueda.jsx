import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Grilla from "../Grids/Grid";
import { Paper ,Typography} from "@mui/material";

const ContentBusqueda = () => {
  const nombre = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/productos/buscar/${nombre.nombre}`)
      .then((res) => setProductos(res.data));
  }, [productos]);

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
      <Typography margin="auto" mb="50px" variant="h4">
        El resultado de la busqueda
      </Typography>
        <Grilla productos={productos} />
      </Paper>
    </>
  );
};

export default ContentBusqueda;
