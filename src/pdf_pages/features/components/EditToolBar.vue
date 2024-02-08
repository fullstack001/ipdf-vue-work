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

    <div class="tool">
      <button
        class="tool-button"
        :class="{ active: toolShow == 'hand' }"
        @click="enableSelector"
      >
        <i class="fa-regular fa-hand" title="Free Hand" id="free_hand"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        @click="enablePencil"
        :class="{ active: toolShow == 'brush' }"
      >
        <i class="fa fa-pencil" title="Pencil"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        @click="enableText"
        :class="{ active: toolShow == 'text' }"
      >
        <i class="fa fa-font" title="Add Text"></i>
      </button>
    </div>
    <div class="tool">
      <button
        class="tool-button"
        @click="toolShow = 'shape'"
        :class="{ active: toolShow == 'shape' }"
      >
        <i class="fa-solid fa-shapes"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button" @click="$emit('addImage')">
        <i class="fa-regular fa-image" title="Add an Image"></i>
      </button>
    </div>

    <div class="tool active">
      <button class="tool-button" @click="$emit('deleteSelectedObject')">
        <i class="fa fa-trash"></i>
      </button>
    </div>
    <TextToolBar
      v-if="toolShow == 'text'"
      @set_font_family="set_font_family"
      @set_font_size="set_font_size"
      @set_font_style="set_font_style"
      @set_font_weight="set_font_weight"
      @set_font_color="set_font_color"
      @set_font_background_color="set_font_background_color"
      @set_font_underline="set_font_underline"
    />
    <EditTextToolBar
      v-show="toolShow == 'edit_text'"
      @set_font_family="edit_set_font_family"
      @set_font_size="edit_set_font_size"
      @set_font_style="edit_set_font_style"
      @set_font_weight="edit_set_font_weight"
      @set_font_underline="edit_set_font_underline"
      @set_font_color="edit_set_font_color"
      @set_font_background_color="edit_set_font_background_color"
      :fontFamilyProps="fontFamily"
      :fontStyleProps="fontStyle"
      :underlineProps="underline"
      :fontWeightProps="fontWeight"
    />
    <ShapeToolBar
      v-show="toolShow == 'shape'"
      @enableAddArrow="enableAddArrow"
      @enableRectangle="enableRectangle"
      @enableCircle="enableCircle"
      @enableLine="enableAddLine"
      @set_color="set_color"
    />
    <BrushToolBar
      v-show="toolShow == 'brush'"
      @set_color="set_color"
      @set_brushSize="(data) => $emit('set_brushSize', data)"
    />
  </div>
</template>
<script>
import EditTextToolBar from "./EditTextToolBar.vue";
import TextToolBar from "./TextToolBar.vue";
import ShapeToolBar from "./ShapeToolBar.vue";
import BrushToolBar from "./BrushToolBar.vue";
import $ from "jquery";
export default {
  components: {
    EditTextToolBar,
    TextToolBar,
    ShapeToolBar,
    BrushToolBar,
  },
  props: [
    "pages",
    "currentPageProps",
    "show_tools",
    "pdf",
    "activeObjectProps",
  ],
  data() {
    return {
      currentPage: 1,
      toolShow: null,
      temp: null,
      brushSize: 1,
      fontFamily: "Arial",
      fontSize: 16,
      fontStyle: "normal",
      fontWeight: "normal",
      underline: false,
      color_pallet: "#000",
      activeObject: null,
      firsted: false,
    };
  },
  watch: {
    currentPageProps(newValue) {
      this.currentPage = newValue;
    },
    show_tools(newValue) {
      this.toolShow = "edit_text";
      this.activeObject = this.activeObjectProps;
      console.log(newValue, this.toolShow);
    },
  },
  methods: {
    enablePencil() {
      this.toolShow = "brush";
      this.$emit("enablePencil");
    },
    enableSelector() {
      this.toolShow = "hand";
      this.$emit("enableSelector");
    },

    set_color(data) {
      this.pdf.setColor(data);
      this.color_pallet = data;
    },
    enableAddArrow() {
      this.pdf.setColor(this.color_pallet);
      this.pdf.enableAddArrow(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableAddLine() {
      this.pdf.setColor(this.color_pallet);
      this.pdf.enableAddLine(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableRectangle() {
      this.pdf.setColor(this.color_pallet);
      this.pdf.setBorderColor(this.color_pallet);
      // this.pdf.enableRectangle();
      this.pdf.enableRectangle(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableCircle() {
      this.pdf.setColor(this.color_pallet);
      this.pdf.setBorderColor(this.color_pallet);
      this.pdf.enableCircle();
    },
    enableText() {
      this.toolShow = "text";
      this.pdf.enableAddText();
      this.pdf.defaultFontStyle();
    },
    set_font_size(data) {
      this.fontSize = data;
      this.pdf.setFontSize(data);
    },
    set_font_family(data) {
      this.fontFamily = data;
      this.pdf.setFontFamily(data);
    },
    set_font_weight(data) {
      this.fontWeight = data;
      this.pdf.setFontWeight(data);
    },
    set_font_style(data) {
      this.fontStyle = data;
      this.pdf.setFontStyle(data);
    },
    set_font_underline(data) {
      this.underline = data;
      this.pdf.setFontUnderline(data);
    },
    set_font_color(data) {
      this.pdf.setFontColor(data);
      this.color_pallet = data;
    },
    set_font_background_color(data) {
      this.pdf.setFontBackgroundColor(data);
    },
    edit_set_font_color(data) {
      this.firsted = !this.firsted;
      this.activeObject.fill = data;
      if (this.firsted) {
        this.activeObject.fontSize = this.activeObject.fontSize + 1;
      } else {
        this.activeObject.fontSize = this.activeObject.fontSize - 1;
      }
      this.renderCanvas();
    },
    edit_set_font_background_color(data) {
      this.firsted = !this.firsted;
      this.activeObject.backgroundColor = data;
      if (this.firsted) {
        this.activeObject.fontSize = this.activeObject.fontSize + 1;
      } else {
        this.activeObject.fontSize = this.activeObject.fontSize - 1;
      }
      this.renderCanvas();
    },
    edit_set_font_underline(data) {
      this.underline = data;
      this.firsted = !this.firsted;
      this.activeObject.underline = data;
      if (this.firsted) {
        this.activeObject.fontSize = this.activeObject.fontSize + 1;
      } else {
        this.activeObject.fontSize = this.activeObject.fontSize - 1;
      }

      this.renderCanvas();
    },
    edit_set_font_size(data) {
      this.activeObject.fontSize = data;
      this.renderCanvas();
      this.fontSize = data;
    },
    edit_set_font_family(data) {
      this.activeObject.fontFamily = data;
      this.renderCanvas();
      this.fontFamily = data;
    },
    edit_set_font_weight(data) {
      this.activeObject.fontWeight = data;
      this.renderCanvas();
      this.fontWeight = data;
    },
    edit_set_font_style(data) {
      this.activeObject.fontStyle = data;
      this.renderCanvas();
      this.fontStyle = data;
    },
    renderCanvas() {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (activeObject.text) {
        this.pdf.fabricObjects[this.pdf.active_canvas].remove(activeObject);
        this.pdf.fabricObjects[this.pdf.active_canvas].add(this.activeObject);
      }
      // this.pdf.fabricObjects[this.pdf.active_canvas].renderAll();
      // $(".tool-button").first().find("i").click();
    },
  },
};
</script>
<style scoped>
@import "../../../assets/css/toolbar.css";
</style>
