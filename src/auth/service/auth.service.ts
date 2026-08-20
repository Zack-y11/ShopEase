import axios from "axios";
import { AuthResponse, RegisterRequest } from "../models/auth.model";

const API_URL = "https://api-ecommerce-5aby.onrender.com";

function getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (!axios.isAxiosError(error)) {
        return error instanceof Error && error.message ? error.message : fallbackMessage;
    }

    const responseData: unknown = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    if (responseData && typeof responseData === "object") {
        const data = responseData as Record<string, unknown>;
        const serverMessage = data.message ?? data.Message ?? data.error ?? data.detail;

        if (typeof serverMessage === "string" && serverMessage.trim()) {
            return serverMessage;
        }
    }

    return error.message || fallbackMessage;
}

export const AuthService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
                email,
                password,
            });

            return response.data;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "An error occurred during login."));
        }
    },

    register: async (payload: RegisterRequest): Promise<AuthResponse> => {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, payload);

            return response.data;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "An error occurred during registration."));
        }
    },
};