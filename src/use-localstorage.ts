import { Dispatch, useEffect, useState } from 'react'
import ms from 'ms'
import isBrowser from './isBrowser'

interface Options<T> {
  age: string
  initialValue: T
  prefix: string
}

export function useLocalStorage<T>(
  key: string,
  _options?: Partial<Options<T>>
): [T | undefined, Dispatch<T>] {
  const options = {
    age: '7d',
    initialValue: undefined,
    prefix: 'Prefix:',
    ..._options
  }
  const prefixKey = options.prefix + key
  let storage: Storage | undefined

  try {
    storage = isBrowser ? localStorage : undefined
  } catch (err) {
    console.error(err)
  }

  const storageValue = storage?.getItem(prefixKey)
  const item = JSON.parse(storageValue || '{}')
  const [value, setValue] = useState<T | undefined>(
    item.value || options.initialValue
  )

  const UpdateValue = (newValue: T) => {
    setValue(newValue)
    const data = {
      value: newValue,
      expireAt: Date.now() + ms(options.age)
    }
    try {
      storage?.setItem(prefixKey, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const storageValue = storage?.getItem(prefixKey)
    if (!storageValue) {
      return
    }
    const isExpire = Date.now() > JSON.parse(storageValue).expireAt
    if (isExpire) {
      storage?.removeItem(prefixKey)
      setValue(undefined)
    }
    const newValue = JSON.parse(storageValue).value
    if (JSON.stringify(value) !== JSON.stringify(newValue)) {
      setValue(newValue)
    }
  })

  return [value, UpdateValue]
}