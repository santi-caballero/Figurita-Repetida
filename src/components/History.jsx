import React from "react";
import { Paper, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import GrillaCarrito from "./Grids/GridCarrito";
import CardHistorial from "../commons/Cards/CardHistorial";

const History = () => {
  const user = useSelector((store) => store.user);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/carritos/historial/${user.id}`)
      .then((res) => setHistorial(res.data));
  }, [user]);

  return (
    <>
      <Typography
        className="promo"
        fontFamily={"'Bungee Spice', cursive"}
        gutterBottom
        variant="h4"
        component="div"
        marginTop="3%"
      >
        Historial de compras de {user.nombre}
      </Typography>
      <Paper
        sx={{
          //   display: "flex",
          margin: "auto",
          marginTop: "100px",
          width: "50%",
          padding: 4,
          maxWidth: "900px",
          minWidth: "360px",
          borderRadius: 3,
        }}
        elevation={10}
      >
        {/* <Button
          onClick={() => {
            console.log(historial);
          }}
        >
          PULSAME
        </Button> */}
        <Grid>
          {historial.length
            ? historial.map((compra, i) => (
                <>
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <CardHistorial carrito={compra} />
                  </Grid>
                  {/* <GrillaCarrito productos={compra.pedidos} /> */}
                  {/* <Grid key={i}>
                    <Grid>
                      <Grid>
                        Compra ID- {compra.id}- 3 pedidos
                        <Grid>Comprado ?{compra.comprado} true</Grid>
                      </Grid>

                      <Grid>Cantidad de Pedidos {compra.pedidos.length}</Grid>
                      <Grid>
                        Pedidos:
                        {compra.pedidos.map((pedido, k) => (
                          <h4 key={k}>
                            ID {pedido.id} , {pedido.producto.nombreCompleto},
                            cantidad {pedido.cantidad}, precio total =
                            {pedido.cantidad * pedido.producto.precio}
                          </h4>
                        ))}
                        precio total total de todo todo = {compra.preciototal}
                      </Grid>
                      <hr />
                    </Grid>
                  </Grid> */}
                </>
              ))
            : null}
        </Grid>
      </Paper>
    </>
  );
};

export default History;
