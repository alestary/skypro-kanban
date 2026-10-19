
const API_URL = "https://wedev-api.sky.pro/api";

export async function apiRequest(path, options = {}, withAuth = false) {
  // Skypro parses the JSON string from a text body; let fetch use text/plain.
  const headers = {
    ...options.headers,
  };

  if (withAuth) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Необходимо войти в аккаунт");
    }

    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error(
      "Не удалось подключиться к серверу. Проверь интернет-соединение.", { cause: error }
    );
  }

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      throw new Error("Сервер вернул некорректный JSON");
    }
  } else if (response.status !== 204) {
    const text = await response.text();

    if (text) {
      data = { message: text };
    }
  }

  if (!response.ok) {
    if (withAuth && response.status === 401) {
      window.dispatchEvent(new Event("auth-expired"));
    }
    const message =
      data?.message ||
      data?.error ||
      data?.details ||
      `Ошибка сервера: ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}
