import { Dispatch, useEffect, useState } from 'react';
import ms from 'ms';

interface Options<T> {
  age: string;
  initialValue: T;
  prefix: string;
}

export default function useLocalStorage<T>(
  key: string,
  _options?: Partial<Options<T>>
): [T, Dispatch<T>] {
  const options = {
    age: '7d',
    initialValue: undefined,
    prefix: 'Prefix:',
    ..._options,
  };
  const prefixkey = options.prefix + key;
  const item = JSON.parse(window.localStorage.getItem(prefixkey) || '{}');
  const [value, setValue] = useState<T>(
    window.localStorage.getItem(prefixkey) ? item.value : options.initialValue
  );

  const setItem = (newValue: T) => {
    setValue(newValue);
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
    const expireAt = JSON.parse(storage).expireAt;
    const isExpire = Date.now() > expireAt;
    if (isExpire) {
      window.localStorage.removeItem(prefixkey);
    }
    const newValue = JSON.parse(storage).value;
    if (value !== newValue) {
      setValue(newValue);
    }
  });

  return [value, setItem];
}
