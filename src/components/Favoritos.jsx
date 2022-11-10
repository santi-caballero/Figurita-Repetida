import React from "react";

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
  }, [user.id]);

  return (
    <div>
      {user.favoritos ? (
        <GrillaFavs productos={user.favoritos} />
      ) : (
        <h1> Vacio</h1>
      )}
    </div>
  );
};

export default Favoritos;
