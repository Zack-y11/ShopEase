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

    createCategory: async (
        name: string,
        description: string,
        token: string
    ): Promise<CategoryResponse> => {
        try {
            const authTokenHeader = token.startsWith("Bearer") ? token : `Bearer ${token}`
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
                throw new Error(error.response.data?.message || "Error when creating category")
            }
            throw new Error("Server error")
        }
    }
}