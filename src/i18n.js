import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { TRANSLATION_EN } from './translations/en/common'
import { TRANSLATION_RU } from './translations/ru/common'
import detectLanguage from './utils/detectLanguage'

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: TRANSLATION_EN,
    },
    ru: {
      common: TRANSLATION_RU,
    },
  },
  react: {
    useSuspense: false,
  },
})

i18next.on('languageChanged', (lng) => {
  window.localStorage.setItem('i18nextLng', lng)
})

i18next.changeLanguage(detectLanguage())

export default i18next
