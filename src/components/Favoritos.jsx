import React from "react";
import { Paper, Typography } from "@mui/material";

import { useEffect } from "react";

import GrillaFavs from "../components/Grids/GrillaFavs";
import { useSelector, useDispatch } from "react-redux";
import { obtenerFavoritos } from "../states/user";
const Favoritos = () => {
  // const [user, setUser] = useState([]);
  const user = useSelector((store) => store.user);
  //const [favoritos, setFavoritos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerFavoritos(user.id));
  }, [user]);

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: "60%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
    marginBottom: "100px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <Typography>
        <h1 className="promo"> Favoritos</h1>
      </Typography>
      {user.favoritos ? (
        <GrillaFavs productos={user.favoritos} />
      ) : (
        <h1> Vacio</h1>
      )}
    </Paper>
  );
};

export default Favoritos;
