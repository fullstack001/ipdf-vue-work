<template>
  <div class="main">
    <div>{{ result }}</div>
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
      <div v-show="files.length <= 0" class="upload-buttons">
        <div class="page-title">Merge PDF files</div>
        <div class="page-description">
          Combine PDFs in the order you want with the easiest PDF merge
          available.
        </div>
        <div class="upload_btn">
          <label for="fileInput" class="uploader__btn md-raised md-danger">
            Select PDF files
          </label>
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
          <VueDropboxPicker
            class="cloud dropbox"
            :api-key="'fvpl8xhvbq877as'"
            link-type="direct"
            :multiselect="true"
            :extensions="['.pdf', '.doc']"
            :folderselect="false"
            @picked="onPickedDropbox"
          >
            <a class="dropbox-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  fill="#FFF"
                  d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
                ></path>
              </svg>
            </a>
          </VueDropboxPicker>
        </div>
      </div>
      <div class="files-list">
        <div class="preview-container mt-4" v-if="files.length">
          <div class="md-layout">
            <draggable v-model="files" :options="{ animation: 150 }">
              <div
                class="preview-card"
                v-for="(file, index) in files"
                :key="file.name"
              >
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
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <div v-show="files.length > 0">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <div class="tool__sidebar__inactive">
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
          <button class="option__panel__title" @click="mergePDFs">
            Merge PDF
          </button>
          <div>
            <a id="link">Download</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument } from "pdf-lib";
import { mapState, mapGetters, mapMutations } from "vuex";

import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import store from "@/store/index";
import * as type from "@/store/types";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
  },
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },

  computed: {
    result() {
      return store.state.result;
    },
    // ...mapState({
    //   count: "count", // Maps 'count' from the store to local computed property 'count'
    // }),
  },

  methods: {
    //add merged pdf to vuex
    setPdfResult(result) {
      console.log(result);
      store.dispatch({
        type: type.SetResult,
        amount: result,
      });
    },

    //click upload button
    openFilePicker() {
      // Trigger the file input click event when the custom button is clicked
      this.$refs.file.click();
    },

    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    handleFiles(files) {
      // Process the dropped files
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i]);
        console.log(this.files);
      }
    },

    remove(i) {
      this.files.splice(i, 1);
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

    //download from dropbox
    onPickedDropbox(data) {
      this.files = [...this.files, ...data];
      console.log(data);
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
    //mergePDFs
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

      this.setPdfResult(mergedPdfFile);
      this.files = [];
      this.$router.push("/download");
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

.page-title {
  margin-top: 50px;
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
}

.page-description {
  max-width: 800px;
  margin: 8px auto 0;
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  color: #47474f;
}

.dropzone-container {
  width: 100%;
  height: 100vh;
}
.dropzone-container {
  padding: 4rem;
  /* background: #f7fafc;
  border: 1px solid #e2e8f0; */
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
  cursor: grab;
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

.tool__sidebar {
  height: 100vh;
  background-color: #fff;
}

.draggable-item {
  margin: 5px;
  padding: 10px;
  background-color: lightblue;
  cursor: move;
}

.upload-buttons {
  position: relative;
}

.upload_btn {
  width: fit-content;
  display: flex;
  text-align: center;
  margin: auto;
  position: relative;
}

.upload_btn .md-button-content {
  font-size: 22px;
  font-weight: 600;
  padding: 0 30px;
}

.dropbox {
  width: fit-content;
  position: absolute;
  top: 30px;
  right: -50px;
}

.dropbox-icon {
  background-color: rgb(229, 50, 45);
  opacity: 1;
  border-radius: 50%;
  padding: 10px 5px 0px 5px;
  cursor: pointer;
}

.option__panel__content {
  margin: 10px;
  background: #def2ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 13px;
}

.option__panel__title {
  font-size: 22px;
  line-height: 26px;
  min-height: 48px;
  padding: 8px 12px;
  color: #fff;
  background-color: #e5322d;
  padding: 15px 40px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.option__panel__title:hover {
  background-color: #e75651;
}
</style>
