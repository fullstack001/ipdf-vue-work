<template>
  <div class="langSelector">
    <div>
      <label for="mySelect"
        ><img
          src="@/assets/img/globe16.png"
          srcset="@/assets/img/globe16.png"
          alt="language selector icon"
          class="langSelector__img"
      /></label>
      <select
        v-model="selectedOption"
        @change="handleSelectChange"
        class="langSelector__select"
      >
        <option
          v-for="(lang, index) in supportedLanguages"
          :key="index"
          :value="index"
        >
          {{ lang }}
        </option>
      </select>
    </div>
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
      selectedOption: this.$i18n.locale,
    };
  },
  methods: {
    handleSelectChange(event) {
      // Get the selected value
      const selectedValue = event.target.value;
      this.selectLanguage(selectedValue);
    },
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
