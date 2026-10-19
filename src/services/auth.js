
const API_URL = "https://wedev-api.sky.pro/api/user";

async function sendAuthRequest(path, userData) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch {
    throw new Error("Не удалось подключиться к серверу");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || data.message || "Не удалось войти в аккаунт"
    );
  }

  return data.user;
}

export function signIn({ login, password }) {
  return sendAuthRequest("/login", { login, password });
}

export function signUp({ name, login, password }) {
  return sendAuthRequest("/", { name, login, password });
}
