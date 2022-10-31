import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: 'https://api.github.com/repos/angular/angular-cli',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKENS}`,
  },
};

const axiosInstance = axios.create(DEFAULT_CONFIG);

export default axiosInstance;
