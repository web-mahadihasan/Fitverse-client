import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";


export const axiosSecured = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecured = () => {
    const navigate = useNavigate()
    const {logOutUser} = useAuth()

    axiosSecured.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization(`Bearer ${token}`)
        // Do something before request is sent
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

    // Log out user by Axios resoponse
    axiosSecured.interceptors.response.use(function (response) {
        return response;
      }, async(error)=> {
        const status = error.response.status
        
        // Handle 401 and 403 error code 
        if(status === 401 || status === 403){
            await logOutUser()
            navigate("/auth/login")
        }
        return Promise.reject(error);
      }); 
    return axiosSecured
};

export default useAxiosSecured;