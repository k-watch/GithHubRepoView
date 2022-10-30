import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/repos/angular/angular-cli',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKENS}`,
  },
});

export default axiosInstance;
