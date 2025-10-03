// services/apiClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "/api",
    headers: { "Content-Type": "application/json" }
});

// interceptors (optional)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        // global error handling
        return Promise.reject(err);
    }
);

export default api;
