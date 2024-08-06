import axios from "axios";
import AuthHook from "../customHook/AuthHook";
const api = "https://above-horse-mildly.ngrok-free.app";

export const Https = axios.create({
  baseURL: api,
});

// export const axiosPrivate = axios.create({
//     baseURL:api,
//     headers:{'Content-Type':'application/json'},
//     withCredentials:true
// })

const axiosInstances = axios.create({
  baseURL: api,
});
