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
import { useParams } from "react-router";

export default function SingleProduct() {
  const idProducto = useParams();
  const [producto, setProducto] = useState({});

  const addProdToCart = () => {};

  useEffect(() => {
    axios.get(`/api/productos/${idProducto.id}`).then((figu) => {
      setProducto(figu.data);
    });
  }, [producto]);

  return (
    <div className="singleProductGeneral">
      <div className="singleProductLeft">
        <Typography variant="h4" color={"#03045E"}>
          Figurita Repetida
        </Typography>
        <img
          src={producto.urlImagen}
          alt="Foto de producto"
          className="singleProductLeftImagen"
        />
        {/* ACA EN VEZ DE CARD VA LA IMAGEN DE LA FIGU NO LA CARD, SIMPLEMENTE PARA VER COMO QUEDA ESTA LA CARD */}
        <div className="singleProductDescription">
          <Typography variant="h5" color={"#03045E"}>
            DESCRIPCION:
          </Typography>
          <div>
            <Typography variant="h6" color={"#03045E"}>
              NOMBRE: {producto.nombre}
            </Typography>
            {producto.tipo === "jugador" ? (
              <>
                <Typography variant="h6" color={"#03045E"}>
                  APELLIDO: {producto.apellido}
                </Typography>
                <Typography variant="h6" color={"#03045E"}>
                  POSICION: {producto.posicion}
                </Typography>
                <Typography variant="h6" color={"#03045E"}>
                  PAIS: {producto.pais}
                </Typography>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="singleProductRigth">
        <Stack spacing={2} className="singleProductButtons">
          <Typography color={"#03045E"} marginLeft="10px">
            Precio: ${producto.precio}
          </Typography>
          <Typography color={"#03045E"} marginLeft="10px">
            Añadir al carrito:
          </Typography>
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
