const API_URL = "https://wedev-api.sky.pro/api/user";

async function sendAuthRequest(path, userData) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error("Не удалось подключиться к серверу");
  }

  let data = null;
  const responseText = await response.text();

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (response.ok) {
        throw new Error("Сервер вернул некорректный ответ");
      }

      data = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `Ошибка сервера: ${response.status}`
    );
  }

  if (!data?.user) {
    throw new Error("Сервер не вернул данные пользователя");
  }

  return data.user;
}

export function signIn({ login, password }) {
  return sendAuthRequest("/login", { login, password });
}

export function signUp({ name, login, password }) {
  return sendAuthRequest("/", { name, login, password });
}
