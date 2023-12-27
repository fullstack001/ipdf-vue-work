<template>
  <div class="locale-switcher">
    <label for="mySelect"
      ><img
        src="@/assets/img/globe16.png"
        srcset="@/assets/img/globe16.png"
        alt="language selector icon"
        class="langSelector__img"
    /></label>
    <select :value="$i18n.locale" @change.prevent="changeLocale">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { getSupportedLocales } from "@/util/i18n/supported-locales";

export default {
  data: () => ({ locales: getSupportedLocales() }),

  methods: {
    changeLocale(e) {
      const locale = e.target.value;

      this.$router.push(`/${locale}`);
    },
  },
};
</script>

<style scoped>
.locale-switcher {
  margin-top: 10px;
  margin-right: 15px;
}

select {
  border: none;
  background-color: transparent;
}
</style>
