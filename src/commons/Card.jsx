import * as React from "react";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../style/commonsClass.css";

// import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router";

export default function CardProduct({ product }) {
  const navigate = useNavigate();
  // const [favorite, setFavorite] = useState({});

  // const addToFavorite = () => {
  //   axios.post("url crear un fav").then((fav) => {
  //     setFavorite(fav.data);
  //   });
  // };

  return (
    <Card sx={{ maxWidth: 345 }} className="cardContainer">
      <CardMedia
        sx={{ paddingTop: "0.1px", marginTop: "20px" }}
        onClick={() => navigate(`/productos/${product.id}`)}
        component="img"
        image={product.urlImagen}
        alt="Foto Figu"
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
