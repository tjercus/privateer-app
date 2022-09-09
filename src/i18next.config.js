import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import languageEnglish from "./i18n/translations-en.json";
import languageFrench from "./i18n/translations-fr.json";

const resources = {
  en: languageEnglish,
  fr: languageFrench
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .then((r) => console.log("i18next loaded"));

export default i18n;
