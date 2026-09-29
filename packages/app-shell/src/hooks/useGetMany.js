import { useRequest } from "./useRequest.js";

export function useGetMany(url, ids = [], { idsParam = "ids", ...options } = {}) {
  const normalizedIds = Array.isArray(ids) ? ids.filter((id) => id !== undefined && id !== null) : [];
  const separator = url?.includes("?") ? "&" : "?";
  const requestUrl = normalizedIds.length > 0 ? `${url}${separator}${encodeURIComponent(idsParam)}=${encodeURIComponent(normalizedIds.join(","))}` : null;

  return useRequest(requestUrl, options);
}
