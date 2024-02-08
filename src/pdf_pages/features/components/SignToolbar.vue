<template>
  <div class="toolbar">
    <div class="stepper">
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-up"
          style="font-size: medium"
          @click="$emit('set_page', currentPage == 1 ? 1 : currentPage - 1)"
        ></i>
      </div>
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-down"
          style="font-size: medium"
          @click="
            () => {
              let newPage =
                currentPage == pages ? currentPage : currentPage + 1;
              $emit('set_page', newPage);
            }
          "
        ></i>
      </div>
      <div class="info">
        <input
          type="number"
          :max="pages"
          :min="1"
          style="width: 40px; height: 24px; margin-right: 3px"
          v-model="currentPage"
          @change="() => $emit('set_page', currentPage * 1)"
        />
        / {{ pages }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pages", "currentPageProps"],
  data() {
    return {
      currentPage: 1,
    };
  },
  watch: {
    currentPageProps(newValue) {
      this.currentPage = newValue;
    },
  },
};
</script>
<style scoped>
@import "../../../assets/css/toolbar.css";
</style>
