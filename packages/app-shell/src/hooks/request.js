export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
      else if (body?.title) message = body.title;
    } catch {
      // Corpo sem JSON (ou vazio): mantém a mensagem genérica.
    }
    throw new Error(message);
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
