import { Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Botonera = () => {
  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    axios
      .post("/api/usuario/logout")
      .then((result) => console.log(result.data));
  };

  const navigate = useNavigate();

  return (
    <>


      <Stack direction="row" spacing={2}>
        {user.rol == "admin" ? (
          <Button href={"/admin"} variant="contained" color="secondary">
            ADMIN
          </Button>
        ) : null}
        {user.id ? (
          <>
            <Button
              href={"/:user/favorites"}
              variant="contained"
              color="secondary"
            >
              FAVS
            </Button>

            <Button href={"/history"} variant="contained" color="secondary">
              HISTORIAL
            </Button>
          </>
        ) : null}
        <Link to={"/:user/cart"} underline="none" color="secondary">
          <ShoppingCartSharpIcon
            sx={{ color: "secondary", width: 30, height: 30 }}
          />
        </Link>
        {user.id ? (
          <Button
            href={"/"}
            variant="contained"
            onClick={() => handleLogOut()}
            color="secondary"
          >
            LOGOUT
          </Button>
        ) : (
          <Button href={"/login"} variant="contained" color="secondary">
            LOGIN
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Botonera;
