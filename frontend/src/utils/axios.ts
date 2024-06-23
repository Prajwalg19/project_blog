import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://project-blog-black.vercel.app"
    //baseURL: "http://localhost:4000"
})

export default axiosInstance;
