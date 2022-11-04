import React from "react";
import Grilla from "./Grid";

const Home = ({ productos }) => {
  return (
    <div>
      <div className="carrousel">Futuro Carrousel</div>
      <Grilla productos={productos} />
    </div>
  );
};

export default Home;
