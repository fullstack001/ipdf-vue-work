<template>
  <div class="toolbar shape-toolbar">
    <div class="tool">
      <button
        class="tool-button"
        :class="{ active: tool_show == 'arrow' }"
        v-on:click="enableAddArrow"
      >
        <i class="fa fa-long-arrow-right" title="Add Arrow"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        :class="{ active: tool_show == 'rect' }"
        v-on:click="enableRectangle"
      >
        <i class="fa-regular fa-square" title="Add rectangle"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        :class="{ active: tool_show == 'circle' }"
        v-on:click="enableCircle"
      >
        <i class="fa-regular fa-circle"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        :class="{ active: tool_show == 'line' }"
        v-on:click="enableLine"
      >
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    <div class="tool">
      <input
        type="color"
        name="colorpicker"
        id="colorpicker"
        v-model="color_pallet"
        @change="set_color"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextToolBar",
  data() {
    return {
      fontSize: 12,
      fontFamily: "Arial",
      fontWeight: "normal",
      fontStyle: "normal",
      color_pallet: "#212121",
      tool_show: null,
    };
  },
  methods: {
    enableAddArrow(e) {
      this.tool_show = "arrow";
      this.$emit("enableAddArrow", e);
    },
    enableRectangle(e) {
      this.tool_show = "rect";
      this.$emit("enableRectangle", e);
    },
    enableCircle(e) {
      this.tool_show = "circle";
      this.$emit("enableCircle", e);
    },
    enableLine(e) {
      this.tool_show = "line";
      this.$emit("enableLine", e);
    },
    set_color() {
      this.$emit("set_color", this.color_pallet);
    },
  },
};
</script>
<style scoped>
#colorpicker {
  height: 25px !important;
}
.shape-toolbar {
  position: absolute !important;
  top: 50px !important;
  padding-left: 20%;
}
</style>
