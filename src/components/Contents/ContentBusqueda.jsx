import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Grilla from "../Grids/Grid";

const ContentBusqueda = () => {
  const nombre = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/productos/buscar/${nombre.nombre}`)
      .then((res) => setProductos(res.data));
  }, []);

  return <Grilla productos={productos} />;
};

export default ContentBusqueda;