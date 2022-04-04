import axios from 'axios';

const url = `${process.env.DB_HOST}`;
const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
