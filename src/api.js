import axios from "axios";

let baseURL = process.env.REACT_APP_BASE_URL

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   baseURL = process.env.REACT_APP_BASE_URL
// } else {
//   baseURL = process.env.REACT_APP_BASE_URL
// }

const http = axios.create({
  baseURL: baseURL,
});

http.interceptors.response.use(undefined, (err) => {

  const { config, message } = err;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  if (!(message.includes("timeout") || message.includes("Network Error"))) {
    return Promise.reject(err);
  }

  config.retry -= 1;

  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      console.log("retry the request", config.url);
      resolve();
    }, config.retryDelay || 1000);
  });

  return delayRetryRequest.then(() => http(config));

});


http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('userToken')
    
    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/login" && err.response) {
      if (err.response.status === 402 && !originalConfig._retry) {
        originalConfig._retry = true;
        // localStorage.clear()
      }
      else{
        // localStorage.clear()
        // sessionStorage.clear()
        // window.location.reload()
      }
    }
    return Promise.reject(err);
  }
);

export default http;