<template>
  <div id="pageContainer">
    <div class="stepper toolbar">
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-up"
          style="font-size: medium"
          @click="previousPage"
        ></i>
      </div>
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-down"
          style="font-size: medium"
          @click="nextPage"
        ></i>
      </div>
      <div class="info">
        <input
          v-model="currentPage"
          type="number"
          :max="numPages"
          :min="1"
          style="width: 40px; height: 24px; margin-right: 3px"
          @change="() => getPage(currentPage * 1)"
        />
        / {{ numPages }}
      </div>
    </div>
    <div class="pdf-preview-list" ref="scrollableList">
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
          window.console.error(reason);
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
            this.$emit("set_img", {
              url: imageUrl,
              pageNum: currentPage,
              totalPageNum: this.numPages,
            });
          }, "image/png");
        });
      });

      const scrollableDiv = this.$refs.scrollableList;
      const totalHeight =
        scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
      const scrollToPosition = (currentPage - 1) * 210 + 35;
      this.setScrollbarPosition(scrollToPosition);
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
    setScrollbarPosition(position) {
      // Set the scrollbar's location programmatically
      this.$refs.scrollableList.scrollTop = position;
    },
  },
};
</script>

<style scoped>
#pageContainer {
  margin: auto;
}

.arrow {
  background-color: white;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 1px;
  color: black;
  margin-left: 5px;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: sticky; */
  top: 0px;
  height: 50px;
  background-color: #f5f5fa;
  color: rgb(50, 54, 57);
  padding: 10px 0px;
  box-shadow: 5px 0px 5px 0px rgba(87, 81, 81, 0.75);
}

.stepper .info {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
}
.pdf-preview-list {
  margin-bottom: 50px;
  height: 95vh;
  overflow-y: scroll;
  padding-top: 50px;
}
.pdf-page {
  margin-bottom: 10px;
}
input {
  padding: 2px;
  border-radius: 5px;
  border-width: thin;
}
</style>
