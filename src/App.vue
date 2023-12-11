<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      defaultLanguage: "en",
    };
  },
  beforeMount() {
    // get locale on page load
    // eslint-disable-next-line
            let lang = !!localStorage.getItem("lang")? localStorage.getItem("lang"): this.defaultLanguage;

    this.$i18n.locale = lang;
    this.$i18n.setLocaleMessage(lang, require(`@languages/${lang}.json`));
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.tab-area .md-tabs-navigation {
  box-shadow: none;
  padding: 10px;
}

.tab-area .md-button-content {
  display: grid !important;
}

.tab-area .md-button-content .md-tab-label {
  color: #333 !important;
  font-size: 18px;
}

.tab-area .md-button-content .md-tab-icon {
  color: #333 !important;
  font-size: 50px !important;
  width: 50px !important;
  height: 50px !important;
}

.md-tabs-navigation .md-active {
  border: solid 1px #f0742e;
}

.md-button.md-primary {
  background-color: #f0742e !important;
}

.picker-dialog-frame {
  min-height: 600px;
}
.md-stepper .md-steppers.md-vertical .md-stepper-header {
  background-color: #fff !important;
}
</style>
