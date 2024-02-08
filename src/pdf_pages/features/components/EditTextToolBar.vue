<template>
  <div class="toolbar edit-text-toolbar">
    <div class="tool">
      <i class="fa-solid fa-t" style="font-size: xx-small"></i>
      <i class="fa-solid fa-t" style="margin-right: 10px"></i>
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
      <i class="fa-solid fa-t" style="margin-right: 10px"></i>
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
      <button
        class="tool-button"
        @click="set_font_weight"
        :class="fontWeight == 'bold' && 'active'"
      >
        <i class="fa-sharp fa-solid fa-bold"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        @click="set_font_underline"
        :class="underline && 'active'"
      >
        <i class="fa-sharp fa-solid fa-underline"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        @click="set_font_style"
        :class="fontStyle == 'italic' && 'active'"
      >
        <i class="fa-sharp fa-solid fa-italic"></i>
      </button>
    </div>
    <div class="tool">
      <i class="fa-solid fa-font" style="margin-right: 10px"></i>
      <input
        type="color"
        id="colorpicker"
        v-model="color_pallet"
        @change="set_font_color"
      />
    </div>
    <div class="tool">
      <i class="fa-solid fa-fill-drip" style="margin-right: 10px"></i>
      <input
        type="color"
        id="colorpicker1"
        v-model="backColor_pallet"
        @change="set_font_background_color"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextToolBar",
  props: {
    fontFamilyProps: {
      default: "Arial",
    },
    // fontSizeProps: {
    //   default: 16,
    // },
    underlineProps: {
      default: false,
    },
    fontWeightProps: {
      default: "normal",
    },
    fontStyleProps: {
      default: "normal",
    },
  },
  data() {
    return {
      fontSize: 16,
      fontFamily: "Arial",
      fontWeight: "normal",
      fontStyle: "normal",
      color_pallet: "#212121",
      backColor_pallet: "#ffffff",
      underline: false,
    };
  },
  watch: {
    // fontSizeProps(newValue) {
    //   this.fontSize = newValue;
    // },
    fontFamilyProps(newValue) {
      this.fontFamily = newValue;
      console.log(
        this.fontFamilyProps,
        this.fontWeightProps,
        this.fontStyleProps
      );
    },
    fontStyleProps(newValue) {
      this.fontStyle = newValue;
      console.log(newValue);
    },
    fontWeightProps(newValue) {
      this.fontWeight = newValue;
    },
    underlineProps(newValue) {
      this.underline = newValue;
    },
  },
  methods: {
    set_font_underline() {
      this.underline = !this.underline;
      this.$emit("set_font_underline", this.underline);
    },
    set_font_weight() {
      console.log(this.fontWeight);
      this.fontWeight = this.fontWeight == "normal" ? "bold" : "normal";
      this.$emit("set_font_weight", this.fontWeight);
    },
    set_font_style() {
      this.fontStyle = this.fontStyle == "normal" ? "italic" : "normal";
      this.$emit("set_font_style", this.fontStyle);
    },
    set_font_size() {
      console.log(123);
      this.$emit("set_font_size", this.fontSize);
    },
    set_font_family() {
      this.$emit("set_font_family", this.fontFamily);
      // console.log(this.fontFamily);
    },
    set_color1() {
      this.$emit("set_color1", this.color_pallet);
    },
    set_font_color() {
      this.$emit("set_font_color", this.color_pallet);
    },
    set_font_background_color() {
      this.$emit("set_font_background_color", this.backColor_pallet);
    },
  },
};
</script>
<style scoped>
#colorpicker,
#colorpicker1 {
  height: 25px !important;
  width: 25px;
}
.edit-text-toolbar {
  position: absolute !important;
  top: 50px !important;
  padding-left: 20%;
}
</style>
