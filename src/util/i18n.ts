import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../i18n/en.json'
import translationTR from '../i18n/tr.json'

const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  },
}


i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('userLanguage') || 'tr',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;