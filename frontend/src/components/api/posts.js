import axios from "axios"

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const contentApi = axios.create({
    baseURL: `${API_URL}/contenido`,
    headers: {
        "Content-Type": "application/json",
    },
})