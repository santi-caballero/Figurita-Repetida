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
  return (
    <div className="carrito">
      {carrito.cartItems ? <GrillaCarrito productos={carrito.cartItems} /> : ""}
      <Typography mr="3%" mb="3%" align="right" variant="h4" component="h4">
        Total a pagar: ${carrito.total}
      </Typography>
      ;
      <Button
        sx={{
          marginRight: "3%",
          marginLeft: "89%",
          marginBottom: "1%",
          borderRadius: 3,
          background: "#CAF0F8",
          fontWeight: "bold",
          color: "#023E8A",
        }}
        variant="contained"
        endIcon={<DeleteIcon />}
        onClick={() => {
          handleLimpiar();
        }}
      >
        Limpiar Carrito
      </Button>
      {""}
      <Button
        sx={{
          marginRight: "3%",
          marginLeft: "89%",
          borderRadius: 3,
          background: "#CAF0F8",
          fontWeight: "bold",
          color: "#023E8A",
        }}
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => {
          navigate("/:user/checkout");
        }}
      >
        Ir al checkout
      </Button>
    </div>
  );
};
export default Carrito;
