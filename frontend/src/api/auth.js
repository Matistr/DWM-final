import axios from "axios";

const API = "http://localhost:4000/api"

export const CarritoRequest = (producto) => {
    return axios.get(`${API}/carrito`, producto); 
  };