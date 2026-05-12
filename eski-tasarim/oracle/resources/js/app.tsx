import '../css/app.css'
import '@/lib/i18n'
import { i18n } from '@/lib/i18n'
import { Toaster } from '@/components/ui/sonner'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

router.on('navigate', () => {
    const locale = document.documentElement.lang
    if (locale && i18n.language !== locale) {
        i18n.changeLanguage(locale)
    }
})

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = {
            ...import.meta.glob('./pages/**/*.tsx'),
            ...import.meta.glob('./pages/**/*.jsx'),
        }
        return resolvePageComponent(
            [`./pages/${name}.tsx`, `./pages/${name}.jsx`],
            pages,
        )
    },
    setup({ el, App, props }) {
        console.log('Props',props.initialPage)
        const AppWithProviders = () => (
            <>
                <App {...props} />
                <Toaster position="top-right" richColors closeButton />
            </>
        )

        if (el.dataset.page) {
            hydrateRoot(el, <AppWithProviders />)
        } else {
            createRoot(el).render(<AppWithProviders />)
        }
    },
    progress: {
        color: '#4B5563',
    },
})
