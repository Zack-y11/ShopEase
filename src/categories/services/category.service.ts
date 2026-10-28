import axios from "axios"
import { API_URL } from "../../../api/ApiClient"

export interface CategoryResponse {
    id: number,
    name: string,
    description?: string,
    createdAt: string,
    updatedAt: string
}

export const CategoryService = {

    getCategories: async (token: string): Promise<CategoryResponse[]> => {
        try {
            const authTokenHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`
            const response = await axios.get(
                `${API_URL}/categories`,
                {
                    headers: {
                        Authorization: authTokenHeader
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const responseData: unknown = error.response.data;
                console.error("Category API response failure:", {
                    status: error.response.status,
                    bodyType: Array.isArray(responseData) ? "array" : typeof responseData,
                    bodyKeys:
                        typeof responseData === "object" && responseData !== null
                            ? Object.keys(responseData)
                            : [],
                });

                throw new Error(error.response.data?.message || error.response.data?.Message || "Error when fetching categories")
            }
            throw new Error("Server error")
        }
    },

    createCategory: async (
        name: string,
        description: string,
        token: string
    ): Promise<CategoryResponse> => {
        try {
            const authTokenHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`
            const response = await axios.post(
                `${API_URL}/categories/create`, { name, description },
                {
                    headers: {
                        Authorization: authTokenHeader,
                        "Content-Type": "application/json"
                    }
                }
            )
            return response.data

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data?.message || error.response.data?.Message || "Error when creating category")
            }
            throw new Error("Server error")
        }
    }
}