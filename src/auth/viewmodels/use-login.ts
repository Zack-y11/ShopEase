import { useState } from "react";
import { AuthService } from "../service/auth.service";

export function useLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            console.log("TOKEN", data.token);
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