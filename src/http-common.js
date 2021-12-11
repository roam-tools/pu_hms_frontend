import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

const requestHandler = (request) => {
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

http.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default http;
