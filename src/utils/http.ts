import axios from "axios";

const baseURL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_TESTAPI_BASE_URL : import.meta.env.VITE_API_BASE_URL

const http = axios.create({
    baseURL
})


http.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            config.headers['Authorization'] = `Bearer ${storedToken}`
        }

        return config
    },
    (error) => error
)


export default http