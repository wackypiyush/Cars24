// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000', // or your backend URL
});

export default instance;
