import { useTranslation as useReactI18next } from 'react-i18next'
export function useTranslation() {
  const { t, i18n } = useReactI18next()

  return {
    t,
    locale: i18n.language,
  }
}
