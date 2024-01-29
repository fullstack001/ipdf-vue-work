// i18n.js
import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  silentTranslationWarn: true, // https://github.com/kazupon/vue-i18n/issues/96
});

export const languages = {
  en: "English",
  fr: "Français",
  ja: "日本語",
  it: "Italiano",
  es: "Español",

  //"es": "Español",
  //"gr": "Deutsche",
  // "ru": "Pусский"
};

export default {
  i18n,
};
