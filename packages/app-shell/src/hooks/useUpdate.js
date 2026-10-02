import { jsonRequest, resourceUrl } from "./request.js";
import { useMutation } from "./useMutation.js";

export function useUpdate(url, options) {
  const mutation = useMutation();
  const { method = "PUT", ...fetchOptions } = options ?? {};

  return {
    ...mutation,
    update: (id, payload) => mutation.execute(resourceUrl(url, id), jsonRequest(method, payload, fetchOptions)),
  };
}
