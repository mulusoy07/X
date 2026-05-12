import { useState, useEffect, useMemo, useCallback } from 'react'

interface UseCountdownReturn {
  countdown: number
  formatted: string
  reset: (seconds: number) => void
  isExpired: boolean
}

export function useCountdown(initialSeconds: number = 0): UseCountdownReturn {
  const [countdown, setCountdown] = useState(initialSeconds)

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const formatted = useMemo(() => {
    const mins = Math.floor(countdown / 60)
    const secs = countdown % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [countdown])

  const reset = useCallback((seconds: number) => {
    setCountdown(seconds)
  }, [])

  const isExpired = countdown === 0

  return { countdown, formatted, reset, isExpired }
}
