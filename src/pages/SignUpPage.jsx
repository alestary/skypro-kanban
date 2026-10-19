import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStyles } from "./Auth.styled";
import { signUp } from "../services/auth";

function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!name.trim() || !login.trim() || !password) {
            setError("Заполни все поля");
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            return;
        }

        try {
            await signUp({
            name: name.trim(),
            login: login.trim(),
            password
            });

            navigate("/login", { replace: true });
        } catch (error) {
            setError(error.message || "Не удалось зарегистрироваться");
        }
    }
    return (
        <div style={authStyles.page}>
            <form style={authStyles.form} onSubmit={handleSubmit}>
            <h1 style={authStyles.title}>Регистрация</h1>

            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Имя"
                autoComplete="name"
                style={authStyles.input}
                required
            />

            <input
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="Эл. почта"
                autoComplete="username"
                style={authStyles.input}
                required
            />

            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Пароль"
                autoComplete="new-password"
                style={authStyles.input}
                required
            />

            {error && (
                <p role="alert" style={authStyles.error}>
                {error}
                </p>
            )}

            <button type="submit" style={authStyles.button}>
                Зарегистрироваться
            </button>

            <p style={authStyles.footer}>
                Уже есть аккаунт?{" "}
                <Link to="/login" style={authStyles.link}>
                Войдите здесь
                </Link>
            </p>
            </form>
        </div>
    );
}

export default SignUpPage;