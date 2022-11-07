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
    <div className="todo">
      <div className="singleProductGeneral">
        <div className="singleProductLeft">
          <Typography
            fontFamily={"'Bungee Spice', cursive"}
            variant="h4"
            color={"#03045E"}
          >
            {producto.nombre} {producto.apellido}
          </Typography>
          <img
            src={producto.urlImagen}
            alt="Foto de producto"
            className="singleProductLeftImagen"
          />
          {/* ACA EN VEZ DE CARD VA LA IMAGEN DE LA FIGU NO LA CARD, SIMPLEMENTE PARA VER COMO QUEDA ESTA LA CARD */}
          <div className="singleProductDescription">
            <Typography
              fontFamily={"'Anton', sans-serif"}
              variant="h5"
              color={"#03045E"}
            >
              DESCRIPCION:
            </Typography>
            <div>
              {producto.tipo === "jugador" ? (
                <>
                  <Typography
                    fontFamily={"'Anton', sans-serif"}
                    variant="h6"
                    color={"#03045E"}
                  >
                    POSICION: {producto.posicion}
                  </Typography>
                  <Typography
                    fontFamily={"'Anton', sans-serif"}
                    variant="h6"
                    color={"#03045E"}
                  >
                    PAIS: {producto.pais}
                  </Typography>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="singleProductRigth">
          <Stack spacing={2} className="singleProductButtons">
            <Typography
              fontFamily={"'Anton', sans-serif"}
              color={"#03045E"}
              marginLeft="10px"
            >
              Precio: ${producto.precio}
            </Typography>
            <Typography
              fontFamily={"'Anton', sans-serif"}
              color={"#03045E"}
              marginLeft="10px"
            >
              Añadir al carrito:
            </Typography>
            <UnstyledSelectsMultiple />
            <Button
              sx={{
                borderRadius: 3,
                background: "#CAF0F8",

                color: "#023E8A",
              }}
              onClick={() => addProdToCart()}
              variant="contained"
              endIcon={<AddShoppingCartIcon />}
            >
              <Typography fontWeight="bold" color={"#03045E"}>
                ADD TO CART
              </Typography>
            </Button>
            <Button
              sx={{
                borderRadius: 3,
                background: "#CAF0F8",
                fontWeight: "bold",
                color: "#023E8A",
              }}
              variant="contained"
              startIcon={<FavoriteIcon />}
            >
              <Typography fontWeight="bold" color={"#03045E"}>
                ADD TO FAVORITES
              </Typography>
              <IconButton aria-label="add to favorites"></IconButton>
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}
