import { useEffect, useState } from 'react'
import getErrorMessage from '../utils/getErrorMessage'

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)
  const refetch = () => setTrigger((prev) => prev + 1)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setData(data)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(getErrorMessage(err))
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [url, trigger])
  return { data, loading, error, refetch }
}

export interface User {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
  }
}
