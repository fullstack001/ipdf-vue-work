<template>
  <div class="shell">
    <div
      class="bar"
      :style="{
        width: (rendering_progress * 100) / ((152 * page) / 2) + '%',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      rendering_progress: 0,
    };
  },
  mounted() {
    this.count_progress();
  },
  methods: {
    count_progress() {
      console.log(this.page);
      let intervalId = setInterval(() => {
        this.rendering_progress = this.rendering_progress + 1;

        if (this.rendering_progress >= 100) {
          clearInterval(intervalId);
          this.$emit("stop_render");
        }
      }, 1);
    },
  },
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
}

.bar {
  background: linear-gradient(to right, #ff7c03, #ff7c03);
  height: 5px;
  width: 15px;
  border-radius: 9px;
}
</style>
