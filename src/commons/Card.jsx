import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./commonsClass.css";
import fotoMessi from "../commons/utils/messi.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CardProduct() {
  //COMO PROP TIENE QUE VENIR EL PRODUCT DE GRID, PARA EN CARD MOSTRAR LA IMAGEN
  const navigate= useNavigate();
  const [favorite, setFavorite] = useState({});
  const [producto, setProducto] = useState({});

  const prod = {
    nombre: "Prueba",
    apellido: "Post",
    pais: "Nigeria",
    precio: 5,
    stock: 40,
    rareza: 1,
    urlImagen:"",
    posicion: "delantero",
    tipo: "jugador",
  }

  const addToFavorite = () => {
    axios.post("url crear un fav").then((fav) => {
      setFavorite(fav.data);
    });
  };

  const addProdToCart = () => {
    axios
      .post("api/productos", {
        tipo:prod.tipo,
        nombre:prod.nombre,
        apellido:prod.apellido,
        posicion:prod.posicion,
        pais:prod.pais,
        stock:prod.stock,
        precio:prod.precio,
        rareza:prod.rareza,
        urlImagen:prod.urlImagen,
      })
      console.log("CARRITOOOOOOOOO")
      // .then((prod) => {
      //   setProducto(prod.data);
      // });
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="cardContainer">
      <CardMedia
        onClick={()=>navigate("/productos/4")}
        component="img"
        height="450"
        image={fotoMessi}
        // URL DE LA FIGURITA  o PRODUCTO.IMG
        alt="Lionel Messi"
        //NOMBRE DE LA FIGURITA
      />
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          Lionel Andres Messi
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Argentina
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delantero
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={()=>addToFavorite()} />
        </IconButton>
        <IconButton aria-label="share">
          <AddShoppingCartIcon onClick={()=>addProdToCart()} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
