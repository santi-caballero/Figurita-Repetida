import CardProduct from "./Card";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import UnstyledSelectsMultiple from "./utils/cantidadDeProductos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SingleProduct() {

  
  const [producto, setProducto] = useState({})

  const addProdToCart = () => {
    // axios
    //   .post("api/productos", {
    //     tipo: producto.tipo,
    //     nombre: producto.nombre,
    //     apellido: producto.apellido,
    //     posicion: producto.posicion,
    //     pais: producto.pais,
    //     stock: producto.stock,
    //     precio: producto.precio,
    //     rareza: producto.rareza,
    //     urlImagen: producto.urlImagen,
    //   })
      // console.log("PRODUCTO", producto)
  };

  useEffect(() => {
    axios.get(`/api/productos/${producto.id}`).then(figu=>{
      setProducto(figu.data)
    })
  }, [producto]);

  return (
    
    <Card sx={{ maxWidth: 700, bgcolor: "#ADE8F4" }}>
      <CardHeader
        avatar={
          <Typography variant="h4" color={"#03045E"}>
            FIGURITA REPETIDA
          </Typography>
        }
      />
      <CardProduct />
      {/* ACA EN VEZ DE CARD VA LA IMAGEN DE LA FIGU NO LA CARD, SIMPLEMENTE PARA VER COMO QUEDA ESTA LA CARD */}
      <CardContent>
        <ul>
          <Typography
            variant="h5"
            color={"#03045E"}
            className="singleProductDescription"
          >
            DESCRIPCION:
          </Typography>
          <div>
            <Typography variant="h6" color={"#03045E"}>
              NOMBRE: {producto.nombre}
            </Typography>
            {producto.type === "jugador" ? (
              <>
                <Typography variant="h6" color={"#03045E"}>
                  APELLIDO: {producto.apellido}{" "}
                </Typography>
                <Typography variant="h6" color={"#03045E"}>
                  POSICION: {producto.posicion}{" "}
                </Typography>
                <Typography variant="h6" color={"#03045E"}>
                  PAIS: {producto.pais}{" "}
                </Typography>
              </>
            ) : null}
          </div>
        </ul>
      </CardContent>

      <Stack direction="row" spacing={2} className="singleProductButtons">
        <Button variant="contained" startIcon={<FavoriteIcon />}>
          ADD TO FAVORITES
          <IconButton aria-label="add to favorites"></IconButton>
        </Button>
        <Button
          onClick={() => addProdToCart()}
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
        >
          ADD TO CART
        </Button>
      </Stack>
      <UnstyledSelectsMultiple />
    </Card>
  );
}

// import React from "react";
// import Cardd from "./Card";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import CardActions from "@mui/material/CardActions";
// import IconButton from "@mui/material/IconButton";
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import "./commonsClass.css";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
//   );

// const SingleProduct = ({ product }) => {
//   product = {
//     type: "jugador",
//     nombre: "Lionel Andres",
//     apellido: "Messi",
//     posicion: "Delantero",
//     pais: "Argentina",
//     precio: "que juegue messi no tiene precio",
//     stock: 1,
//   };

//   return (
//     <Container>
//     <Box sx={{ bgcolor: '#ADE8F4', height: '100vh' }}>
//       <div className="singleProductGeneral">
//         <section className="singleProductCard">
//           <Cardd />
//         </section>

//         <Card sx={{ height: '30vh', bgcolor: '#0096C7'}}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Word of the Day
//         </Typography>
//         <Typography variant="h5" component="div">
//           PRECIO
//         </Typography>
//         {product.stock === 0 ? (
//             <Typography>LO SENTIMOS, ESTE PRODUTO ESTA AGOTADO</Typography>
//           ) : null}
//         <Typography variant="h5" component="div">
//           {product.precio}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites">
//               <FavoriteIcon />
//             </IconButton>
//             <IconButton aria-label="share">
//               <AddShoppingCartIcon />
//             </IconButton>
//           </CardActions>
//     </Card>

//         <section className="singleProductPriceFavCart">
//           <div>PRECIO: {product.precio} </div>
//           {product.stock === 0 ? (
//             <div>LO SENTIMOS, ESTE PRODUTO ESTA AGOTADO</div>
//           ) : null}

//         </section>
//         <section>
//           <ul>
//             <p className="singleProductDescription">DESCRIPCION:</p>
//             <li>NOMBRE: {product.nombre}</li>
//             {product.type === "jugador" ? (
//               <>
//                 <li>APELLIDO: {product.apellido} </li>
//                 <li>POSICION: {product.posicion} </li>
//                 <li>PAIS: {product.pais} </li>
//               </>
//             ) : null}
//           </ul>
//         </section>
//       </div>
//       </Box>
//     </Container>
//   );
// };

// export default SingleProduct;
