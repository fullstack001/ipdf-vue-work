<template>
  <div class="pageContainer">
    <canvas :id="idName"></canvas>
  </div>
</template>

<script>
import "pdfjs-dist/web/pdf_viewer.css";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { v4 as uuidv4 } from "uuid";
GlobalWorkerOptions.workerSrc = PDFJSWorker;

export default {
  props: {
    fileUrl: {
      required: true,
    },
  },
  data() {
    return {
      url: this.fileUrl,
      numPages: 1,
      pageNumber: 1,
      pdfDocument: null,
      idName: uuidv4(),
    };
  },

  mounted() {
    this.getPdfDocument();
  },

  methods: {
    async getPdfDocument() {
      getDocument(this.url).promise.then(
        (pdf) => {
          this.numPages = pdf.numPages;
          this.pdfDocument = pdf;
          this.getPage(this.pageNumber);
        },
        (reason) => {
          console.error(reason);
        }
      );
    },

    getPage(pageNumer) {
      this.pdfDocument.getPage(pageNumer).then((page) => {
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

        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
  },
};
</script>

<style>
.pageContainer {
  margin: auto;
  width: 145px;
  height: 180px;
}
</style>
