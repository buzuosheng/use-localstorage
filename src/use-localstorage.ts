import { Dispatch, useEffect, useState } from 'react';
import ms from 'ms';

interface Options<T> {
  age: string;
  initialValue: T;
  prefix: string;
}

export function useLocalStorage<T>(
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
  const storage = window.localStorage.getItem(prefixkey);
  const item = JSON.parse(storage || '{}');
  const [con, setCon] = useState({});

  const [value, setValue] = useState<T>(
    storage ? item.value : options.initialValue
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
    const isExpire = Date.now() > JSON.parse(storage).expireAt;
    if (isExpire) {
      window.localStorage.removeItem(prefixkey);
    }
    const newValue = JSON.parse(storage).value;
    if (JSON.stringify(value) !== JSON.stringify(newValue)) {
      setValue(newValue);
      setCon({
        val: value,
        newV: newValue,
        j: JSON.stringify(value) + JSON.stringify(newValue),
        eq: JSON.stringify(value) == JSON.stringify(newValue),
      });
      console.log(con)
    }
  });

  return [value, setItem];
}
