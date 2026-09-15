import { useState } from "react";
import { AuthService } from "../service/auth.service";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();
    const { saveSession } = useAuth();

    const tooglePasswordVisible = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        setErrorMessage(null);
        setIsLoading(true);

        try {
            const data = await AuthService.login(email.trim(), password);
            await saveSession(data.token, data.userResponse as unknown as Parameters<typeof saveSession>[1]);
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "An error occurred while logging in.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        isLoading,
        errorMessage,
        isPasswordVisible,
        tooglePasswordVisible,
        handleLogin,
    };
}