import axios from "axios";

const baseRequest = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseRequest;
