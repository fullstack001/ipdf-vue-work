<template>
  <div class="toolbar brush-toolbar">
    <div class="tool">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="13"
        width="21"
        fill="#47474F"
        class="editpdf-icon leftside-icon"
      >
        <path d="M0 0h21v1H0zm0 4h21v2H0zm0 5h21v4H0z"></path>
      </svg>

      <input
        type="number"
        class="form-control text-right ml-2"
        value="1"
        id="brush-size"
        v-model="brushSize"
        @click="set_brush_size"
        max="50"
        min="1"
      />
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
  name: "BrushTooBar",
  data() {
    return {
      brushSize: 1,
      color_pallet: "#212121",
    };
  },
  methods: {
    set_brush_size() {
      this.$emit("set_brushSize", this.brushSize);
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
.brush-toolbar {
  position: absolute !important;
  top: 50px !important;
  padding-left: 20%;
}
</style>
