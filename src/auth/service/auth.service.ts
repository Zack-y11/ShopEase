import axios from "axios";
import { AuthResponse, RegisterRequest, UserResponse } from "../models/auth.model";

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

    updateUser: async (
        userId: number | string,
        name: string,
        lastname: string,
        phone: string,
        token: string,
    ): Promise<UserResponse> => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("lastname", lastname);
            formData.append("phone", phone);

            const authTokenHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

            const response = await axios.put<UserResponse>(
                `${API_URL}/users/upload/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: authTokenHeader,
                        // Axios defaults a PUT without Content-Type to urlencoded.
                        // false removes that header so the runtime can add the multipart boundary.
                        "Content-Type": false,
                    },
                },
            );

            return response.data;
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error, "Error al actualizar el usuario"));
        }
    },
};