import { Dispatch, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expireTime: number
): [T, Dispatch<T>] {
  const item = JSON.parse(window.localStorage.getItem(key) || '{}');
  const [value, setValue] = useState<T>(item || initialValue);

  const setItem = (newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
    window.localStorage.setItem(
      key + ':expireTime',
      new Date().getTime().toString() + expireTime
    );
  };

  useEffect(() => {
    const time = window.localStorage.getItem(key + ':expireTime');
    let isExpire = new Date().getTime() > Number(time);
    if (isExpire) window.localStorage.removeItem(key);
    const newValue = window.localStorage.getItem(key);
    if (newValue && value !== JSON.parse(newValue)) {
      setValue(JSON.parse(newValue));
    }
  });

  return [value, setItem];
}
