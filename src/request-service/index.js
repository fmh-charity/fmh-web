import axios from "axios";
import { getlc, setlc } from "../local-store-service";
import { setCookie, getCookie } from "../cookie-service";

const BASE_PATH = "https://130.193.44.96/fmh";

function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);

      return axios
        .post(BASE_PATH + "/authentication/refresh", {
          refreshToken: getlc("refreshToken"),
        })
        .then((response) => {
          setCookie("accessToken", response.data.accessToken, { path: "/" });
          setlc("refreshToken", response.data.refreshToken);

          error.response.config.headers["authorization"] = response.data.accessToken;
          return axios(error.response.config);
        })
        .catch((error) => {
          window.location.replace("/login");
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    },
  );
}

createAxiosResponseInterceptor();

export const request = async (methodType, path, body) => {
  return await axios.request({
    method: methodType,
    url: BASE_PATH + path,
    data: body,
    headers: {
      authorization: getCookie("accessToken"),
    },
  });
};
