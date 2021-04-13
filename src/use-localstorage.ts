import { Dispatch, useEffect, useState, useCallback } from 'react';
import ms from 'ms';

interface Options<T> {
  age: string;
  initialValue: T;
  prefix: string;
}

export function useLocalStorage<T>(
  key: string,
  _options?: Partial<Options<T>>
): [string, Dispatch<string>] {
  const options = {
    age: '7d',
    initialValue: undefined,
    prefix: 'Prefix:',
    ..._options,
  };
  const prefixkey = options.prefix + key;
  const storage = window.localStorage.getItem(prefixkey);
  const item = JSON.parse(storage || '{}');

  const [value, setValue] = useState<string>(
    storage ? JSON.stringify(item.value) : JSON.stringify(options.initialValue)
  );

  const setItem = (newValue: string) => {
    setValue(JSON.stringify(newValue));
    const data = {
      value: newValue,
      expireAt: Date.now() + ms(options.age),
    };

    window.localStorage.setItem(prefixkey, JSON.stringify(data));
  };

  useEffect(() => {
    const storage = window.localStorage.getItem(prefixkey);
    if (!storage) {
      return;
    }
    const isExpire = Date.now() > JSON.parse(storage).expireAt;
    if (isExpire) {
      window.localStorage.removeItem(prefixkey);
    }
    const newValue = JSON.parse(storage).value;
    if (value !== newValue) {
      setValue(newValue);
    }
  });

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        if (!event.newValue) {
          return;
        }
        setValue(event.newValue);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [JSON.parse(value), setItem];
}
