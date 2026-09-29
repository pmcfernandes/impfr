import { useState } from "react";
import { requestJson } from "./request.js";

export function useMutation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function execute(url, options) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await requestJson(url, options);
      setData(response);
      return response;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, execute };
}
