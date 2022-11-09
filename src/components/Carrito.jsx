import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GrillaCarrito from "./GridCarrito";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { calcularTotal, obtenerItems } from "../states/cart";
const Carrito = () => {
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

  const handleCompra = () => {
    if (carrito.id) {
      axios
        .put(`/api/carritos/comprar/${carrito.id}`)

        .catch((error) => console.log(error));
    } else {
      alert("Debe ingresar productos en su carrito");
    }
  };
  const handleLimpiar = () => {
    axios
      .delete(`/api/carritos/borrarTodos/${carrito.id}`)

      .catch((error) => console.log(error));
  };
  return (
    <div className="carrito">
      <Button
        sx={{
          marginLeft: "40%",
          marginTop: "2%",
          marginBottom: "2%",
          borderRadius: 3,
          background: "#CAF0F8",
          fontWeight: "bold",
          color: "#023E8A",
        }}
        onClick={() => handleCarrito()}
      >
        {" "}
        Actualizar Carrito
      </Button>
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
          handleCompra();
        }}
      >
        Finalizar Compra
      </Button>
    </div>
  );
};
export default Carrito;
