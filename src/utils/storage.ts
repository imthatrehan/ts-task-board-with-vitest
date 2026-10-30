export default function loadState<T>(key: string, fallback: T): T {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return fallback
    }
    const parsed = JSON.parse(serializedState)
    return parsed ?? fallback
  } catch (err) {
    console.error('Could not load state', err)
    return fallback
  }
}
