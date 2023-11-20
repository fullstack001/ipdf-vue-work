<template>
  <div class="main">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="draggable-item"
      draggable="true"
      @dragstart="dragStart(index, $event)"
      @dragover.prevent
      @drop="drop_m(index, $event)"
    >
      {{ item }}
    </div>

    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf"
      />

      <div v-show="files.length <= 0">
        <div>
          <md-button class="uploader__btn md-raised md-danger"
            >Select PDF files</md-button
          >
        </div>
        <VueDropboxPicker
          class="cloud dropbox"
          :api-key="'fvpl8xhvbq877as'"
          link-type="direct"
          :multiselect="true"
          :extensions="['.pdf', '.doc']"
          :folderselect="false"
          @picked="onPickedDropbox"
        >
          <span>Open Dropbox Picker</span>
        </VueDropboxPicker>
      </div>

      <div class="preview-container mt-4" v-if="files.length">
        <div
          v-for="(file, index) in files"
          :key="index"
          draggable="true"
          @dragstart="dragStart(index, $event)"
          @dragover.prevent
          @drop="drop_m(index, $event)"
        >
          <div class="preview-card">
            <div class="file__actions">
              <a
                class="file__btn rotate tooltip--top tooltip"
                data-rotate="0"
                title="Rotate"
                data-title="Rotate"
                @click="getRotationDegree(`id${index}`)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                >
                  <path
                    d="M11.328 6.364l1.24-1.2c.79.98 1.283 2.113 1.433 3.288h-1.775c-.123-.735-.43-1.454-.896-2.088zm.896 3.778H14c-.15 1.175-.633 2.308-1.424 3.288l-1.24-1.2c.457-.634.765-1.344.888-2.088zm-.888 4.497C10.318 15.4 9.13 15.856 7.9 16v-1.716a5.31 5.31 0 0 0 2.162-.871l1.266 1.226zM6.152 2.595V0l4 3.846-4 3.76V4.302c-2.496.406-4.394 2.485-4.394 4.995s1.898 4.59 4.394 4.995V16C2.68 15.586 0 12.746 0 9.297s2.68-6.29 6.152-6.703z"
                    fill="#47474F"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                class="file__btn remove tooltip--top tooltip"
                title="Remove this file"
                data-title="Remove this file"
                @click="remove(files.indexOf(file))"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <polygon
                    fill="#47474F"
                    fill-rule="evenodd"
                    points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
                  ></polygon>
                </svg>
              </a>
            </div>
            <div :id="'id' + index" :style="'id' + index">
              <PdfViewer :fileUrl="generateURL(file)" />
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="files.length > 1">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <div class="tool__sidebar__inactive">
          <p>No file selected.</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="66"
            viewBox="0 0 150 132"
          >
            <path
              fill="#FFF"
              d="M0,0 C0,18.75 28.125,56.25 93.75,56.25 L93.75,18.75 L150,75 L93.75,131.25 L93.75,93.75 C42.0594727,93.75 0,51.6905273 0,0 Z"
              transform="rotate(-180 75 66)"
            ></path>
          </svg>
          <p>Please add a file to activate options</p>
        </div>
        <div class="option__panel option__panel--active" id="merge-options">
          <button class="option__panel__title" @click="mergePDFs">
            Merge PDF
          </button>
          <a id="link">Download</a>
          <div class="option__panel__content">
            <div class="info drag" style="display: none">
              To change the order of your PDFs, drag and drop the files as you
              want.
            </div>
            <div class="info multiple">
              Please, select more PDF files by clicking again on ’Select PDF
              files’. <br />Select multiple files by mantaining pressed ’Ctrl’
            </div>
            <div class="multiple hidden">Please, select more PDF files</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      rotation: 90, // Initial rotation angle in degrees
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },

  methods: {
    //move items
    dragStart(index, event) {
      event.dataTransfer.setData("text/plain", index);
    },
    drop_m(newIndex, event) {
      const draggedIndex = event.dataTransfer.getData("text/plain");
      const draggedItem = this.items[draggedIndex];

      this.items.splice(draggedIndex, 1);
      this.items.splice(newIndex, 0, draggedItem);
    },

    drop(e) {
      e.preventDefault();
      console.log(123);
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },

    //rotate thumbnail
    getRotationDegree(tagId) {
      const computedStyle = window.getComputedStyle(
        document.getElementById(tagId)
      );
      const transformValue = computedStyle.getPropertyValue("transform");

      // Extract rotation degree from the transform value
      const matrix = new DOMMatrixReadOnly(transformValue);
      const rotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

      document.getElementById(tagId).style.transform = `rotate(${
        rotation + 90
      }deg)`;
    },

    onPickedDropbox(data) {
      this.files = [...this.files, ...data];
    },
    //file upload
    onChange() {
      this.files = [...this.files, ...this.$refs.file.files];
    },
    makeName(name) {
      return (
        name.split(".")[0].substring(0, 3) +
        "..." +
        name.split(".")[name.split(".").length - 1]
      );
    },

    remove(i) {
      this.files.splice(i, 1);
    },

    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },

    dragleave() {
      this.isDragging = false;
    },

    generateURL(file) {
      if (file.link) {
        return file.link;
      } else if (file.type == "application/pdf") {
        let fileSrc = URL.createObjectURL(file);
        setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
        }, 1000);
        return fileSrc;
      } else {
        let fileSrc = URL.createObjectURL(file);
        setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
        }, 1000);
        return fileSrc;
      }
    },

    async handleFileChange(event) {
      // Handle file selection
      this.files = event.target.files;
    },

    async readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },
    async download(file, filename, type) {
      const link = document.getElementById("link");
      link.download = filename;
      let binaryData = [];
      binaryData.push(file);
      link.href = URL.createObjectURL(new Blob(binaryData, { type: type }));
    },

    async mergePDFs() {
      const mergedPdf = await PDFDocument.create();
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        let pdfBytes = null;
        if (file.link) {
          const response = await fetch(file.link);
          const arrayBuffer = await response.arrayBuffer();
          pdfBytes = new Uint8Array(arrayBuffer);
        } else {
          pdfBytes = await this.readFileAsync(file);
        }
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();

      this.download(
        mergedPdfFile,
        "pdf-lib_page_copying_example.pdf",
        "application/pdf"
      );
    },
  },
};
</script>

