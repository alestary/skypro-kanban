import { createContext, useState, useEffect } from "react";
import { signIn, signUp } from "../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(
        () => Boolean(localStorage.getItem("token"))
    );

    const [user, setUser] = useState(() => ({
        login: localStorage.getItem("userLogin") || "",
        name: localStorage.getItem("userName") || "",
    }));

    useEffect(() => {
        function expire() {
            ["token", "userName", "userLogin"].forEach((key) => {
                localStorage.removeItem(key);
            });

            setIsAuth(false);
            setUser({ login: "", name: "" });
        }

        window.addEventListener("auth-expired", expire);

        return () => {
            window.removeEventListener("auth-expired", expire);
        };
    }, []);

    async function login(credentials) {
        const result = await signIn(credentials);

        if (!result?.token) {
            throw new Error("Сервер не вернул токен авторизации");
        }

        const nextUser = {
            login: result.login || credentials.login.trim(),
            name: result.name || "",
        };

        localStorage.setItem("token", result.token);
        localStorage.setItem("userLogin", nextUser.login);

        if (nextUser.name) {
            localStorage.setItem("userName", nextUser.name);
        } else {
            localStorage.removeItem("userName");
        }

        setUser(nextUser);
        setIsAuth(true);

        return result;
    }

    async function register(userData) {
        return signUp(userData);
    }

    function logout() {
        ["token", "userName", "userLogin"].forEach((key) => {
            localStorage.removeItem(key);
        });

        setIsAuth(false);
        setUser({ login: "", name: "" });
    }

    const value = {
        isAuth,
        user,
        login,
        register,
        logout,
        setIsAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}