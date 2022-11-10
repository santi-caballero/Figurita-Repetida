import * as React from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eliminarFav } from "../../states/user";

export default function CardFavs({ product }) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("/api/usuario/me")
  //     .then((result) => setUser(result.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const handleRemove = () => {
    dispatch(eliminarFav({ idUser: user.id, idProducto: product.id }));
    // axios
    //   .delete(`/api/favoritos/borrar_uno/${user.id}/${product.id}`)
    //   .catch((error) => console.log(error));

    window.location.reload(false);
    Swal.fire({
      icon: "success",
      title: "Adios...",
      text: "Favorito eliminado!",
      footer: '<a href="/">Volver al inicio</a>',
    });
  };

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    width: "85%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Card sx={{ maxWidth: 345 }} className="cardContainer">
        <CardMedia
          sx={{ paddingTop: "0.1px", marginTop: "20px" }}
          onClick={() => navigate(`/productos/${product.id}`)}
          component="img"
          image={product.urlImagen}
          alt="Foto Figu"
        />
        <CardContent>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.nombre} {product.apellido}
          </Typography>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.pais}
          </Typography>
          <Typography
            fontFamily={"'Anton', sans-serif"}
            variant="body2"
            color="text.secondary"
          >
            {product.posicion}
          </Typography>
          <IconButton
            onClick={() => {
              handleRemove();
            }}
            sx={{ marginLeft: "80%" }}
            aria-label="delete"
            size="large"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </CardContent>
      </Card>
    </Paper>
  );
}
