import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { eliminarItem, obtenerItems } from "../../states/cart";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CardCarrito({ product, cantidad, id }) {
  const user = useSelector((state) => state.user);

  const [producto, setProducto] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    // axios
    //   .delete(`/api/carritos/borrarUno/${id}`)
    //   .catch((error) => console.log(error));
    dispatch(eliminarItem(id));
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(obtenerItems(user.id));
  }, [user.id]);
  return (
    <Paper
      sx={{
        p: 2,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={product.urlImagen} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                fontFamily={"'Bungee Spice', cursive"}
                gutterBottom
                variant="h5"
                component="div"
              >
                {product.nombre} {product.apellido}
              </Typography>
              <Typography
                fontFamily={"'Bungee Spice', cursive"}
                variant="h5"
                gutterBottom
              >
                Delantero
              </Typography>
              <Typography variant="h5"> Cantidad {cantidad}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              ${product.precio}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography sx={{ textAlign: "Right" }} variant="body2">
          <Button
            onClick={() => {
              handleRemove();
            }}
          >
            <Grid item xs={8}>
              <DeleteIcon />
            </Grid>{" "}
            Eliminar del carrito
          </Button>
        </Typography>
      </Grid>
    </Paper>
  );
}
