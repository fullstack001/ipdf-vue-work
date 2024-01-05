<template>
  <div class="texttoolbar">
    <div class="tool">
      <button class="tool-button">
        <i
          class="fa fa-long-arrow-right"
          title="Add Arrow"
          v-on:click="enableAddArrow"
        ></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i
          class="fa-regular fa-square"
          title="Add rectangle"
          v-on:click="enableRectangle"
        ></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button" v-on:click="enableCircle">
        <i class="fa-regular fa-circle"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa-solid fa-minus" v-on:click="enableLine"></i>
      </button>
    </div>
  </div>
</template>

<script>
import "@/assets/js/styles.css";
import "@/assets/js/pdfannotate.css";

export default {
  name: "TextToolBar",
  data() {
    return {
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "normal",
      fontStyle: "normal",
      color_pallet: "#212121",
    };
  },
  methods: {
    enableAddArrow(e) {
      this.$emit("enableAddArrow", e);
    },
    enableRectangle(e) {
      this.$emit("enableRectangle", e);
    },
    enableCircle(e) {
      this.$emit("enableCircle", e);
    },
    enableLine(e) {
      this.$emit("enableLine", e);
    },
  },
};
</script>
<style scoped>
#colorpicker {
  height: 25px !important;
}
</style>
