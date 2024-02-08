<template>
  <div class="shell">
    <div
      class="bar"
      :style="{
        width: (loadingPage * 100) / page + '%',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["page", "loadingPage"],
};
</script>
<style scoped>
.shell {
  height: 5px;
  width: 79%;
  border: none;
  border-radius: 13px;
  padding: 0px;
  margin: auto;
  margin-top: 10px;
  position: absolute;
  left: 0;
  top: 52px;
  z-index: 11;
}

.bar {
  background: linear-gradient(to right, #ff7c03, #ff7c03);
  height: 5px;
  width: 15px;
  border-radius: 9px;
  max-width: 100% !important;
}
</style>
