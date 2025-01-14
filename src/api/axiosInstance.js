import axios from 'axios';

// API별로 ~AxiosInstance로 변수명 작명하면 어떨까요?
// ex) TMDB = tmdbAxiosInstance
const axiosInstance = axios.create({
  baseURL: '',
});
