import Axios from 'axios';

const baseURL = process.env.baseURL;

const axiosInstance = Axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
