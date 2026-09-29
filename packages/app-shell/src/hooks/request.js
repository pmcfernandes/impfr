export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const requestJson = fetchJson;

export function resourceUrl(url, id) {
  return `${url.replace(/\/$/, "")}/${encodeURIComponent(id)}`;
}

export function jsonRequest(method, payload, options = {}) {
  return {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...(payload !== undefined && { body: JSON.stringify(payload) }),
  };
}
