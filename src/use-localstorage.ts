import { Dispatch, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expireTime: number
): [T, Dispatch<T>] {
  const item = JSON.parse(window.localStorage.getItem(key) || '{}');
  const [value, setValue] = useState<T>(
    window.localStorage.getItem(key) ? item : initialValue
  );

  const setItem = (newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
    window.localStorage.setItem(
      key + ':expireTime',
      JSON.stringify(Date.now() + expireTime)
    );
  };

  useEffect(() => {
    const time = window.localStorage.getItem(key + ':expireTime');
    let isExpire = Date.now() > Number(time);
    if (isExpire) {
      window.localStorage.removeItem(key);
      window.localStorage.removeItem(key + ':expireTime');
    }
    const newValue = window.localStorage.getItem(key);
    if (newValue && value !== JSON.parse(newValue)) {
      setValue(JSON.parse(newValue));
    }
  });

  return [value, setItem];
}
