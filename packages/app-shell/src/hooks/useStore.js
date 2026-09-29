import { useEffect, useRef, useState } from "react";

function resolveInitialValue(initialValue) {
  return typeof initialValue === "function" ? initialValue() : initialValue;
}

function readValue(key, initialValue) {
  const fallback = resolveInitialValue(initialValue);
  if (typeof window === "undefined") return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? fallback : JSON.parse(storedValue);
  } catch {
    return fallback;
  }
}

function writeValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

export function useStore(key, initialValue) {
  const [value, setValueState] = useState(() => readValue(key, initialValue));
  const valueRef = useRef(value);

  useEffect(() => {
    const nextValue = readValue(key, initialValue);
    valueRef.current = nextValue;
    setValueState(nextValue);
  }, [initialValue, key]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key || event.storageArea !== window.localStorage) return;
      const nextValue = event.newValue === null ? resolveInitialValue(initialValue) : JSON.parse(event.newValue);
      valueRef.current = nextValue;
      setValueState(nextValue);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [initialValue, key]);

  function setValue(nextValue) {
    const resolvedValue = typeof nextValue === "function" ? nextValue(valueRef.current) : nextValue;
    valueRef.current = resolvedValue;
    setValueState(resolvedValue);
    writeValue(key, resolvedValue);
  }

  function remove() {
    valueRef.current = resolveInitialValue(initialValue);
    setValueState(valueRef.current);

    try {
      window.localStorage.removeItem(key);
    } catch {
      // Keep the in-memory fallback when storage cannot be modified.
    }
  }

  return [value, setValue, remove];
}
