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

} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const EditUser = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get("/api/usuario").then((res) => setUsuarios(res.data));
  }, [usuarios]);

  const handleUser = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };
  const handleAdminize = () => {
    console.log("Se ha ascendido a admin al user ");
    console.log(user);
    axios
      .put(`/api/usuario/promover/${user}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser("");
  };

  const handleDelete = () => {
    console.log("Se eliminara  ");
    console.log(user);
    axios
      .delete(`/api/usuario/eliminar/${user}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUser("");
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
            Editar usuarios
          </Typography>
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
        }}
      >
        <Grid>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Seleccionar usuario</InputLabel>
            <Select
              labelId="usuarios-select"
              id="usuarios-select"
              label="Seleccionar Usuario"
              value={user}
              displayEmpty
              onChange={handleUser}
            >
              {usuarios.length
                ? usuarios.map((usuario, i) => (
                    <MenuItem key={i} value={usuario.id}>
                      {usuario.nombreCompleto}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid>
          <Grid>
            <Button
              onClick={() => handleAdminize()}
              variant="contained"
              sx={{ m: 1, width: 140 }}
            >
              ADMINIZAR
            </Button>
          </Grid>
          <Grid>
            <Button
              onClick={() => {
                handleDelete();
              }}
              variant="contained"
              sx={{ m: 1, width: 140 }}
            >
              ELIMINAR
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditUser;
