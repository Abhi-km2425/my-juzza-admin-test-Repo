import { axiosPrivate } from "../api/axios"
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlicer";
import { setRefreshToken } from "../redux/slices/TokenReducer";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const accessToken = useSelector((state) => state?.token?.accessToken);
    // console.log("accessToken", accessToken)
    const dispatch = useDispatch()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                if (config.url === '/api/admin/add-product') {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // console.log("Main error", error)
                const prevRequest = error?.config;
                // console.log("prevRequest", prevRequest)
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;

                    if (prevRequest.url === "/api/auth/refresh-token") {
                        dispatch(setRefreshToken(null))
                        dispatch(logout());
                        return
                    }

                    const newAccessToken = await refresh();

                    // console.log("axpriv", newAccessToken)

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }


                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;