import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  email: null,
  nombre: null,
  apellido: null,
  id: null,
  favoritos: [],
};

//creo la fn async obtenerFavoritos
//Luego en los extraReducers del slice manejo el estado local de user con los estados de la promesa (fullfilled, rejected, pending )
// [obtenerFavoritos.fullfilled]: (state, action) =>

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const { email, password } = user;
    // console.log("mis datos de usuario", email, "==", password);
    const respuesta = await axios.post("/api/usuario/login", {
      email: email,
      password: password,
    });
    console.log(respuesta.data);
    return respuesta.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Credenciales incorrectas");
  }
});

export const isLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (thunkAPI) => {
    try {
      const respuesta = await axios.get("/api/usuario/me");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("No se encuentra usuario");
    }
  }
);

export const obtenerFavoritos = createAsyncThunk(
  "user/obtenerFavoritos",
  async (idUser, thunkAPI) => {
    try {
      console.log("mi user es11", idUser);
      const respuesta = await axios.get(`/api/favoritos/${idUser}`);
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const agregarFavorito = createAsyncThunk(
  "user/agregarFavorito",
  async (data, thunkAPI) => {
    const { idUser, idProducto } = data;
    try {
      console.log("Mi usuario es: ", idUser, "mi producto es: ", idProducto);
      const respuesta = await axios.post("/api/favoritos");
      return respuesta.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => (state.user = action.payload), //cambio el estado actual de user por el nuevo usuario
    setUser: (state, action) => state.user, //simplemente retorno el usuario
  },
  extraReducers: {
    [obtenerFavoritos.fulfilled]: (state, action) => {
      state.favoritos = action.payload;
    },
    [agregarFavorito.fulfilled]: (state, action) => {
      console.log("Mi payload al agregar favorito es ", action.payload);
      state.favoritos.push(action.payload);
      return state;
    },
    [login.fulfilled]: (state, action) => {
      // console.log("me esta llegando", action.payload);
      // state.user = action.payload;
      //return state;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.id = action.payload.id;
    },
    [login.rejected]: (state) => {
      return state;
    },
    [isLoggedIn.fulfilled]: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.nombre = action.payload.nombre;
      state.apellido = action.payload.apellido;
      state.id = action.payload.id;
    },
  },
});

export const { getUser, setUser } = userSlice.actions;

//desde el componente importamos la accion con
//! import {getUser} from '...'

export default userSlice.reducer;

//? para acceder al estado, en react usamos
//* const {getUser } = useSelector ((store) => store.cart):
//?               tambien puede ser
//* const getUser  = useSelector ((store) => store.user.getUser):
//? de esta manera accedemos a la propiedad particular de nuestro estado users
//? obviamente tambien podemos pedir todo el estado de user
//!acordarse de importar { useSelector } de redux en el componente React
