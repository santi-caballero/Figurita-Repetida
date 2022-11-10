import React from "react";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";

import DetallesHistorial from "./DetallesHistorial";

const Checkout = ({ productos }) => {
  const handleCompra = () => {
    if (carrito.total !== 0) {
      axios
        .put(`/api/carritos/comprar/${carrito.id}`)

        .catch((error) => console.log(error));
      Swal.fire(
        "Su compra ha sido realizada!",
        "Le vamos a estar enviando un mail con toda la informacion",
        "success"
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe tener productos en su carrito",
        footer: '<a href="/">Volver a comprar productos</a>',
      });
    }
  };
  const carrito = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const paperStyle = {
    display: "flex",
    padding: 20,
    width: 500,
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <div>
        {console.log(carrito)}
        <Typography
          fontFamily={"'Bungee Spice', cursive"}
          variant="h4"
          color={"#03045E"}
        >
          Finalice su compra
        </Typography>
        <h2>Datos del usuario:</h2>
        <h4>Nombre: {user.nombre}</h4>
        <h4>Apellido: {user.apellido}</h4>
        <h4>Email: {user.email}</h4>

        <DetallesHistorial detalles={carrito.cartItems} />
        <h1>Precio final: ${carrito.total}</h1>
        <Button
          sx={{
            marginRight: "3%",
            marginLeft: "80%",
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
    </Paper>
  );
};

export default Checkout;
