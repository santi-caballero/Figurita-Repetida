import React, { useState } from "react";
import {
  Paper,
  TextField,
  TextArea,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const userTypeOnChange = (event) => {
    setUserType(event.target.value);
  };

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    const nombreYapellido = name.split(" ");
    axios
      .post("/api/usuario/registro", {
        username,
        rol: userType,
        nombre: nombreYapellido[0],
        apellido: nombreYapellido[1],
        password,
        email,
      })
      .then(() => navigate("/login"))
      .catch(() => alert("Falló el registro"));
    //Body: Obj {username, tipo, nombre, contraseña, email}
  };
  const handleAlreadyRegister = (event) => {};

  const paperStyle = {
    padding: 20,
    width: 320,
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <TextField
          sx={{ marginTop: "5px" }}
          value={username}
          id="outlined-basic-user"
          label="Nombre de Usuario"
          type="text"
          fullWidth
          required
          onChange={usernameOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={name}
          id="outlined-basic-name"
          label="Nombre Completo"
          type="text"
          fullWidth
          required
          onChange={nameOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={email}
          id="outlined-basic-email"
          label="Email"
          type="text"
          fullWidth
          required
          onChange={emailOnChange}
        />
        <TextField
          sx={{ marginTop: "15px" }}
          value={password}
          id="outlined-basic-password"
          label="Password"
          type="text"
          fullWidth
          required
          onChange={passwordOnChange}
        />
        <Button
          sx={{ marginTop: "20px" }}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          component="label"
          fullWidth
        >
          Registrarse
        </Button>
        <Typography sx={{ textAlign: "center", marginTop: "25px" }}>
          Ya estas registrado?
        </Typography>
        <Button
          sx={{ marginTop: "20px" }}
          onClick={handleAlreadyRegister}
          type="button"
          variant="contained"
          component="label"
          fullWidth
        >
          Login
        </Button>
      </Paper>
    </Grid>
  );
};

export default Register;
