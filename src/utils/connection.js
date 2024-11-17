import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;

const api = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export default api;
