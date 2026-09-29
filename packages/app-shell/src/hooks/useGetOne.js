import { resourceUrl } from "./request.js";
import { useRequest } from "./useRequest.js";

export function useGetOne(url, id, options) {
  return useRequest(url && id !== undefined && id !== null ? resourceUrl(url, id) : null, options);
}
