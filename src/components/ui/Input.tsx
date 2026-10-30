import type { ChangeEvent, KeyboardEvent } from 'react'

interface InputProps {
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

function Input({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className,
}: InputProps) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
      />
    </>
  )
}

export default Input
