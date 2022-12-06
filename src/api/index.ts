import axios from 'axios';
const baseURL = 'http://localhost:9000/api/v1';

const api = axios.create({ baseURL, withCredentials: true });
api.interceptors.request.use(function (value) {
  if (localStorage.getItem('token'))
    value.headers!.autorization = `Bearer ${localStorage.getItem('token')}`;
  return value;
});

export default api;
