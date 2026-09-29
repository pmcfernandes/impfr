import { useEffect, useState } from "react";
import { fetchJson } from "./request.js";

function paginatedUrl(url, page, pageParam, pageSize, pageSizeParam) {
  const separator = url.includes("?") ? "&" : "?";
  const pageQuery = `${encodeURIComponent(pageParam)}=${encodeURIComponent(page)}`;
  const pageSizeQuery = pageSize ? `&${encodeURIComponent(pageSizeParam)}=${encodeURIComponent(pageSize)}` : "";
  return `${url}${separator}${pageQuery}${pageSizeQuery}`;
}

function defaultGetItems(response) {
  return Array.isArray(response) ? response : response?.data ?? [];
}

export function useInfiniteGetList(
  url,
  {
    enabled = true,
    fetchOptions,
    initialPage = 1,
    pageParam = "page",
    pageSize,
    pageSizeParam = "pageSize",
    getItems = defaultGetItems,
  } = {},
) {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(enabled && url));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPage, setNextPage] = useState(initialPage + 1);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    if (!url || !enabled) {
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setPages([]);
    setHasNextPage(true);
    setNextPage(initialPage + 1);

    fetchJson(paginatedUrl(url, initialPage, pageParam, pageSize, pageSizeParam), {
      ...fetchOptions,
      signal: controller.signal,
    })
      .then((response) => {
        const items = getItems(response);
        setPages([items]);
        setHasNextPage(pageSize ? items.length >= pageSize : items.length > 0);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [enabled, fetchOptions, getItems, initialPage, pageParam, pageSize, pageSizeParam, requestVersion, url]);

  async function fetchNextPage() {
    if (!url || !hasNextPage || isLoadingMore) return null;

    setIsLoadingMore(true);
    setError(null);

    try {
      const response = await fetchJson(paginatedUrl(url, nextPage, pageParam, pageSize, pageSizeParam), fetchOptions);
      const items = getItems(response);
      setPages((currentPages) => [...currentPages, items]);
      setNextPage((page) => page + 1);
      setHasNextPage(pageSize ? items.length >= pageSize : items.length > 0);
      return items;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setIsLoadingMore(false);
    }
  }

  return {
    data: pages.flat(),
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingMore,
    pages,
    refetch: () => setRequestVersion((version) => version + 1),
  };
}
