<template>
  <div class="edit-pdf-content">
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
        />
      </div>

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
        <button
          class="color-tool active black-tool"
          @click="set_color('black')"
          style="background-color: black"
        ></button>
        <button
          class="color-tool red-tool"
          @click="set_color('red')"
          style="background-color: red"
        ></button>
        <button
          class="color-tool blue-tool"
          @click="set_color('blue')"
          style="background-color: blue"
        ></button>
        <button
          class="color-tool green-tool"
          @click="set_color('green')"
          style="background-color: green"
        ></button>
        <button
          class="color-tool yellow-tool"
          @click="set_color('yellow')"
          style="background-color: yellow"
        ></button>
      </div>
      <!-- Toolbar content -->
      <!-- Example: -->
      <div class="tool">
        <button class="tool-button active">
          <i
            class="fa-regular fa-hand"
            title="Free Hand"
            id="free_hand"
            v-on:click="enableSelector"
          ></i>
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
      <div class="tool">
        <button class="btn btn-light btn-sm" @click="savePDF()">
          <i class="fa fa-save"></i> Save
        </button>
      </div>
      <!-- Replace other @click events similarly -->
    </div>
    <div id="pdf-container-annotate"></div>
    <!-- Modal content -->
  </div>
</template>

<script>
// Import necessary libraries here
import "bootstrap/scss/bootstrap.scss";
import "@/assets/annotations/styles.css";
import "@/assets/annotations/pdfannotate.css";
import $ from "jquery";
import { PDFAnnotate } from "@/assets/annotations/pdfannotate.js";

export default {
  mounted() {
    this.loadScripts();
  },
  data() {
    return {
      pdf: null,
      brushSize: 1,
      fontSize: 12,
    };
  },
  methods: {
    loadScripts() {
      var pdf = new PDFAnnotate(
        "pdf-container-annotate",
        "http://127.0.0.1:5000/uploads/8598b0f8-3580-48d4-891f-4d5b8cb96af2.pdf"
      );
      this.pdf = pdf;
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
    },
    enablePencil: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enablePencil();
    },
    enableAddText: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddText();
    },
    enableAddArrow: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.enableAddArrow(function () {
        $(".tool-button").first().find("i").click();
      });
    },
    enableRectangle: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.setColor("rgba(255, 0, 0, 0.3)");
      this.pdf.setBorderColor("blue");
      this.pdf.enableRectangle();
    },
    addImage: function (event) {
      event.preventDefault();
      this.changeActiveTool(event);
      this.pdf.addImageToCanvas();
    },
    deleteSelectedObject: function (event) {
      event.preventDefault();
      this.pdf.deleteSelectedObject();
    },
    clearPage() {
      this.pdf.clearActivePage();
    },
    savePDF() {
      this.pdf.savePdf("output.pdf");
    },
    set_color(color) {
      $(".color-tool.active").removeClass("active");
      $(`.${color}-tool`).addClass("active");
      this.pdf.setColor(color);
    },
    set_font_size() {
      console.log(this.fontSize);
      this.pdf.setFontSize(this.fontSize);
    },
    set_brush_size() {
      console.log(this.brushSize);
      this.pdf.setBrushSize(this.brushSize);
    },
  },
};
</script>
