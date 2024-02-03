<template>
  <div class="pageContainer">
    <canvas :id="idName"></canvas>
  </div>
</template>

<script>
import "pdfjs-dist/web/pdf_viewer.css";
import {
  GlobalWorkerOptions,
  getDocument,
  pdfjsLib,
} from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { v4 as uuidv4 } from "uuid";
GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  props: {
    fileUrl: {
      required: true,
    },
    pageNumber: {
      default: 1,
    },
    pdf: {
      default: null,
    },
  },
  data() {
    return {
      url: this.fileUrl,
      numPages: 1,
      pdfDocument: null,
      idName: uuidv4(),
      num: this.pageNumber,
    };
  },
  watch: {
    pageNumber(newValue) {
      this.num = newValue;
      this.url = this.fileUrl;
      this.getPdfDocument();
    },
  },

  mounted() {
    this.getPdfDocument();
  },

  methods: {
    async getPdfDocument() {
      if (this.pdf) {
        this.numPages = this.pdf.numPages;
        this.pdfDocument = this.pdf;
        this.getPage(this.num);
      } else {
        getDocument({
          url: this.url,
          disableNativeImageDecoder: false,
        }).promise.then(
          (pdf) => {
            this.numPages = pdf.numPages;
            this.pdfDocument = pdf;
            this.getPage(this.num);
          },
          (reason) => {
            console.error(reason);
          }
        );
      }
    },

    getPage(num) {
      this.pdfDocument.getPage(num).then((page) => {
        var viewport = page.getViewport({ scale: 1.5 });

        var canvas = document.getElementById(this.idName);
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.pageContainer {
  margin: auto;
  width: 145px;
  height: 180px;
}

.pageContainer canvas {
  height: 180px !important;
}
</style>
