import { Dispatch, useEffect, useState, useCallback } from 'react'
import ms from 'ms'
import isBrowser from './isBrowser'

interface Options<T> {
  age: string
  initialValue: T
  prefix: string
}

interface StorageData<T> {
  value: T
  expireAt: number
}

export function useLocalStorage<T>(
  key: string,
  options?: Partial<Options<T>>
): [T | undefined, Dispatch<T>] {
  const {
    age = '7d',
    initialValue = undefined,
    prefix = 'Prefix:'
  } = options || {}

  const prefixKey = prefix + key
  const storage = isBrowser ? window.localStorage : undefined

  // 初始化状态
  const [value, setValue] = useState<T | undefined>(() => {
    try {
      const storageValue = storage?.getItem(prefixKey)
      if (!storageValue) return initialValue

      const item = JSON.parse(storageValue) as StorageData<T>
      if (Date.now() > item.expireAt) {
        storage?.removeItem(prefixKey)
        return initialValue
      }
      return item.value
    } catch (err) {
      console.error('Error reading from localStorage:', err)
      return initialValue
    }
  })

  // 更新值的函数
  const updateValue = useCallback((newValue: T) => {
    setValue(newValue)

    if (!storage) return

    try {
      const data: StorageData<T> = {
        value: newValue,
        expireAt: Date.now() + ms(age)
      }
      storage.setItem(prefixKey, JSON.stringify(data))
    } catch (err) {
      console.error('Error saving to localStorage:', err)
    }
  }, [age, prefixKey, storage])

  // 监听存储变化
  useEffect(() => {
    if (!storage) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== prefixKey || !e.newValue) return

      try {
        const data = JSON.parse(e.newValue) as StorageData<T>
        if (Date.now() > data.expireAt) {
          storage.removeItem(prefixKey)
          setValue(undefined)
          return
        }

        if (JSON.stringify(value) !== JSON.stringify(data.value)) {
          setValue(data.value)
        }
      } catch (err) {
        console.error('Error handling storage change:', err)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [prefixKey, storage, value])

  return [value, updateValue]
}