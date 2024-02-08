<template>
  <div class="edit-container">
    <div class="main-edit">
      <RendingProgressVue
        :page="pageNumProps"
        :loadingPage="loadingPage"
        v-show="rendering"
      />
      <EditToolBar
        :pages="pages"
        :currentPageProps="currentPage"
        :show_tools="show_tools"
        :activeObjectProps="activeObject"
        @set_page="set_page"
        @enablePencil="pdf.enablePencil()"
        @enableSelector="pdf.enableSelector()"
        @set_brushSize="(data) => pdf.setBrushSize(data)"
        @deleteSelectedObject="pdf.deleteSelectedObject()"
        @addImage="pdf.addImageToCanvas()"
        v-if="!rendering"
        :pdf="pdf"
      />
      <div class="edit-content" v-if="imageItems" v-show="!rendering">
        <div id="pdf-preview-list" ref="list_scrollContainer">
          <img
            v-for="(imageItem, index) in imageItems"
            :key="index"
            :id="'list' + index"
            :src="imageItem.img"
            class="pdf-preview-item"
            alt="Image"
          />
        </div>
        <div
          id="pdf-edit-list"
          ref="scrollContainer"
          v-show="!rendering"
          @click="editable_text"
        >
          <div
            v-for="(imageItem, index) in imageItems"
            :key="index"
            :id="index"
            class="pdf-edit-item-container"
            :style="{
              width: `${imageItem.width}px`,
              height: `${imageItem.height}px`,
            }"
            ref="imageElement"
          >
            <img :src="imageItem.img" alt="Image" />
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar">
      <div class="tool__sidebar" style="overflow-y: auto">
        <div class="edit-title">
          <h3 class="text-center">
            {{ $t("page_titles.edit_page.editPdf") }}
          </h3>
        </div>

        <div class="edit-description">
          <div class="edit-desc-title">
            {{ $t("page_titles.edit_page.elements") }}
          </div>
          <div class="edit-desc-detail">
            {{ $t("page_titles.edit_page.ele_des") }}
          </div>
        </div>

        <div class="option__panel option__panel--active" id="merge-options">
          <button class="edit-btn" @click="edit_pdf">
            {{ $t("page_titles.edit_page.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
    <div id="temp_canvas" style="display: none"></div>
  </div>
</template>
<script>
import RendingProgressVue from "./RendingProgress.vue";
import convertPDFImg from "../../services/convertPDFImg.js";
import EditToolBar from "./EditToolBar.vue";
import { PDFAnnotate } from "@/assets/js/pdfannotate.js";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import $ from "jquery";
export default {
  components: {
    EditToolBar,
    RendingProgressVue,
  },
  props: ["pdfUrl", "pageNumProps"],
  data() {
    return {
      pages: 1,
      currentPage: 1,
      imageItems: [],
      observer: null,
      pdf: null,
      canvases: [],
      rendering: true,
      loadingPage: 0,
      color: "#000",
      show_tools: false,
      activeObject: null,
    };
  },
  mounted() {
    this.loadPdf();
  },
  computed: {
    imageElements() {
      return this.$refs.imageElement || [];
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      const index = newValue - 1;
      const targetElement = document.getElementById(index);
      const listTargetElement = document.getElementById(`list${index}`);
      this.$refs.list_scrollContainer.scrollTop =
        (listTargetElement.offsetHeight + 20) * (newValue - 1);

      const targetPosition = (targetElement.offsetHeight + 20) * (newValue - 1);
      const container = this.$refs.scrollContainer;
      const duration = Math.abs(newValue - oldValue) * 100;
      this.scrollToTarget(container, targetPosition, duration);
      // this.$refs.scrollContainer.scrollTop =
      //   (targetElement.offsetHeight + 20) * (newValue - 1);
    },
  },
  methods: {
    async loadPdf() {
      this.pages = this.pageNumProps;
      const pdf = await getDocument(this.pdfUrl).promise.then((pdf) => {
        return pdf;
      });
      for (let i = 1; i <= this.pages; i++) {
        const imageItem = await convertPDFImg(pdf, i);
        await this.imageItems.push(imageItem);
        this.loadingPage = i;
      }
      this.$nextTick().then(() => {
        // Now, the DOM has been updated, and you can safely execute the next statement
        this.observer = new IntersectionObserver(this.handleIntersection, {
          threshold: 0.5,
        });
        this.imageElements.forEach((element) => {
          this.observer.observe(element);
        });
        this.canvases.push(0);
        this.loadScripts();
      });
    },
    async loadScripts() {
      var pdf = await new PDFAnnotate("pdf-edit-list", this.pdfUrl, 0, {
        scale: 2,
        pageImageCompression: "FAST", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
      });
      this.pdf = pdf;
      this.rendering = false;
    },
    set_page(data) {
      this.currentPage = data;
    },
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.pdf) {
            const pageNum = entry.target.id * 1;
            if (this.canvases.indexOf(pageNum) < 0) {
              this.canvases.push(pageNum);
              this.pdf.addCanvas(pageNum);
            }
          }
        } else {
          // console.log("Image scrolled out of view:", entry.target.id);
        }
      });
    },
    scrollToTarget(scrollContainer, targetPosition, duration) {
      const start = scrollContainer.scrollTop;
      const distance = targetPosition - start;
      const startTime = performance.now();

      function scrollAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(1, elapsedTime / duration);
        const newPosition = start + distance * scrollProgress;

        scrollContainer.scrollTop = newPosition;

        if (scrollProgress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      }

      requestAnimationFrame(scrollAnimation);
    },
    async edit_pdf() {
      this.canvases.sort((a, b) => a - b);
      console.log(this.canvases);
      const items = await this.pdf.savePdf(this.canvases, this.imageItems);
      this.$emit("upload", items);
    },

    editable_text() {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (activeObject) {
        if (activeObject.text) {
          console.log(activeObject);
          this.activeObject = activeObject;
          this.show_tools = !this.show_tools;
        }
      }
    },
  },
};
</script>

<style scoped>
.pdf-preview-item {
  width: 95px;
  border: dotted 0.5px #ff7c03;
  height: 135px;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 3px 0px rgb(110, 110, 54);
}
.pdf-edit-item-container {
  border: dotted 0.5px #ff7c03;
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 0px 3px 3px 0px rgb(110, 110, 54);
}
.edit-container {
  display: flex;
}
.main-edit {
  width: 79%;
}
.edit-content {
  display: flex;
}
#pdf-preview-list {
  min-width: 200px;
  max-width: 200px;
  height: 95vh;
  background-color: #fff;
  display: grid;
  overflow-y: auto;
  padding-top: 50px;
}
#pdf-edit-list {
  height: 95vh;
  width: 100%;
  overflow-y: auto;
  padding-top: 50px;
}
</style>
