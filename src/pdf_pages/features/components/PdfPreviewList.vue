<template>
  <div id="pageContainer">
    <div class="stepper">
      <div>
        <input type="button" value="Previous" @click="previousPage" />
      </div>
      <div class="info">Page {{ currentPage }} of {{ numPages }}</div>
      <div><input type="button" value="Next" @click="nextPage" /></div>
    </div>
    <div class="pdf-preview-list">
      <div
        v-for="page in numPages"
        :key="page"
        class="pdf-page"
        @click="set_current_page(page)"
      >
        <PdfViewer :fileUrl="url" :pageNumber="page" />
        {{ page }}
      </div>
    </div>
    <!-- <canvas id="pdf-container"></canvas> -->
  </div>
</template>

<script>
import "pdfjs-dist/web/pdf_viewer.css";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import PdfViewer from "@/components/PdfViewer.vue";

export default {
  components: {
    PdfViewer,
  },
  props: ["url"],
  data() {
    return {
      numPages: 1,
      currentPage: 1,
      pdfDocument: null,
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
          this.getPage(this.currentPage);
        },
        (reason) => {
          console.error(reason);
        }
      );
    },
    set_current_page(page) {
      this.currentPage = page;
      this.getPage(this.currentPage);
    },

    getPage(currentPage) {
      this.pdfDocument.getPage(currentPage).then((page) => {
        const viewport = page.getViewport({ scale: 1 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
          // Convert the canvas content to a Blob
          canvas.toBlob(() => {
            // Create a Blob URL from the Blob
            // const blobUrl = URL.createObjectURL(blob);

            // Convert the canvas content to a data URL
            const imageUrl = canvas.toDataURL("image/png");
            this.$emit("set_img", { url: imageUrl, pageNum: currentPage });
          }, "image/png");
        });
      });
    },

    previousPage() {
      this.currentPage =
        this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
      this.getPage(this.currentPage);
    },

    nextPage() {
      this.currentPage =
        this.currentPage < this.numPages
          ? this.currentPage + 1
          : this.currentPage;
      this.getPage(this.currentPage);
    },
  },
};
</script>

<style>
#pageContainer {
  margin: auto;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10px;
  right: 30px;
  position: relative;
}

.stepper .info {
  padding-left: 10px;
  padding-right: 10px;
}
.pdf-preview-list {
  margin-top: 30px;
}
.pdf-page {
  margin-bottom: 10px;
}
</style>
