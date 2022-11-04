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

export default function CardProduct({ product }) {
  //COMO PROP TIENE QUE VENIR EL PRODUCT DE GRID, PARA EN CARD MOSTRAR LA IMAGEN
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState({});
  const [producto, setProducto] = useState({});

  const addToFavorite = () => {
    axios.post("url crear un fav").then((fav) => {
      setFavorite(fav.data);
    });
  };



  return (
    <Card sx={{ maxWidth: 345 }} className="cardContainer">
      <CardMedia
        sx={{ paddingTop: "0.1px", marginTop: "20px" }}
        onClick={() => navigate(`/productos/${product.id}`)}
        component="img"
        image={product.urlImagen}
        // URL DE LA FIGURITA  o PRODUCTO.IMG
        alt="Foto Figu"
        //NOMBRE DE LA FIGURITA
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.nombre} {product.apellido}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.pais}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.posicion}
        </Typography>
      </CardContent>
      {/* onClick={() => addToFavorite()} */}
      {/* onClick={() => addProdToCart()} */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
