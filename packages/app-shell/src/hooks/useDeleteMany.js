import { jsonRequest } from "./request.js";
import { useMutation } from "./useMutation.js";

export function useDeleteMany(url, options) {
  const mutation = useMutation();

  return {
    ...mutation,
    removeMany: (ids) => mutation.execute(url, jsonRequest("DELETE", { ids }, options)),
  };
}
