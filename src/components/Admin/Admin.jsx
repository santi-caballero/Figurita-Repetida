import React, { useState } from "react";
import { Paper, Button, Grid } from "@mui/material";

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
  return (
    <>
      <Paper
        sx={{
          margin: "auto",
          marginTop: "100px",
          width: "50%",
          padding: 4,
          maxWidth: "900px",
          minWidth: "360px",
          borderRadius: 3,
        }}
        elevation={10}
      >
        {" "}
        <Grid>
          <Button
            onClick={toggleAdd}
            type="button"
            variant="contained"
            sx={{ m: 1, width: 300 }}
          >
            Agregar Producto
          </Button>
        </Grid>
        {addBtn ? <AddProd /> : null}
        <Grid>
          <Button
            onClick={toggleEdit}
            type="button"
            variant="contained"
            sx={{ m: 1, width: 300 }}
          >
            Editar Producto
          </Button>
        </Grid>
        {editBtn ? <EditProd /> : null}
        <Grid>
          <Button
            onClick={toggleUserBtn}
            type="button"
            variant="contained"
            sx={{ m: 1, width: 300 }}
          >
            Editar Usuarios
          </Button>
        </Grid>
        {userBtn ? <EditUser /> : null}
      </Paper>
    </>
  );
};

export default Admin;
