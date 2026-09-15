import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserResponse = Record<string, unknown>;

interface AuthContextType {
    token: string | null;
    user: UserResponse | null;
    isLoadingSession: boolean;
    saveSession: (token: string, user: UserResponse) => Promise<void>;
    clearSession: () => void

}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const savedToken = await AsyncStorage.getItem('@auth_token');
                const savedUser = await AsyncStorage.getItem('@auth_user');

                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                    console.log('session restaurada con exito');
                }
            } catch (e) {
                console.log('error al restaurar la session', e);
            } finally {
                setIsLoading(false);
            }
        };

        loadSession();
    }, []);

    //guarde la session
    const saveSession = async (newToken: string, newUser: UserResponse) => {
        try {
            await AsyncStorage.setItem('@auth_token', newToken);
            await AsyncStorage.setItem('@auth_user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);

        } catch (e) {
            console.log('error al guardar la session', e)

        }
    }
    //limpia la session
    const clearSession = async () => {
        try {
            await AsyncStorage.removeItem('@auth_token');
            await AsyncStorage.removeItem('@auth_user');
            setToken(null);
            setUser(null);
        } catch (e) {
            console.log('error al limpiar la session', e);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, isLoadingSession: isLoading, saveSession, clearSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
