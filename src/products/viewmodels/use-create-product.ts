import { CategoryResponse, CategoryService } from "@/categories/services/category.service";
import { useAuth } from "@/context/AuthContext";
import { CreateProductRequest } from "@/products/models/product.model";
import { ProductService } from "@/products/services/product.service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useCreateProduct() {
    const router = useRouter();
    const { token } = useAuth();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [initialStock, setInitialStock] = useState("");
    const [minStockAlert, setMinStockAlert] = useState("");
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [isCategoriesShowModal, setIsCategoriesShowModal] = useState(false);

    const selectedCategoryName =
        categories.find((category) => category.id === categoryId)?.name || "";

    useEffect(() => {
        if (!token) {
            return;
        }

        let active = true;
        setIsLoadingCategories(true);
        setCategoryError(null);

        CategoryService.getCategories(token)
            .then((data) => {
                if (!active) {
                    return;
                }
                setCategories(data);
            })
            .catch((error: unknown) => {
                if (!active) {
                    return;
                }
                setCategoryError(
                    error instanceof Error && error.message
                        ? error.message
                        : "Error al cargar las categorías"
                );
            })
            .finally(() => {
                if (!active) {
                    return;
                }
                setIsLoadingCategories(false);
            });

        return () => {
            active = false;
        };
    }, [token]);

    const submitProduct = async () => {
        if (!name.trim() || !sku.trim() || !regularPrice.trim() || !initialStock.trim()) {
            Alert.alert("Error", "Por favor completa los campos obligatorios");
            return;
        }

        if (!categoryId) {
            Alert.alert("Error", "Por favor selecciona una categoría");
            return;
        }

        if (!token) {
            Alert.alert("Error", "Sesion no valida");
            return;
        }

        // Keep offerPrice between regularPrice and initialStock so the JSON key order matches the wire contract.
        const productRequest: CreateProductRequest = {
            name: name.trim(),
            categoryId: Number(categoryId),
            sku: sku.trim(),
            description: description.trim(),
            regularPrice: parseFloat(regularPrice),
            ...(offerPrice === "" ? {} : { offerPrice: parseFloat(offerPrice) }),
            initialStock: parseInt(initialStock, 10),
            minStockAlert: minStockAlert === "" ? 0 : parseInt(minStockAlert, 10),
        };

        setIsLoadingProduct(true);
        try {
            const productResponse = await ProductService.createProduct(productRequest, token);
            console.log("Respuesta de creación del producto:", productResponse);
            Alert.alert("Éxito", "Producto creado correctamente", [
                {
                    text: "OK",
                    onPress: () => router.replace("/(protected)/dashboard"),
                },
            ]);
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : "Error al crear el producto";
            Alert.alert("Error", message);
        } finally {
            setIsLoadingProduct(false);
        }
    };

    return {
        name,
        setName,
        sku,
        setSku,
        description,
        setDescription,
        regularPrice,
        setRegularPrice,
        offerPrice,
        setOfferPrice,
        initialStock,
        setInitialStock,
        minStockAlert,
        setMinStockAlert,
        categoryId,
        setCategoryId,
        categories,
        isLoadingCategories,
        categoryError,
        isCategoriesShowModal,
        setIsCategoriesShowModal,
        selectedCategoryName,
        isLoadingProduct,
        submitProduct,
    };
}
