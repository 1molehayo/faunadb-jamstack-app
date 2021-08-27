import Axios from "axios";

const axios = Axios.create({
  baseURL: "/.netlify/functions",
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
