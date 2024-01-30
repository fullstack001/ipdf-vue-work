<template>
  <router-link :to="getTo()">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: ["to"],

  methods: {
    getTo() {
      if (typeof this.to !== "string") {
        return this.to;
      }

      const locale = this.$route.params.locale;
      // we strip leading and trailing slashes and prefix

      // the current locale
      const path =
        locale === undefined
          ? `/${this.to.replace(/^\/|\/$/g, "")}`
          : `/${locale}/${this.to.replace(/^\/|\/$/g, "")}`;
      return path;
    },
  },
};
</script>
