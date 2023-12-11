<template>
  <div class="langSelector">
    <img
      src="@/assets/img/globe16.png"
      srcset="@/assets/img/globe16.png"
      alt="language selector icon"
      class="langSelector__img"
    />
    <a
      v-for="(lang, index) in supportedLanguages"
      v-bind:class="
        'langSelector__link' + [activeLanguage === index ? ' active' : '']
      "
      v-bind:key="index"
      @click="selectLanguage(index)"
      >{{ lang }}</a
    >
  </div>
</template>

<script>
import "./langSelector.less";
import { languages } from "@/i18n.js";

export default {
  name: "LangSelector",
  data() {
    return {
      defaultLanguage: "en",
      activeLanguage: this.$i18n.locale,
      supportedLanguages: languages,
    };
  },
  methods: {
    selectLanguage: function (lang) {
      // if selected language doesn't exist, fallback to default
      let langSelected = this.isLanguageAvailable(lang)
        ? lang
        : this.defaultLanguage;

      this.activeLanguage = langSelected; // update CSS class in selector
      this.$i18n.locale = langSelected;
      this.$i18n.setLocaleMessage(
        langSelected,
        require(`@languages/${langSelected}.json`)
      );
      // persist selected language
      localStorage.setItem("lang", langSelected);
    },
    isLanguageAvailable: function (lang) {
      let isAvailable = true;
      try {
        require.resolve(`@languages/${lang}.json`);
      } catch (error) {
        isAvailable = false;
      }
      return isAvailable;
    },
  },
};
</script>
