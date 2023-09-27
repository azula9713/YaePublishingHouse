import axios from 'axios';

const Server = axios.create({
  baseURL: 'http://192.168.1.7:4000/api/v1/',
  // baseURL: 'http://192.168.0.100:4000/api/v1/',
});

export default Server;
