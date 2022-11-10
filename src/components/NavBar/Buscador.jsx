import React from "react";
import { useState, useEffect } from "react";
import { TextField, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router";

const Buscador = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/buscar/${input}`);
    document.getElementById("search-input").value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{
          width: "400px",
          margin: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
        fullWidth
        id="search-input"
        placeholder="Buscar producto"
        onChange={handleChange}
      />
    </form>
  );
};

export default Buscador;
