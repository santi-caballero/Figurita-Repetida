import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import SingleProduct from "./commons/SingleProduct";
import CardProduct from "./commons/Card";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="todo">
      <div className="side">
        <Sidebar />{" "}
      </div>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Grid />} />
          <Route path="/figurita/:id" element={<h1>figurita</h1>} />
          <Route path="/productos/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:user/favorites" element={<h1>favorites</h1>} />
          <Route path="/:user/cart" element={<h1>cart</h1>} />
          <Route path="/:user/checkout" element={<h1>checkout</h1>} />
        </Routes>{" "}
      </div>
      </div>
)}

export default App;
