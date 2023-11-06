import { BASE } from "../consts/App"
import axios from "axios";
import { Product } from "../types/Product";

const getProducts = () => {
  const endpoint = BASE.endpoints.products();
  return axios.get<Product[]>(endpoint)
    .then(response => response.data);
}

export {
  getProducts,
}