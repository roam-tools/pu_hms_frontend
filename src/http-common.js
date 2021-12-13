import axios from "axios";

const http = axios.create({
  baseURL: "http://3ab6-41-242-139-20.ngrok.io/api/v1",
});

const requestHandler = (request) => {
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error.response);
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
