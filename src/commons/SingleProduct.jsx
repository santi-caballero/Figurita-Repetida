import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import UnstyledSelectsMultiple from "./utils/cantidadDeProductos";
import { useEffect, useState } from "react";
import axios from "axios";
import fotoMessi from "./utils/messi.jpeg"

export default function SingleProduct() {
  const [producto, setProducto] = useState({});

  const addProdToCart = () => {
 
  };

  useEffect(() => {
    axios.get(`/api/productos/${producto.id}`).then((figu) => {
      setProducto(figu.data);
    });
  }, [producto]);

  return (
    <div className="singleProductGeneral">
        <div className="singleProductLeft">
          <Typography variant="h4" color={"#03045E"} >
            Figurita Repetida
          </Typography>
          <img src={fotoMessi} alt="messi" className="singleProductLeftImagen"/>
          {/* ACA EN VEZ DE CARD VA LA IMAGEN DE LA FIGU NO LA CARD, SIMPLEMENTE PARA VER COMO QUEDA ESTA LA CARD */}
            <div className="singleProductDescription">
              <Typography
                variant="h5"
                color={"#03045E"}
              >
                DESCRIPCION:
              </Typography>
              <div>
                <Typography variant="h6" color={"#03045E"}>
                  NOMBRE: Lionel Andres{producto.nombre}
                </Typography>
                {/* {producto.type === "jugador" ? (
                  <> */}
                    <Typography variant="h6" color={"#03045E"}>
                      APELLIDO: Messi{producto.apellido}{" "}
                    </Typography>
                    <Typography variant="h6" color={"#03045E"}>
                      POSICION: Delantero{producto.posicion}{" "}
                    </Typography>
                    <Typography variant="h6" color={"#03045E"}>
                      PAIS: Argentina{producto.pais}{" "}
                    </Typography>
                  {/* </>
                ) : null} */}
              </div>
            </div>
        </div>
        <div className="singleProductRigth">
          <Stack spacing={2} className="singleProductButtons">
            <Typography color={"#03045E"} marginLeft="10px">Añadir al carrito:</Typography>
            <UnstyledSelectsMultiple />
            <Button
              onClick={() => addProdToCart()}
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
            >
              <Typography color={"#03045E"}>ADD TO CART</Typography>
            </Button>
            <Button variant="contained" startIcon={<FavoriteIcon />}>
              <Typography color={"#03045E"}>ADD TO FAVORITES</Typography>
              <IconButton aria-label="add to favorites"></IconButton>
            </Button>
          </Stack>
        </div>
    </div>
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