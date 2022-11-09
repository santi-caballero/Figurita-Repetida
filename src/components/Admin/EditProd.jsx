import React from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

const EditProd = () => {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [posicion, setPosicion] = useState("");
  const [pais, setPais] = useState("");
  const [rareza, setRareza] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const [productos, setProductos] = useState([]);
  const [prod, setProd] = useState("");

  useEffect(() => {
    axios.get("/api/productos").then((res) => setProductos(res.data));
  }, [productos]);

  const handleProd = (e) => {
    e.preventDefault();
    setProd(e.target.value);
    axios
      .get(`/api/productos/${e.target.value}`)
      .then((res) => setTipo(res.data.tipo));
  };
  const navigate = useNavigate();

  const handleNombre = (e) => {
    e.preventDefault();
    setNombre(e.target.value);
  };
  const handleApellido = (e) => {
    e.preventDefault();
    setApellido(e.target.value);
  };
  const handlePosicion = (e) => {
    e.preventDefault();
    setPosicion(e.target.value);
  };
  const handlePais = (e) => {
    e.preventDefault();
    setPais(e.target.value);
  };
  const handleRareza = (e) => {
    e.preventDefault();
    setRareza(e.target.value);
  };
  const handlePrecio = (e) => {
    e.preventDefault();
    setPrecio(e.target.value);
  };
  const handleStock = (e) => {
    e.preventDefault();
    setStock(e.target.value);
  };
  const resetAll = () => {
    setTipo("");
    setNombre("");
    setApellido("");
    setPosicion("");
    setPais("");
    setRareza("");
    setPrecio(0);
    setStock(0);
    setProd("");

    document.getElementById("NOMBRE").value = "";
    document.getElementById("APELLIDO").value = "";
    document.getElementById("posicion-select").value = "";
    document.getElementById("productos-select").value = "";
    document.getElementById("PAIS").value = "";
    document.getElementById("rareza-select").value = "";
    document.getElementById("PRECIO").value = "";
    document.getElementById("STOCK").value = "";
  };

  const handleSendEdit = (e) => {
    e.preventDefault();
    let newObj = {};
    if (tipo !== "") newObj.tipo = tipo;
    if (nombre !== "") newObj.nombre = nombre;
    if (apellido !== "") newObj.apellido = apellido;
    if (posicion !== "") newObj.posicion = posicion;
    if (pais !== "") newObj.pais = pais;
    if (rareza !== "") newObj.rareza = rareza;
    if (precio !== 0) newObj.precio = precio;
    if (stock !== 0) newObj.stock = stock;
    console.log("El id del producto es", prod);
    console.log("Se editarán los siguientes campos", newObj);
    axios.put(`/api/productos/${prod}`, newObj).then((res) => console.log(res));
    resetAll();
    navigate("/admin");
  };
  const handleDeleteProd = (e) => {
    e.preventDefault();
    console.log("Se eliminará el siguiente producto", prod);
    axios.delete(`/api/productos/${prod}`).then((res) => console.log(res));
    resetAll();
    navigate("/admin");
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",

          marginTop: "50px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <Grid container>
          <Typography variant="h4" gutterBottom>
            Editar producto
          </Typography>
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          marginTop: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <Grid>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Producto</InputLabel>
            <Select
              labelId="productos-select"
              id="productos-select"
              label="Seleccionar Usuario"
              value={prod}
              displayEmpty
              onChange={handleProd}
            >
              {productos.length
                ? productos.map((producto, i) => (
                    <MenuItem key={i} tipo={producto.tipo} value={producto.id}>
                      ({producto.tipo}) - {producto.nombreCompleto}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>
      </Container>
      {tipo ? (
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            marginTop: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
          }}
        >
          {tipo !== "jugador" ? (
            <Grid container>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Nombre"
                  id="NOMBRE"
                  placeholder="Ingresa Nombre"
                  fullWidth
                  required
                  onChange={handleNombre}
                />
              </Grid>

              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Rareza</InputLabel>
                  <Select
                    labelId="rareza-select"
                    id="rareza-select"
                    label="Rareza"
                    value={rareza}
                    displayEmpty
                    onChange={handleRareza}
                  >
                    <MenuItem value={0}>Normal</MenuItem>
                    <MenuItem value={1}>Bronce</MenuItem>
                    <MenuItem value={2}>Plata</MenuItem>
                    <MenuItem value={3}>Oro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Precio"
                  placeholder="Ingresa Precio"
                  fullWidth
                  required
                  id="PRECIO"
                  onChange={handlePrecio}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Stock"
                  id="STOCK"
                  placeholder="Ingresa Stock"
                  fullWidth
                  required
                  onChange={handleStock}
                />
              </Grid>
              <Grid>
                <Button
                  sx={{ m: 1, width: 300 }}
                  variant="contained"
                  component="label"
                >
                  Cargar imagen
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleSendEdit}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Guardar cambios
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleDeleteProd}
                  type="button"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Eliminar Producto
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Nombre"
                  id="NOMBRE"
                  placeholder="Ingresa Nombre"
                  fullWidth
                  required
                  onChange={handleNombre}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Apellido"
                  id="APELLIDO"
                  placeholder="Ingresa Apellido"
                  fullWidth
                  required
                  onChange={handleApellido}
                />
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Posicion</InputLabel>
                  <Select
                    labelId="posicion-select"
                    id="posicion-select"
                    label="Posicion"
                    value={posicion}
                    displayEmpty
                    onChange={handlePosicion}
                  >
                    <MenuItem value={"portero"}>Portero</MenuItem>
                    <MenuItem value={"defensor"}>Defensor</MenuItem>
                    <MenuItem value={"central"}>Central</MenuItem>
                    <MenuItem value={"delantero"}>Arquero</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Pais"
                  id="PAIS"
                  placeholder="Ingresa Pais"
                  fullWidth
                  required
                  onChange={handlePais}
                />
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Rareza</InputLabel>
                  <Select
                    labelId="rareza-select"
                    id="rareza-select"
                    label="Rareza"
                    value={rareza}
                    displayEmpty
                    onChange={handleRareza}
                  >
                    <MenuItem value={0}>Normal</MenuItem>
                    <MenuItem value={1}>Bronce</MenuItem>
                    <MenuItem value={2}>Plata</MenuItem>
                    <MenuItem value={3}>Oro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Precio"
                  id="PRECIO"
                  placeholder="Ingresa Precio"
                  fullWidth
                  required
                  onChange={handlePrecio}
                />
              </Grid>
              <Grid>
                <TextField
                  sx={{ m: 1, width: 300 }}
                  label="Stock"
                  id="STOCK"
                  placeholder="Ingresa Stock"
                  fullWidth
                  required
                  onChange={handleStock}
                />
              </Grid>
              <Grid>
                <Button
                  sx={{ m: 1, width: 300 }}
                  variant="contained"
                  component="label"
                >
                  Cargar imagen
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleSendEdit}
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Guardar cambios
                </Button>
              </Grid>
              <Grid>
                <Button
                  onClick={handleDeleteProd}
                  type="button"
                  variant="contained"
                  sx={{ m: 1, width: 300 }}
                >
                  Eliminar Producto
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
      ) : null}
    </>
  );
};

export default EditProd;
