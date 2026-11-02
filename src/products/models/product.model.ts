export interface CreateProductRequest {
    name: string;
    categoryId: number;
    sku: string;
    description: string;
    regularPrice: number;
    offerPrice?: number;
    initialStock: number;
    minStockAlert: number;
}

export interface ProductResponse {
    id: number;
    name: string;
    categoryId: number;
    sku?: string;
    description: string;
    regularPrice: number;
    offerPrice?: number;
    initialStock: number;
    minStockAlert: number;
    createdAt?: string;
}

export interface ProductItem {
    id: number;
    categoryId: number;
    categoryName?: string;
    name: string;
    description: string;
    regularPrice: number;
    offerPrice?: number;
    minStockAlert: number;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}
