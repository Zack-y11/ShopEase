import { useState } from "react";
import { AuthService } from "../service/auth.service";

export function useRegister() {
    const [fullName, setFullName] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = async (): Promise<boolean> => {
        const normalizedFullName = fullName.trim();
        const normalizedLastname = lastname.trim();
        const normalizedPhone = phone.trim();
        const normalizedEmail = email.trim();

        setErrorMessage(null);

        if (!normalizedFullName || !normalizedLastname || !normalizedPhone || !normalizedEmail || !password || !confirmPassword) {
            setErrorMessage("Please complete all fields.");
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }

        setIsLoading(true);

        try {
            const data = await AuthService.register({
                email: normalizedEmail,
                password,
                name: normalizedFullName,
                lastname: normalizedLastname,
                phone: normalizedPhone,
            });

            console.log("REGISTER TOKEN", data);
            return true;
        } catch (error: unknown) {
            setErrorMessage(error instanceof Error ? error.message : "An error occurred while registering.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fullName,
        setFullName,
        lastname,
        setLastname,
        phone,
        setPhone,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        errorMessage,
        handleRegister,
    };
}
