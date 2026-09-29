import { jsonRequest } from "./request.js";
import { useMutation } from "./useMutation.js";

export function useCreate(url, options) {
  const mutation = useMutation();

  return {
    ...mutation,
    create: (payload) => mutation.execute(url, jsonRequest("POST", payload, options)),
  };
}
