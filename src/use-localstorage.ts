import { Dispatch, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expireTime: number
): [T, Dispatch<T>] {
  const [value, setValue] = useState<T>(
    () => JSON.parse(window.localStorage.getItem(key) || '') || initialValue
  );

  const setItem = (newValue: T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
    window.localStorage.setItem(key + '1', new Date().getTime().toString());
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    const time = window.localStorage.getItem(key + '1');
    let isExpire = new Date().getTime() - Number(time) < expireTime;
    if (isExpire) window.localStorage.removeItem(key);
    if (newValue && value !== JSON.parse(newValue) && !isExpire) {
      setValue(JSON.parse(newValue));
    }
  });

  return [value, setItem];
}
