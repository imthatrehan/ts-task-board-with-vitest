export default function generateId() {
  const randomString: string = Math.random().toString(36).slice(2)
  const id = `tsk_${randomString}`
  return id
}
