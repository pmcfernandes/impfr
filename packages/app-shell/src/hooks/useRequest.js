import { useEffect, useState } from "react";
import { requestJson } from "./request.js";

export function useRequest(url, { enabled = true, fetchOptions } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(enabled && url));
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    if (!url || !enabled) {
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    requestJson(url, { ...fetchOptions, signal: controller.signal })
      .then((response) => setData(response))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [enabled, fetchOptions, requestVersion, url]);

  return {
    data,
    error,
    isLoading,
    refetch: () => setRequestVersion((version) => version + 1),
  };
}
