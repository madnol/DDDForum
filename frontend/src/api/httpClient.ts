import axios, { AxiosError } from 'axios'
import { httpStatusCodes } from './errorHandling'

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor - perfect for auth, logging, etc.
httpClient.interceptors.request.use((config) => {
    // Add auth token to every request
    // Auth logic...
    return config
}, (error) => Promise.reject(error))

// Response interceptor - perfect for error handling, transformation
httpClient.interceptors.response.use((response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Retry on network errors
        if (!error.response && originalRequest) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(httpClient(originalRequest)), 1000);
            });
        }

        // Centralized error handling
        // Handle specific status codes
        // const statusError = error.response?.status;

        // if (statusError) {
        //     const statusKey = String(statusError) as keyof typeof httpStatusCodes;
        //     return statusError >= 500
        //         ? httpStatusCodes[500]
        //         : (httpStatusCodes[statusKey] || error)

        // } else {
        //     console.error('API Error:', error.message);
        // }
        return Promise.reject(error);
    })