<style>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.dropzone-container {
  width: 100%;
  height: 100%;
}
.dropzone-container {
  padding: 4rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.preview-container {
  display: flex;
  margin-top: 2rem;
}
.preview-card {
  margin: 4px;
  width: 200px;
  height: 250px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: distribute;
  align-content: space-around;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0);
  background: #fdfdfd;
  border-radius: 8px;
  -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
}
.preview-img {
  width: 140px;
  height: 180px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
.file__actions {
  top: 8px;
  right: 8px;
  position: absolute;
  display: inline-flex;
  /* display: none; */
  z-index: 100;
}
.file__btn {
  padding: 3px;
  width: 24px;
  height: 24px;
  -ms-flex: 0 0 24px;
  flex: 0 0 24px;
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
  background: #ebebf4;
  margin-left: 4px;
  z-index: 1030;
  border-radius: 100%;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.downloader__btn,
.uploader__btn {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 80px;
  min-width: 330px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 24px 48px;
  font-weight: 500;
  font-size: 24px;
  background: #e5322d;
  line-height: 28px;
  vertical-align: middle;
  color: #fff !important;
  text-decoration: none;
  margin-bottom: 12px;
  -webkit-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  border: 0;
  border-radius: 12px;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  -ms-flex-order: 1;
  order: 1;
  max-width: 60vw;
}
.sidebar-active .tool__sidebar {
  -ms-flex-preferred-size: 440px;
  flex-basis: 440px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0 0 120px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.draggable-item {
  margin: 5px;
  padding: 10px;
  background-color: lightblue;
  cursor: move;
}
</style>
