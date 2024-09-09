const postAPI = async (
  URL,
  body = {},
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL ortam değişkeni bulunamadı!");
    }
    if (!URL) {
      throw new Error("URL parametresi bulunamadı!");
    }
    if (!body || typeof body !== "object") {
      throw new Error("Geçersiz body verisi!");
    }

    const response = await fetch(`${apiUrl}${URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw err;
  }
};

const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL ortam değişkeni bulunamadı!");
    }
    if (!URL) {
      throw new Error("URL parametresi bulunamadı!");
    }

    const response = await fetch(`${apiUrl}${URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw err;
  }
};

const deleteAPI = async (URL) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL ortam değişkeni bulunamadı!");
    }
    if (!URL) {
      throw new Error("URL parametresi bulunamadı!");
    }

    const response = await fetch(`${apiUrl}${URL}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw err;
  }
};

const putAPI = async (
  URL,
  body = {},
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL ortam değişkeni bulunamadı!");
    }
    if (!URL) {
      throw new Error("URL parametresi bulunamadı!");
    }
    if (!body || typeof body !== "object") {
      throw new Error("Geçersiz body verisi!");
    }

    const response = await fetch(`${apiUrl}${URL}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json();
  } catch (err) {
    console.error(`API request failed: ${err}`);
    throw err;
  }
};

export { postAPI, getAPI, deleteAPI, putAPI };
