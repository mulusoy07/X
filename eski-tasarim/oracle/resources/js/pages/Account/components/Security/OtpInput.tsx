import { useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react'

interface OtpInputProps {
  value: string[]
  onChange: (code: string[]) => void
  disabled?: boolean
  error?: boolean
  autoFocus?: boolean
}

export function OtpInput({ value, onChange, disabled = false, error = false, autoFocus = false }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  const handleChange = (index: number, inputValue: string) => {
    // Only allow digits
    if (!/^\d*$/.test(inputValue)) return

    const newCode = [...value]
    newCode[index] = inputValue.slice(-1) // Take only last character
    onChange(newCode)

    // Auto-focus next input
    if (inputValue && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newCode = [...value]
    
    pastedData.split('').forEach((char, i) => {
      if (i < 6) {
        newCode[i] = char
      }
    })
    
    onChange(newCode)

    // Focus the next empty input or last input
    const focusIndex = Math.min(pastedData.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {value.map((digit, index) => (
        <input
          key={index}
          ref={el => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          disabled={disabled}
          className={`w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 bg-ko-widget-bg text-ko-text-card-title focus:ring-4 focus:ring-ko-brand-primary/20 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-ko-border-primary focus:border-ko-brand-primary'
          }`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
