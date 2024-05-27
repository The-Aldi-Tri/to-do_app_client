import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
};

const axiosCustom = axios.create(axiosConfig);

export default axiosCustom;
