import React from "react";
import Cardd from "../commons/Card";
import fotoMessi from "../commons/utils/messi.jpeg";
import "./componentClass.css";
import Link from "react";

const Grid = ({productos}) => {
  // if(!productos) return <p>Esa figurita no existe</p>

  const producto = {
    type: "jugador",
    nombre: "Lionel Andres",
    apellido: "Messi",
    posicion: "Delantero",
    pais: "Argentina",
    precio: "que juegue messi no tiene precio",
    stock: 1,
    id: 4,
  };

  return (
    <section className="gridContainer">
      {/* CUANDO TENGAMOS LA INFO REAL*/}
      {/* {productos.map((producto) => (
        <Cardd
          ={()=>{handleProducto()}}
          //margenes tamaños
          key={producto.id}

          HAY QUE PASARLE A CARD LA IMAGEN
          producto={producto}
          fotoMessi={fotoMessi}
          producto={produto}
        />
      ))} */}
      {/* //PRUEBA ELEMENTO POR ELEMENTO */}

      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
      <Cardd fotoMessi={fotoMessi} />
    </section>
  );
};

export default Grid;
