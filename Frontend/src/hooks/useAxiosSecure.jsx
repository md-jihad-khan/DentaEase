import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      // If the response is an error, check if it's a 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        navigate("/adminLogin");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
