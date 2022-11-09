import React from "react";
import { Paper, Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [user, setUser] = useState("");
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    axios.get("/api/usuario/me").then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/carritos/historial/1`)
      .then((res) => setHistorial(res.data));
  }, []);

  return (
    <>
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
        <Button onClick={console.log(historial)}>PULSAME</Button>
        <Grid>
          CLIENTE ID 1 (2 carritos)
          {historial.length
            ? historial.map((compra, i) => (
                <>
                  <Grid key={i}>
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
                  </Grid>
                </>
              ))
            : null}
        </Grid>
      </Paper>
    </>
  );
};

export default History;
