import { Dispatch, useEffect, useState } from 'react';
import ms from 'ms';

interface Options {
  prefix: string;
  age: number;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: Options
): [T, Dispatch<T>] {
  const prefixkey = (options.prefix || 'prefix') + key;
  const item = JSON.parse(window.localStorage.getItem(prefixkey) || '{}');
  const [value, setValue] = useState<T>(
    window.localStorage.getItem(prefixkey) ? item : initialValue
  );

  const setItem = (newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(prefixkey, JSON.stringify(newValue));
    window.localStorage.setItem(
      prefixkey + ':expireTime',
      JSON.stringify(Date.now() + options.age)
    );
  };

  useEffect(() => {
    const time = window.localStorage.getItem(prefixkey + ':expireTime');
    let isExpire = Date.now() > Number(time);
    if (isExpire) {
      window.localStorage.removeItem(prefixkey);
      window.localStorage.removeItem(prefixkey + ':expireTime');
    }
    const newValue = window.localStorage.getItem(prefixkey);
    if (newValue && value !== JSON.parse(newValue)) {
      setValue(JSON.parse(newValue));
    }
  });

  return [value, setItem];
}
