<template>
  <div class="texttoolbar">
    <div class="tool">
      <label for="">Font size </label>
      <select
        id="font-size"
        class="form-control"
        @click="set_font_size"
        v-model="fontSize"
      >
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="16" selected>16</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="32">32</option>
        <option value="48">48</option>
        <option value="64">64</option>
        <option value="72">72</option>
        <option value="108">108</option>
      </select>
    </div>
    <div class="tool">
      <label for="">Font family</label>
      <select
        id="font-size"
        class="form-control"
        @click="set_font_family"
        v-model="fontFamily"
      >
        <option value="Arial" selected>Arial</option>
        <option value="Arial Unicode MS">Arial Unicode MS</option>
        <option value="Verdana" selected>Verdana</option>
        <option value="Courier">Courier</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa-sharp fa-solid fa-bold" @click="set_font_weight"></i>
      </button>
    </div>
    <!-- <div class="tool">
      <button class="tool-button">
        <i class="fa-sharp fa-solid fa-underline"></i>
      </button>
    </div> -->
    <div class="tool">
      <button class="tool-button">
        <i class="fa-sharp fa-solid fa-italic" @click="set_font_style"></i>
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
    set_font_weight() {
      this.fontWeight = this.fontWeight == "normal" ? "bold" : "normal";
      this.$emit("set_font_weight", this.fontWeight);
    },
    set_font_style() {
      this.fontStyle = this.fontStyle == "normal" ? "italic" : "normal";
      this.$emit("set_font_style", this.fontStyle);
    },
    set_font_size() {
      this.$emit("set_font_size", this.fontSize);
    },
    set_font_family() {
      this.$emit("set_font_family", this.fontFamily);
      // console.log(this.fontFamily);
    },
    set_color1() {
      this.$emit("set_color1", this.color_pallet);
    },
  },
};
</script>
<style scoped>
#colorpicker {
  height: 25px !important;
}
</style>
