import { useEffect, useRef, useState } from "react";
import { requestJson } from "./request.js";

function headersEntries(headers) {
  try {
    return JSON.stringify([...new Headers(headers ?? {}).entries()].sort());
  } catch {
    return JSON.stringify(headers ?? null);
  }
}

function sameFetchOptions(left, right) {
  const leftOptions = left ?? {};
  const rightOptions = right ?? {};
  const leftKeys = Object.keys(leftOptions);
  const rightKeys = Object.keys(rightOptions);
  if (leftKeys.length !== rightKeys.length) return false;
  return leftKeys.every((key) => {
    if (!(key in rightOptions)) return false;
    if (key === "headers") return headersEntries(leftOptions.headers) === headersEntries(rightOptions.headers);
    return leftOptions[key] === rightOptions[key];
  });
}

export function useRequest(url, { enabled = true, fetchOptions } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(enabled && url));
  const [requestVersion, setRequestVersion] = useState(0);
  const fetchOptionsRef = useRef(fetchOptions);

  if (!sameFetchOptions(fetchOptionsRef.current, fetchOptions)) {
    fetchOptionsRef.current = fetchOptions;
  }
  const stableFetchOptions = fetchOptionsRef.current;

  useEffect(() => {
    if (!url || !enabled) {
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    requestJson(url, { ...stableFetchOptions, signal: controller.signal })
      .then((response) => setData(response))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [enabled, requestVersion, stableFetchOptions, url]);

  return {
    data,
    error,
    isLoading,
    refetch: () => setRequestVersion((version) => version + 1),
  };
}
