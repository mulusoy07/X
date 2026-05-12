import { useEffect, useRef } from 'react'

export default function Turnstile({ siteKey, onVerify, onError, resetKey = 0 }) {
    const containerRef = useRef(null)
    const widgetIdRef = useRef(null)
    const callbacksRef = useRef({ onVerify, onError })

    // Keep callbacks ref updated
    useEffect(() => {
        callbacksRef.current = { onVerify, onError }
    }, [onVerify, onError])

    // Reset widget when resetKey changes
    useEffect(() => {
        if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
            try {
                window.turnstile.reset(widgetIdRef.current)
            } catch (error) {
                console.error('Turnstile reset error:', error)
            }
        }
    }, [resetKey])

    // Initialize and render widget
    useEffect(() => {
        if (!siteKey) {
            console.error('Turnstile site key is not provided')
            return
        }

        const renderWidget = () => {
            if (!containerRef.current || widgetIdRef.current || !window.turnstile) return

            try {
                widgetIdRef.current = window.turnstile.render(containerRef.current, {
                    sitekey: siteKey,
                    callback: (token) => callbacksRef.current.onVerify(token),
                    'error-callback': () => callbacksRef.current.onError?.(),
                    'expired-callback': () => callbacksRef.current.onError?.(),
                    theme: 'dark',
                    size: 'normal',
                })
            } catch (error) {
                console.error('Turnstile render error:', error)
            }
        }

        // Turnstile already loaded
        if (window.turnstile) {
            renderWidget()
            return
        }

        // Load script if not exists
        if (!document.querySelector('#turnstile-script')) {
            const script = document.createElement('script')
            script.id = 'turnstile-script'
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
            script.async = true
            script.defer = true
            script.onload = renderWidget
            document.head.appendChild(script)
            return
        }

        // Script loading, wait for it
        const checkInterval = setInterval(() => {
            if (window.turnstile) {
                clearInterval(checkInterval)
                renderWidget()
            }
        }, 100)

        return () => clearInterval(checkInterval)
    }, [siteKey])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (widgetIdRef.current && window.turnstile) {
                try {
                    window.turnstile.remove(widgetIdRef.current)
                } catch (error) {
                    console.error('Turnstile cleanup error:', error)
                }
                widgetIdRef.current = null
            }
        }
    }, [])

    return <div ref={containerRef} />
}
