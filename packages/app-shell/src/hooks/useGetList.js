import { useRequest } from "./useRequest.js";

export function useGetList(url, options) {
  return useRequest(url, options);
}
