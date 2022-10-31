import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_OWNER_NAME = 'angular';
const GITHUB_REPO_NAME = 'angular-cli';

const DEFAULT_CONFIG = {
  baseURL: `${GITHUB_API_URL}/repos/${GITHUB_OWNER_NAME}/${GITHUB_REPO_NAME}`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKENS}`,
  },
  timeout: 5000,
};

const axiosInstance = axios.create(DEFAULT_CONFIG);

export default axiosInstance;
