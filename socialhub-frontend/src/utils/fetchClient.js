export async function fetchClient(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('authToken');
  const config = {
    method,
    headers: {
      ...headers
    }
  };

  if (token) {
    config.headers['Authorization'] = token;
  }

  if (body && !(body instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    config.body = body;
  }

  const response = await fetch(`http://localhost:8080/api/${endpoint}`, config);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  try {
    return await response.json();
  } catch {
    return {};
  }
}
