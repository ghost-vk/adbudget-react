export default function () {
  const saved = localStorage.getItem('i18nextLng')
  if (saved) return saved

  const browserLang = window.navigator.language || window.navigator.userLanguage

  if (!browserLang) return 'en'

  if (/^ru/.test(browserLang)) {
    return 'ru'
  } else {
    return 'en'
  }
}
