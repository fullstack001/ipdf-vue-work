<template>
  <div class="edit-pdf-content" ref="scrollableDiv">
    <div class="toolbar">
      <div class="tool">
        <button class="tool-button active" v-on:click="enableSelector">
          <i class="fa-regular fa-hand" title="Free Hand" id="free_hand"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button" v-on:click="enablePencil">
          <i class="fa fa-pencil" title="Pencil"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button" v-on:click="enableAddText">
          <i class="fa fa-font" title="Add Text"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button" v-on:click="enableAddShape">
          <i class="fa-solid fa-shapes"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button">
          <i
            class="fa-regular fa-image"
            title="Add an Image"
            v-on:click="addImage"
          ></i>
        </button>
      </div>

      <div class="tool">
        <button class="btn btn-danger btn-sm" v-on:click="deleteSelectedObject">
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <div class="tool">
        <button class="btn btn-danger btn-sm" @click="clearPage()">
          Clear Page
        </button>
      </div>
    </div>
    <TextToolBar
      v-if="show_tools == 'text'"
      @set_font_family="set_font_family"
      @set_font_size="set_font_size"
      @set_font_style="set_font_style"
      @set_font_weight="set_font_weight"
      @set_font_color="set_font_color"
      @set_font_background_color="set_font_background_color"
      @set_font_underline="set_font_underline"
    />
    <EditTextToolBar
      v-show="show_tools == 'edit_text'"
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
      v-if="show_tools == 'shape'"
      @enableAddArrow="enableAddArrow"
      @enableRectangle="enableRectangle"
      @enableCircle="enableCircle"
      @enableLine="enableAddLine"
      @set_color="set_color"
    />
    <BrushToolBar
      v-if="show_tools == 'brush'"
      @set_color="set_color"
      @set_brushSize="set_brush_size"
    />
    <div id="pdf-container-annotate" @click="editable_text"></div>
    <!-- Modal content -->
  </div>
</template>

<script>
// Import necessary libraries here
// import "bootstrap/scss/bootstrap.scss";
import "@/assets/js/styles.css";
import "@/assets/js/pdfannotate.css";
import TextToolBar from "@/pdf_pages/features/components/TextToolBar.vue";
import $ from "jquery";
import { PDFAnnotate } from "@/assets/js/pdfannotate.js";
import ShapeToolBar from "./ShapeToolBar.vue";
import EditTextToolBar from "./EditTextToolBar.vue";
import BrushToolBar from "./BrushToolBar.vue";

export default {
  components: {
    TextToolBar,
    ShapeToolBar,
    EditTextToolBar,
    BrushToolBar,
  },
  created() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler);
  },
  mounted() {
    this.loadScripts();
    console.log(Date.now());
  },
  onMounted() {
    console.log("aaaaaaa");
  },
  beforeUpdate() {
    console.log(Date.now());
  },
  props: {
    pdfUrl: {
      require: true,
      type: String,
    },
    get_pdf: {
      default: false,
    },
    currentPage: {
      require: true,
    },
    totalPageNum: {
      require: true,
    },
  },
  watch: {
    get_pdf(newValue) {
      if (newValue == true) {
        this.savePDF();
      }
    },
    currentPage(newValue) {
      if (newValue != 0) {
        const scrollableDiv = this.$refs.scrollableDiv;
        const totalHeight =
          scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
        // const scrollToPosition =
        //   ((newValue - 1) / this.totalPageNum) * totalHeight * 1.2;
        const targetElement = document.getElementById(
          `page-${newValue}-canvas`
        );
        const elementHeight = targetElement.offsetHeight;
        this.setScrollbarPosition((elementHeight + 25) * (newValue - 1));
      }
    },
  },
  data() {
    return {
      pdf: null,
      brushSize: 1,
      fontFamily: "Arial",
      fontSize: 16,
      fontStyle: "normal",
      fontWeight: "normal",
      underline: false,
      color_pallet: "#212121",
      show_tools: null,
      activeObject: null,
      firsted: false,
    };
  },
  methods: {
    keyDownHandler(e) {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (e.key == "Delete" && activeObject) {
        this.pdf.fabricObjects[this.pdf.active_canvas].remove(activeObject);
        // this.pdf.fabricObjects[this.pdf.active_canvas].renderAll();
      }
      // Your handler code here
    },
    async loadScripts() {
      var pdf = await new PDFAnnotate("pdf-container-annotate", this.pdfUrl, {
        scale: 1.3,
        pageImageCompression: "FAST", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
      });
      // this.$nextTick(() => {
      //   console.log(123123123123123);
      //   // Perform actions such as DOM manipulation or API calls
      // });
      this.pdf = pdf;
    },
    setScrollbarPosition(position) {
      // Set the scrollbar's location programmatically
      this.$refs.scrollableDiv.scrollTop = position;
    },
    changeActiveTool(event) {
      var element = $(event.target).hasClass("tool-button")
        ? $(event.target)
        : $(event.target).parents(".tool-button").first();
      $(".tool-button.active").removeClass("active");
      $(element).addClass("active");
    },
    enableSelector: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableSelector();
      this.show_tools = null;
    },
    enablePencil: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enablePencil();
      this.show_tools = "brush";
    },
    enableAddText: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddText();
      this.show_tools = "text";
      this.pdf.defaultFontStyle();
    },
    enableAddShape() {
      event.preventDefault();
      this.changeActiveTool(event);
      this.show_tools = "shape";
    },
    enableAddArrow: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddArrow(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableAddLine: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddLine(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableRectangle: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.setColor(this.color_pallet);
      this.pdf.setBorderColor(this.color_pallet);
      // this.pdf.enableRectangle();
      this.pdf.enableRectangle(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableCircle: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.setColor(this.color_pallet);
      this.pdf.setBorderColor(this.color_pallet);
      this.pdf.enableCircle();
    },
    addImage: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.addImageToCanvas();
      this.show_tools = null;
    },
    deleteSelectedObject: function (event) {
      event.preventDefault();
      this.pdf.deleteSelectedObject();
    },
    clearPage() {
      this.pdf.clearActivePage();
    },
    async savePDF() {
      const data = await this.pdf.savePdf("output.pdf");
      console.log(data);
      this.$emit("upload", data);
    },

    set_font_color(data) {
      this.pdf.setFontColor(data);
      this.color_pallet = data;
      $(".tool-button").first().find("i").click();
    },
    set_font_background_color(data) {
      this.pdf.setFontBackgroundColor(data);
      $(".tool-button").first().find("i").click();
    },
    set_color(data) {
      this.color_pallet = data;
      this.pdf.setColor(data);
    },
    set_brush_size(data) {
      this.pdf.setBrushSize(data);
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
    editable_text() {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (activeObject) {
        if (activeObject.text) {
          console.log(activeObject);
          this.activeObject = activeObject;
          this.show_tools = "edit_text";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>

<style scoped>
.canvas-container {
  position: absolute !important;
}
.edit-pdf-content {
  max-height: 100vh;
  overflow-y: scroll;
  min-height: 100vh;
}

#colorpicker {
  height: 25px !important;
}
</style>
