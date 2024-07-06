import axios from "axios";
import { baseUrl } from "./Endpoint";
import { logout } from "../redux/slices/AuthSlicer";
import { useSelector } from "react-redux";

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});


axiosInstance.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      const accessToken = useSelector((state) => state?.token?.accessToken)

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (err) => {
    const prevRequest = err?.config;

    if (err.response?.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;

      const refreshToken = useSelector((state) => state.token.refreshToken);

      await axiosInstance.post('/api/auth/refresh-token', { refreshToken: refreshToken })
        .then((res) => {
          const newAccessToken = res?.data;
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(prevRequest)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return Promise.reject(err);
  }
);


export default axiosInstance;
