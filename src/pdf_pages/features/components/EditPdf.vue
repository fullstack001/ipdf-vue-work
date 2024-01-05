<template>
  <div class="edit-pdf-content" ref="scrollableDiv">
    <div class="toolbar">
      <div class="tool">
        <label for="">Brush size </label>
        <input
          type="number"
          class="form-control text-right"
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
          @change="set_color0"
        />
      </div>
      <div class="tool">
        <button class="tool-button active" v-on:click="enableSelector">
          <i class="fa-regular fa-hand" title="Free Hand" id="free_hand"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button">
          <i class="fa fa-pencil" title="Pencil" v-on:click="enablePencil"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button">
          <i class="fa fa-font" title="Add Text" v-on:click="enableAddText"></i>
        </button>
      </div>
      <div class="tool">
        <button class="tool-button">
          <i class="fa-solid fa-shapes" v-on:click="enableAddShape"></i>
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
      <!-- <div class="tool">
        <button class="btn btn-info btn-sm" @click="showPdfData()">{}</button>
      </div> -->
      <!-- <div class="tool">
        <button class="btn btn-light btn-sm" @click="savePDF()">
          <i class="fa fa-save"></i> Save
        </button>
      </div> -->
      <!-- Replace other @click events similarly -->
    </div>
    <TextToolBar
      v-if="show_tools == 'text'"
      @set_font_family="set_font_family"
      @set_font_size="set_font_size"
      @set_font_style="set_font_style"
      @set_font_weight="set_font_weight"
      @set_color1="set_color1"
    />
    <ShapeToolBar
      v-if="show_tools == 'shape'"
      @enableAddArrow="enableAddArrow"
      @enableRectangle="enableRectangle"
      @enableCircle="enableCircle"
      @enableLine="enableAddLine"
    />
    <div id="pdf-container-annotate"></div>
    <!-- Modal content -->
  </div>
</template>

<script>
// Import necessary libraries here
import "bootstrap/scss/bootstrap.scss";
import "@/pdf_pages/services/annotations/styles.css";
import "@/pdf_pages/services/annotations/pdfannotate.css";
import TextToolBar from "@/pdf_pages/features/components/TextToolBar.vue";
import $ from "jquery";
import { PDFAnnotate } from "@/pdf_pages/services/annotations/pdfannotate.js";
import ShapeToolBar from "./ShapeToolBar.vue";

export default {
  components: {
    TextToolBar,
    ShapeToolBar,
  },
  mounted() {
    this.loadScripts();
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
    pdf(newValue) {
      console.log(newValue);
    },
  },
  data() {
    return {
      pdf: null,
      brushSize: 1,
      fontSize: 12,
      color_pallet: "#212121",
      show_tools: null,
    };
  },
  methods: {
    loadScripts() {
      var pdf = new PDFAnnotate("pdf-container-annotate", this.pdfUrl);
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
      this.show_tools = null;
    },
    enableAddText: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddText();
      this.show_tools = "text";
    },
    enableAddShape() {
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
      console.log(event);
      event.preventDefault();
      this.pdf.deleteSelectedObject();
    },
    clearPage() {
      this.pdf.clearActivePage();
    },
    async savePDF() {
      const url = await this.pdf.savePdf("output.pdf");
      this.$emit("upload", url);
    },
    set_color(color) {
      $(".color-tool.active").removeClass("active");
      $(`.${color}-tool`).addClass("active");
      this.pdf.setColor(color);
    },
    set_color1(data) {
      this.pdf.setColor(data);
      this.color_pallet = data;
    },
    set_color0() {
      this.pdf.setColor(this.color_pallet);
    },
    set_font_size(data) {
      this.pdf.setFontSize(data);
    },
    set_font_family(data) {
      this.pdf.setFontFamily(data);
    },
    set_brush_size() {
      console.log(this.brushSize);
      this.pdf.setBrushSize(this.brushSize);
    },
    set_font_weight(data) {
      this.pdf.setFontWeight(data);
    },
    set_font_style(data) {
      this.pdf.setFontStyle(data);
    },
    handleKeyPress: function (event) {
      console.log(event);
      // Check if the pressed key is the delete key
      if (event.key === "Delete") {
        console.log("Delete key pressed");
        // Add your delete key handling logic here
      }
    },
  },
};
</script>

<style scoped>
.canvas-container {
  position: absolute !important;
}
.edit-pdf-content {
  max-height: 100vh;
  overflow-y: scroll;
}

#colorpicker {
  height: 25px !important;
}
</style>
