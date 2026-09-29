import { resourceUrl } from "./request.js";
import { useMutation } from "./useMutation.js";

export function useDelete(url, options) {
  const mutation = useMutation();

  return {
    ...mutation,
    remove: (id) => mutation.execute(resourceUrl(url, id), { ...options, method: "DELETE" }),
  };
}
