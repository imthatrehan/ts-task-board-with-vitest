import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        return JSON.parse(saved)
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err)
    }
    return initialValue
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Error saving localStorage key "${key}":`, err)
    }
  }, [key, value])
  return [value, setValue] as const
}
