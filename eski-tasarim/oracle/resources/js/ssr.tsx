import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { initI18n } from '@/lib/i18n'
import fs from 'fs'
import path from 'path'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

const loadTranslations = (locale: string): Record<string, unknown> => {
    try {
        const translationsPath = path.resolve(
            process.cwd(),
            `system/packages/dashboard/resources/lang/${locale}.json`
        )
        const content = fs.readFileSync(translationsPath, 'utf-8')
        return JSON.parse(content)
    } catch {
        return {}
    }
}

createServer((page) => {
    const locale = (page.props?.app as { locale?: string })?.locale || 'tr'
    const translations = loadTranslations(locale)
    initI18n(locale, translations)

    return createInertiaApp({
        page,
        title: (title) => `${title} - ${appName}`,
        render: ReactDOMServer.renderToString,
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
        setup: ({ App, props }) => <App {...props} />,
    })
})
