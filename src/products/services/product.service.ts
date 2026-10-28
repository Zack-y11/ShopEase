import axios from "axios";

import { API_URL } from "../../../api/ApiClient";
import { CreateProductRequest, ProductResponse } from "../models/product.model";

function messageFromBody(data: unknown, fallback: string): string {
    if (typeof data === "object" && data !== null) {
        const body = data as { message?: unknown; Message?: unknown };
        if (typeof body.message === "string" && body.message.length > 0) {
            return body.message;
        }
        if (typeof body.Message === "string" && body.Message.length > 0) {
            return body.Message;
        }
    }
    return fallback;
}

export const ProductService = {
    createProduct: async (
        productRequest: CreateProductRequest,
        token: string
    ): Promise<ProductResponse> => {
        try {
            const authTokenHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
            const response = await axios.post<ProductResponse>(
                `${API_URL}/products/create`,
                productRequest,
                {
                    headers: {
                        Authorization: authTokenHeader,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(messageFromBody(error.response.data, "Error to create product"));
            }
            throw new Error("Server error");
        }
    },
};
