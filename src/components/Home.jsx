import React from "react";
import Grilla from "./Grids/Grid";
import Carrousel from "./Carrousel";
<<<<<<< HEAD
import { Paper, Typography } from "@mui/material";
=======
import { Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Paginacion from "./Paginacion";
>>>>>>> 97961474 (Paginación)

const Home = ({ productos }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostsPerPage] = useState(9);
  useEffect(() => {
    setProducts(productos);
  });
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      {/* <Carrousel /> */}

<<<<<<< HEAD
      <h1 className="promo"> Las mas vendidas</h1>

      <Grilla productos={productos} />
=======
      <Typography>
        <h1 className="promo"> Las mas vendidas</h1>
      </Typography>

      <Grilla productos={currentPosts} />

      <Paginacion
        postsPerPage={postPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
>>>>>>> 97961474 (Paginación)
    </Paper>
  );
};

export default Home;
