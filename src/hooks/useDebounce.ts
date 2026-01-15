import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delayInMs: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayInMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayInMs]);

  return debouncedValue;
};
