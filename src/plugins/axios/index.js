import axios from "axios";
import interceptors from "./interceptors";
const instance = axios.create({
  baseURL: "http://www.filltext.com",
});

interceptors(instance);
export default instance;
