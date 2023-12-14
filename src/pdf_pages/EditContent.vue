<template>
  <transition name="fade" mode="out-in"> <Root /> </transition>
</template>
<style></style>
<script>
import Root from "@/routes/Root.vue";
export default {
  comments: {
    Root,
  },
};
</script>
