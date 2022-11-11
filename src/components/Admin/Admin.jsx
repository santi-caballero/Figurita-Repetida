import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Button, Grid, Typography } from "@mui/material";
import gif from "../../utils/noadmin.gif";

import AddProd from "./AddProd";
import EditProd from "./EditProd";
import EditUser from "./EditUser";

const Admin = () => {
  const [addBtn, setAddBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [userBtn, setUserBtn] = useState(false);
  const toggleAdd = () => {
    addBtn ? setAddBtn(false) : setAddBtn(true);
  };
  const toggleEdit = () => {
    editBtn ? setEditBtn(false) : setEditBtn(true);
  };
  const toggleUserBtn = () => {
    userBtn ? setUserBtn(false) : setUserBtn(true);
  };

  const paperStyle = {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    paddingTop: 40,
    width: "30%",
    margin: "auto",
    borderRadius: 3,
    borderRadius: "10px",
  };

  const user = useSelector((state) => state.user);

  return (
    <Paper elevation={10} style={paperStyle}>
      {user.rol !== "admin" ? (
        <>
          <img src={gif} />
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginBottom: "25px" }}
          >
            Opciones de Administrador
          </Typography>
          <Grid>
            <hr />
            <Button
              onClick={toggleAdd}
              sx={{ marginBottom: "15px", marginTop: "10px" }}
              type="button"
              variant="contained"
              fullWidth
            >
              Agregar Producto
            </Button>
          </Grid>
          {addBtn ? <AddProd /> : null}
          <Grid>
            <hr />
            <Button
              onClick={toggleEdit}
              sx={{ marginBottom: "15px", marginTop: "10px" }}
              type="button"
              variant="contained"
              fullWidth
            >
              Editar Producto
            </Button>
          </Grid>
          {editBtn ? <EditProd /> : null}
          <Grid>
            <hr />
            <Button
              onClick={toggleUserBtn}
              sx={{ marginBottom: "15px", marginTop: "10px" }}
              type="button"
              variant="contained"
              fullWidth
            >
              Editar Usuarios
            </Button>
          </Grid>
          {userBtn ? <EditUser /> : null}
        </>
      )}
    </Paper>
  );
};

export default Admin;
