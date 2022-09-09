import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO move them in a JSON file and import them or use REST
const resources = {
  en: {
    translation: {
      "home.header": "Backoffice home",
      "home.intro": "There are two flavours to try",
      "home.link1": "an offline feature, which is probably less common",
      "home.link2": "an online relational feature (planets)",
      "home.link3": "an online relational feature (spaceships)",
    },
  },
  fr: {
    translation: {
      "home.header": "La maison de bureau-arrière",
      "home.intro": "Il y a deux saveurs à essayer",
      "home.link1":
        "une fonctionnalité hors ligne, qui est probablement moins courante",
      "home.link2": "une fonctionnalité relationnelle en ligne (planètes)",
      "home.link3":
        "une fonctionnalité relationnelle en ligne (vaisseaux spatiaux)",
    },
  },
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
