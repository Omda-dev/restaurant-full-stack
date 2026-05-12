import { useEffect } from "react";
import axiosInstance from "./axiosConfig";

const useAxiosInterceptor = () => {
  useEffect(() => {
    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthenticated: please login again");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("profileData");

          if (window.location.pathname !== "/") {
            window.location.assign("/");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxiosInterceptor;
