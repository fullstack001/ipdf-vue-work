<template>
  <div class="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
      <div class="upload_btn_area">
        <div v-show="!pages.length" class="upload-buttons">
          <div class="page-title">Split PDF file</div>
          <div class="page-description">
            Separate one page or a whole set for easy conversion into
            independent PDF files.
          </div>
          <div class="upload_btn">
            <label for="fileInput" class="uploader__btn md-raised md-danger">
              Select PDF files
            </label>
            <input
              type="file"
              name="file"
              id="fileInput"
              class="hidden-input"
              @change="onChange"
              ref="file"
              accept=".pdf"
            />
          </div>
        </div>
        <div
          class="add-more"
          v-bind:style="
            pages.length
              ? 'display:none'
              : 'position: relative; margin: auto; right: 0; top: 0;'
          "
        >
          <div v-bind:style="'display: block;'">
            <md-button class="md-icon-button" @click="open_add_driver">
              <md-icon>add_to_drive</md-icon>
            </md-button>
          </div>

          <VueDropboxPicker
            class="cloud dropbox"
            :api-key="'w7vvdh8a5g5av1p'"
            link-type="direct"
            :multiselect="false"
            :extensions="['.pdf', '.doc']"
            :folderselect="false"
            @picked="onPickedDropbox"
          />
        </div>
      </div>
      <div class="files-list">
        <div class="preview-container mt-4" v-if="pages.length">
          <draggable
            v-model="pages"
            :options="{ animation: 150 }"
            class="md-layout"
          >
            <div class="range__container" v-for="page in pages" :key="page.id">
              <p>Range{{ page.id }}</p>
              <div class="split_card" v-if="page.range[0] == page.range[1]">
                <div>
                  <PdfViewer
                    :fileUrl="generateURL(file)"
                    :pageNumber="page.range[0] * 1"
                  />
                </div>
                <span>{{ page.range[1] }}</span>
              </div>
              <div class="split_card" v-else>
                <div>
                  <PdfViewer
                    :fileUrl="generateURL(file)"
                    :pageNumber="page.range[0] * 1"
                  />
                </div>
                <span>{{ page.range[0] }}</span>
                <div>
                  <PdfViewer
                    :fileUrl="generateURL(file)"
                    :pageNumber="page.range[1] * 1"
                  />
                </div>
                <span>{{ page.range[1] }}</span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div v-show="pages.length">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <h4>Split</h4>
        <div>
          <md-tabs class="md-primary" md-alignment="centered">
            <md-tab id="tab-home" md-label="Split by range" :exact="true">
              <SpiltRange
                :rangeArray="pages"
                :maxNumber="pageCount"
                @rangeChange="changeRange"
              />
            </md-tab>
            <md-tab id="Extract pages" md-label="Extract pages">
              <SplitExtra />
            </md-tab>
          </md-tabs>
        </div>

        <div class="option__panel option__panel--active" id="merge-options">
          <button class="option__panel__title" @click="mergePDFs">
            Split PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, degrees } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import SplitExtra from "@/components/SplitExtra.vue";
import SpiltRange from "@/components/SpiltRange.vue";
import store from "@/store/index";
import * as type from "@/store/types";
import axios from "axios";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    SplitExtra,
    SpiltRange,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      pageCount: 0,
      pages: [],
    };
  },

  methods: {
    //file from local
    onChange() {
      this.file = this.$refs.file.files[0];
      this.get_pages(this.$refs.file.files[0]);
      console.log(this.file);
    },

    //download from dropbox
    onPickedDropbox(data) {
      this.file = data;
      this.get_pages(data);
    },
    changeRange(data) {
      this.pages = data;
    },
    open_add_driver() {
      console.log("google driver");
    },

    get_pages(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onloadend = () => {
        const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
        this.pageCount = count;
        this.pages = [{ id: 1, range: [1, count] }];
        console.log(this.pages);
      };
    },

    handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.handleFiles(file);
      }
      console.log(this.pages);
    },
    handleFiles(file) {
      // Process the dropped files
      this.file = file;
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
      }
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

    //mergePDFs
    async mergePDFs() {
      const mergedPdf = await PDFDocument.create();
      for (let i = 0; i < this.origin_files.length; i++) {
        const file = this.origin_files[i]["file"];
        let pdfBytes = null;
        if (file.link) {
          //dropdown file
          const response = await fetch(file.link);
          const arrayBuffer = await response.arrayBuffer();
          pdfBytes = new Uint8Array(arrayBuffer);
        } else {
          pdfBytes = await this.readFileAsync(file); //local upload
        }
        //rotate pages

        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        if (this.file_objs[i]["degree"] != 0) {
          copiedPages.forEach((page) => {
            page.setRotation(degrees(this.origin_files[i]["degree"]));
            mergedPdf.addPage(page);
          });
        } else {
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
      }

      const mergedPdfFile = await mergedPdf.save();
      //save on vuex
      this.setPdfResult(mergedPdfFile);

      //upload to server

      const formData = new FormData();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });

      formData.append("pdf", blob);

      axios
        .post("http://127.0.0.1:5000/api/pdf", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push({
            name: "download",
            params: { id: response.data },
          });
        })
        .catch((e) => {
          console.log(e);
        });
      this.origin_files = [];
    },
  },
};
</script>

<style scoped>
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

.upload_btn_area {
  position: relative;
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
  position: relative;
  margin-top: 2rem;
}

.preview_area {
  display: flex;
}
.preview-card {
  cursor: grab;
  flex: 1 1;
  margin: 4px;
  max-width: 165px;
  height: 215px;
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

.add-more {
  width: fit-content;
}

.dropbox-icon {
  background-color: rgb(229, 50, 45);
  opacity: 1;
  border-radius: 50%;
  padding: 10px 10px 5px 10px;
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

#pickfiles {
  display: block;
  background-color: #e5322d;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.add-more .md-icon-button {
  display: block;
  background-color: #e5322d !important;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
}

.add-more .md-icon-button:hover {
  background-color: #e75651 !important;
}

.range__container {
  margin: 12px;
  padding: 12px;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px dashed #707078;
}
</style>
