import axios from "axios";

// Default to localhost for development, production URL will be set via env
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: baseURL,
    timeout: 30000 // 30 second timeout for Render cold starts
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors (Render cold start)
        if (error.code === 'ECONNABORTED' || !error.response) {
            console.warn('Request timeout or network error - Render may be spinning up');
        }

        // Handle 401 Unauthorized. Only bounce to login from a signed-in screen,
        // so an expired token cannot kick a visitor off a public page.
        if (error.response?.status === 401) {
            localStorage.removeItem('token');

            const onProtectedRoute = window.location.pathname.startsWith('/app');
            const alreadyOnLogin = window.location.search.includes('state=login');

            if (onProtectedRoute && !alreadyOnLogin) {
                window.location.href = '/app?state=login';
            }
        }

        return Promise.reject(error);
    }
);

export default api
