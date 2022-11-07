import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  InputBase,
  Link,
  Avatar,
  Menu,
  TextField,
  MenuItem,
} from "@mui/material";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import axios from "axios";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("/api/usuario/me")
      .then((result) => setUser(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleLogOut = () => {
    axios.post("/api/usuario/logout").then((result) => setUser(result.data));
  };
  const navigate = useNavigate();
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 50px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
  }));

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/buscar/${input}`);
    document.getElementById("inputito").value = "";
  };

  return (
    <AppBar sx={{ background: "#009c7" }} position="static">
      {user.email ? (
        <Toolbar>
          <Link href="/">
            <Typography sx={{ color: "red" }}>LOGO</Typography>
          </Link>
          <form onSubmit={handleSubmit}>
            <TextField
              id="inputito"
              type="search"
              variant="outlined"
              placeholder="Buscar..."
              onChange={handleChange}
            />
          </form>
          <Typography sx={{ marginLeft: "15%" }}>{user.username}</Typography>
          <Avatar
            src="/broken-image.jpg"
            sx={{ marginLeft: "auto", background: "#155b87" }}
            onClick={(e) => setOpen(true)}
          />
          <Link href="/:user/cart" target="_blank" marginLeft="3%">
            <ShoppingCartSharpIcon
              sx={{ color: "#155b87", width: 30, height: 30 }}
            />
          </Link>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={(e) => setOpen(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Link href="/:user/favorites" underline="none" color="inherit">
              <MenuItem>Mis favoritos</MenuItem>
            </Link>
            <MenuItem onClick={handleLogOut}>Cerrar sesion</MenuItem>
          </Menu>
        </Toolbar>
      ) : (
        <Toolbar>
          <Link href="/">
            <Typography sx={{ color: "red" }}>LOGO</Typography>
          </Link>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{
                marginLeft: "30%",
                background: "white",
              }}
              fullWidth
              id="inputito"
              type="search"
              variant="outlined"
              placeholder="Buscar..."
              onChange={handleChange}
            />
          </form>
          <Button variant="contained" sx={{ marginLeft: "auto" }} href="/login">
            Iniciar sesion
          </Button>
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            href="/register"
          >
            Registrate
          </Button>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
