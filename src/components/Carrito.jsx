import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GrillaCarrito from "./Grids/GridCarrito";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { calcularTotal, limpiarCart, obtenerItems } from "../states/cart";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Paper, Grid } from "@mui/material";

const Carrito = () => {
  const navigate = useNavigate();
  // const [user, setUser] = useState([]);
  // const [carrito, setCarrito] = useState([]);
  // let contenedor = [];

  const user = useSelector((store) => store.user);
  const carrito = useSelector((store) => store.cart);
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   {
  //     user.id == null
  //       ? console.log("es null", user)
  //       : dispatch(obtenerItems(user.id));
  //   }
  // }, [user.id]);

  // useEffect(() => {
  //   {
  //     user.id == null
  //       ? console.log("es null", user)
  //       : dispatch(calcularTotal());
  //   }
  // }, [cartItems]);

  // const handleCompra = () => {
  //   if (carrito.id) {
  //     axios
  //       .put(`/api/carritos/comprar/${carrito.id}`)

  //       .catch((error) => console.log(error));
  //   } else {
  //     alert("Debe ingresar productos en su carrito");
  //   }
  // };
  const handleLimpiar = () => {
    dispatch(limpiarCart(carrito.id));
    window.location.reload(false);
    // axios
    //   .delete(`/api/carritos/borrarTodos/${carrito.id}`)

    //   .catch((error) => console.log(error));
  };

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
        <Typography mt="6%" mr="6%" mb="10%" align="center" variant="h4">
          {" "}
          Estos son los productos de tu carrito
        </Typography>
        <div className="carrito">
          {carrito.cartItems ? (
            <GrillaCarrito productos={carrito.cartItems} />
          ) : null}
          <hr />
          <Typography
            mt="4%"
            mr="6%"
            mb="4%"
            align="right"
            variant="h4"
            component="h4"
          >
            Total a pagar: $ {carrito.total}
          </Typography>
          <Grid
            sx={{
              height: "60px",
              display: "flex",
              justifyContent: "space-between",
              margin: "4%",
            }}
          >
            <Button
              sx={{
                width: "220px",
              }}
              variant="contained"
              endIcon={<DeleteIcon />}
              onClick={() => {
                handleLimpiar();
              }}
            >
              Limpiar Carrito
            </Button>

            <Button
              sx={{
                width: "220px",
              }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                navigate("/:user/checkout");
              }}
            >
              Ir al checkout
            </Button>
          </Grid>
        </div>
      </Paper>
    </>
  );
};
export default Carrito;
