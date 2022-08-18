import { useEffect, useState } from "react";

const useDebounceValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debounce);
  },[value, delay]);

  return debouncedValue;
}

export default useDebounceValue