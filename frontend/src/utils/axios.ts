import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://project-blog-black.vercel.app/"
})

export default axiosInstance;
