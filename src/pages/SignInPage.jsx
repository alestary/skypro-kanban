import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStyles } from "./Auth.styled";
import { signIn } from "../services/auth";

function SignInPage({ setIsAuth }) {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleLogin(event) {
        event.preventDefault();
        setError("");

        if (!login.trim() || !password) {
            setError("Заполни логин и пароль");
            return;
        }

        try {
            const user = await signIn({ login, password });

            if (!user?.token) {
            throw new Error("Сервер не вернул токен авторизации");
            }

            localStorage.setItem("token", user.token);
            localStorage.setItem("userLogin", user.login || login.trim());

            if (user.name) {
            localStorage.setItem("userName", user.name);
            }

            setIsAuth(true);
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.message || "Не удалось выполнить вход");
        }
    }


    return (
        <div style={authStyles.page}>
            <form style={authStyles.form} onSubmit={handleLogin}>
            <h1 style={authStyles.title}>Вход</h1>

            <input
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="Эл. почта"
                autoComplete="username"
                style={{
                ...authStyles.input,
                ...(error ? authStyles.inputError : {}),
                }}
                required
            />

            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Пароль"
                autoComplete="current-password"
                style={{
                ...authStyles.input,
                ...(error ? authStyles.inputError : {}),
                }}
                required
            />

            {error && (
                <p role="alert" style={authStyles.error}>
                {error}
                </p>
            )}

            <button type="submit" style={authStyles.button}>
                Войти
            </button>

            <p style={authStyles.footer}>
                Нужно зарегистрироваться?
                <br />
                <Link to="/register" style={authStyles.link}>
                Регистрируйтесь здесь
                </Link>
            </p>
            </form>
        </div>
    );
};

export default SignInPage;