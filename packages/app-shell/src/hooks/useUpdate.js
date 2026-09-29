import { jsonRequest, resourceUrl } from "./request.js";
import { useMutation } from "./useMutation.js";

export function useUpdate(url, options) {
  const mutation = useMutation();

  return {
    ...mutation,
    update: (id, payload) => mutation.execute(resourceUrl(url, id), jsonRequest("PATCH", payload, options)),
  };
}
