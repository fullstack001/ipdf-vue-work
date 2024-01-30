<template>
  <div
    class="main"
    :style="file ? 'display: flex;' : 'display: inline-block;  width: 100%;'"
  >
    <Processing :progress="'Splitting'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="file_name"
      v-if="page_load == 'uploading'"
    />
    <div
      class="dropzone-container"
      @dragover.prevent
      @drop="handleDrop"
      :style="pages.length ? 'width: 113%' : 'width: 100%'"
      ref="dropzone"
      v-if="page_load == 'default'"
    >
      <div class="upload_btn_area">
        <div v-show="!pages.length" class="upload-buttons">
          <div class="page-title">{{ $t("page_titles.split_page.title") }}</div>
          <div class="page-description">
            {{ $t("page_titles.split_page.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/split_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised md-danger">
                {{ $t("page_titles.split_page.selectBtn") }}
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
              <div class="add-more">
                <GDriveSelector
                  @picked="onPickedGoogleDriver"
                  :buttonStyle="'download'"
                  style="margin-left: -5px; margin-top: 5px"
                />

                <VueDropboxPicker
                  class="cloud dropbox"
                  link-type="direct"
                  :multiselect="false"
                  :extensions="['.pdf', '.doc']"
                  :folderselect="false"
                  @picked="onPickedDropbox"
                />
              </div>
            </div>
            <div>{{ $t("page_titles.split_page.dropFiles") }}</div>
          </div>
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
              <div v-show="extractEdit && showFlag(page.id)">
                <div class="md-badge">
                  <i class="fa-solid fa-check"></i>
                </div>
              </div>
              <div v-show="!extractEdit">
                <p>{{ $t("page_titles.split_page.range") }} {{ page.id }}</p>
              </div>
              <div class="split_card" v-if="page.range[0] == page.range[1]">
                <div
                  class="split_card_body"
                  @click="click_extract_pages(page.range[0])"
                >
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[0] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[1] }}</div>
                </div>
              </div>
              <div class="split_card" v-else>
                <div class="split_card_body">
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[0] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[0] }}</div>
                </div>
                <div class="split_card_body">
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[1] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[1] }}</div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div
      v-show="pages.length"
      style="width: 30%"
      class="sidebar-area"
      v-if="page_load == 'default'"
    >
      <div
        id="sidebar"
        class="tool__sidebar"
        style="overflow-y: auto"
        ref="sidebar"
        :style="myStyleObject"
      >
        <h3>{{ $t("page_titles.split_page.split") }}</h3>
        <div class="tab-area">
          <md-tabs md-alignment="centered">
            <md-tab
              id="tab-home"
              md-icon="picture_as_pdf"
              md-label="Split by range"
              :exact="true"
              @click="rangeSplit"
              v-bind:class="extractEdit ? 'active_tab' : ''"
              :md-template-data="{ badge: 1 }"
              md-active-tab
            >
              <SpiltRange
                :rangeArray="pages"
                :maxNumber="pageCount"
                @set_check="set_checkBox"
                @rangeChange="changeRange"
              />
            </md-tab>
            <md-tab
              id="Extract pages"
              md-icon="account_tree"
              md-label="Extract Pages"
              @click="extractSplit"
              :set_disAll="pdf_click"
              v-bind:class="extractEdit ? '' : 'active_tab'"
            >
              <SplitExtra
                @set_check="set_checkBox"
                :set_disAll="pdf_click"
                :maxNum="pageCount"
                :extractpage="extractPages"
                @extractChange="setExtract"
              />
            </md-tab>
          </md-tabs>
        </div>

        <div class="option__panel option__panel--active" id="merge-options">
          <div v-if="show_checkBox">
            <md-checkbox v-model="merge_selected" value="true">
              {{ $t("page_titles.split_page.allRange") }}
            </md-checkbox>
          </div>
          <button class="option__panel__title" @click="splitPDF">
            {{ $t("page_titles.split_page.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PDFDocument } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import CryptoJS from "crypto-js";
import SplitExtra from "@/components/SplitExtra.vue";
import SpiltRange from "@/components/SpiltRange.vue";
import JSZip from "jszip";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import GDriveSelector from "@/components/GDriveSelector.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    SplitExtra,
    SpiltRange,
    GDriveSelector,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      pageCount: 0,
      pages: [],
      extractEdit: false,
      extractPages: [],
      pdf_click: false,
      merge_selected: false,
      show_checkBox: true,
      myStyleObject: {},
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
    };
  },
  mounted() {
    if (this.$route.params.file) {
      console.log(this.$route.params.file);
      this.file = this.$route.params.file[0];
      // Load the PDF document from the buffer
      getDocument(this.file.link).promise.then(
        (pdf) => {
          let numPages = pdf.numPages;
          this.pageCount = numPages;
          this.pages = [{ id: 1, range: [1, numPages] }];
          for (let i = 1; i <= numPages; i++) {
            this.extractPages.push([i, i]);
          }
        },
        (reason) => {
          console.error(reason);
        }
      );
    }
  },

  methods: {
    set_checkBox(flag) {
      this.show_checkBox = flag;
      this.merge_selected = false;
    },
    //add merged pdf to vuex

    //file from local
    onChange() {
      this.file = this.$refs.file.files[0];
      this.get_pages(this.$refs.file.files[0]);
    },
    onPickedGoogleDriver(data) {
      this.file = data[0];
      this.get_pages(data[0]);
    },

    handleDrop(event) {
      event.preventDefault();
      let files = event.dataTransfer.files;
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task",
          "warning"
        );
        return;
      } else {
        this.get_pages(files[0]);
        this.file = files[0];
      }
    },

    //download from dropbox
    onPickedDropbox(data) {
      this.file = data[0];
      this.get_pages(data[0]);
    },
    changeRange(data) {
      this.pages = data;
    },
    open_add_driver() {
      console.log("google driver");
    },
    get_pages(file) {
      console.log(file);
      let url = "";
      if (file.link) {
        url = file.link;
      } else {
        url = URL.createObjectURL(file);
      }
      getDocument(url).promise.then(
        (pdf) => {
          let numPages = pdf.numPages;
          this.pageCount = numPages;
          this.pages = [{ id: 1, range: [1, numPages] }];
          for (let i = 1; i <= numPages; i++) {
            this.extractPages.push([i, i]);
          }
        },
        (reason) => {
          console.error(reason);
        }
      );
    },

    setExtract(newExtract) {
      this.extractPages = newExtract;
    },
    sidebarChange() {
      const dropzone = this.$refs.dropzone;
      const computedStyle = window.getComputedStyle(dropzone);

      // Accessing a specific CSS property
      const height = computedStyle.getPropertyValue("height");
      console.log("height:", height);
      this.myStyleObject = {
        height: height,
      };
    },
    click_extract_pages(page) {
      let temp = [];
      if (this.extractEdit) {
        if (!this.extractPages.length) {
          this.extractPages.push([page, page]);
          console.log(this.extractPages);
        } else {
          for (let i = 0; i < this.extractPages.length; i++) {
            let item = this.extractPages[i];
            for (let j = item[0]; j <= item[1]; j++) {
              if (temp.indexOf(j) < 0) {
                temp.push(j);
              }
            }
          }

          if (temp.indexOf(page) >= 0) {
            temp.splice(temp.indexOf(page), 1);
          } else {
            temp.push(page);
          }
          temp = [...temp].sort((a, b) => a - b);
          this.extractPages = this.groupConsecutiveNumbers(temp);
          console.log(this.extractPages);
        }
      }
    },
    groupConsecutiveNumbers(arr) {
      const result = [];
      let start = arr[0];
      let end = arr[0];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === 1) {
          end = arr[i];
        } else {
          result.push([start, end]);
          start = arr[i];
          end = arr[i];
        }
      }

      // Push the last range after loop completion
      result.push([start, end]);

      return result;
    },

    //extract split
    extractSplit() {
      this.extractEdit = true;

      this.pages = [];
      for (let i = 1; i <= this.pageCount; i++) {
        this.pages.push({ id: i, range: [i, i] });
      }
      // this.sidebarChange();
    },
    //split as range
    rangeSplit() {
      if (this.extractEdit == true) {
        this.pages = [{ id: 1, range: [1, this.pageCount] }];
        this.extractPages = [];
      }
      this.extractEdit = false;
      // this.sidebarChange();
    },
    showFlag(page) {
      if (!this.extractPages.length) {
        return false;
      } else {
        let budgePages = [];
        for (let i = 0; i < this.extractPages.length; i++) {
          let item = this.extractPages[i];
          for (let j = item[0]; j <= item[1]; j++) {
            if (budgePages.indexOf(j) < 0) {
              budgePages.push(j);
            }
          }
        }
        if (budgePages.indexOf(page) < 0) {
          return false;
        } else {
          return true;
        }
      }
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

    splitPDF() {
      this.page_load = "processing";
      let planPages = [];
      if (this.extractEdit) {
        planPages = this.extractPages;
      } else {
        planPages = this.pages.map((page) => {
          return [page.range[0] * 1, page.range[1] * 1];
        });
      }
      //split PDF
      this.splitingPDF(planPages);
    },

    async splitingPDF(planPages) {
      let splited_temp = [];
      if (this.merge_selected || planPages.length == 1) {
        const mergedPdf = await PDFDocument.create();
        const file = this.file;
        let pdfBytes = null;
        if (file.link) {
          //dropdown file
          const response = await fetch(file.link);
          const arrayBuffer = await response.arrayBuffer();
          pdfBytes = new Uint8Array(arrayBuffer);
        } else {
          //local upload
          pdfBytes = await this.readFileAsync(file);
        }

        const pdf = await PDFDocument.load(pdfBytes, {
          ignoreEncryption: true,
        });
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        planPages.forEach((planpage) => {
          if (planpage[0] == planpage[1]) {
            mergedPdf.addPage(copiedPages[planpage[0] - 1]);
          } else {
            let number = [];
            for (let i = planpage[0]; i <= planpage[1]; i++) {
              number.push(i);
            }
            number.forEach((page) => {
              mergedPdf.addPage(copiedPages[page - 1]);
            });
          }
        });
        let temp = await mergedPdf.save();
        splited_temp.push(temp);
      } else {
        splited_temp = planPages.map(async (planPage) => {
          const mergedPdf = await PDFDocument.create();
          const file = this.file;
          let pdfBytes = null;

          if (file.link) {
            //dropdown file
            const response = await fetch(file.link);
            const arrayBuffer = await response.arrayBuffer();
            pdfBytes = new Uint8Array(arrayBuffer);
          } else {
            //local upload
            pdfBytes = await this.readFileAsync(file);
          }

          const pdf = await PDFDocument.load(pdfBytes, {
            ignoreEncryption: true,
          });
          const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );

          if (planPage[0] == planPage[1]) {
            mergedPdf.addPage(copiedPages[planPage[0] - 1]);
          } else {
            for (let i = planPage[0] - 1; i < planPage[1]; i++) {
              mergedPdf.addPage(copiedPages[i]);
            }
          }
          return mergedPdf.save();
        });
      }
      if (splited_temp.length == 1) {
        this.uploadPdf(splited_temp);
      } else {
        this.generateZip(splited_temp);
      }
    },

    uploadPdf(pdfFile) {
      this.page_load = "uploading";
      this.file_name = "splited_pdf.pdf";
      const formData = new FormData();
      const blob = new Blob(pdfFile, { type: "application/pdf" });

      formData.append("pdf", blob);

      this.$axios
        .post("/pdf/pdf_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.progress = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.size = progressEvent.total;
          }.bind(this),
        })
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: this.$t("page_titles.split_page.down_btn_title"),
            dis_text: "PDF has been Splited!",
            down_name: "splited_pdf.pdf",
            file_type: "application/pdf",
            before: "splitpdf",
          };
          // Your secret message
          const message = JSON.stringify(obj);

          // Your secret key (should be kept private)
          const secretKey = "mySecretKey123";

          // Encrypt the message using AES encryption with the secret key
          const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
          this.$router.push({
            name: "download",
            params: {
              param: encrypted,
            },
          });
        })
        .catch((e) => {
          this.page_load = "default";
        });
    },

    //create Zip file for download
    async generateZip(pdfFiles) {
      const zip = new JSZip();

      const promises = pdfFiles.map(async (data, i) => {
        // Add the PDF file to the ZIP
        zip.file(`splited_pdf${i}.pdf`, data);
      });

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          //save on vuex

          //upload zip file to server
          const formData = new FormData();
          const blob = new Blob([content], { type: "application/zip" });
          this.page_load = "uploading";
          this.file_name = "pdfden_splited.zip";

          formData.append("file", blob);

          this.$axios
            .post("/pdf/zip_upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.progress = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
                this.size = progressEvent.total;
              }.bind(this),
            })
            .then((response) => {
              const obj = {
                id: response.data,
                button_title: this.$t("page_titles.split_page.down_btn_title"),
                dis_text: "PDF has been split!",
                down_name: "splited_pdf.zip",
                file_type: "application/zip",
                before: "splitpdf",
              };
              // Your secret message
              const message = JSON.stringify(obj);

              // Your secret key (should be kept private)
              const secretKey = "mySecretKey123";

              // Encrypt the message using AES encryption with the secret key
              const encrypted = CryptoJS.AES.encrypt(
                message,
                secretKey
              ).toString();

              this.$router.push({
                name: "download",
                params: {
                  param: encrypted,
                },
              });
            })
            .catch((e) => {
              this.page_load = "default";
            });
        });
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.main {
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
.md-badge {
  position: absolute;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 9px;
  top: 5px;
  font-size: 18px;
  font-style: revert;
  font-weight: bold;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
  z-index: 6;
  background: green !important;
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
  min-height: 100vh;
  max-height: 100vh;
  padding: 1rem;
  overflow-y: scroll;
}

.drop-area {
  border-radius: 8px;
  border: 1px dotted #ff7c03;
  width: 50%;
  margin: auto;
  padding: 50px 0;
  margin-top: 20px;
  background-color: #fffbf8;
}

.drop-img {
  width: 96px;
  margin: auto;
  margin-bottom: 30px;
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
  background: #ff7c03;
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
  cursor: pointer;
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
  background: #ff7c03;
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
  cursor: pointer;
}

#sidebar {
  max-width: 400px !important;
  min-height: 100vh;
  max-height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 60px;
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
  cursor: pointer;
}

.upload_btn .md-button-content {
  font-size: 22px;
  font-weight: 600;
  padding: 0 30px;
}

.add-more {
  width: fit-content;
  position: absolute;
  margin: auto;
  right: -60px;
  top: -10px;
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
  background-color: #ff7c03;
  padding: 15px 40px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.option__panel__title:hover {
  background-color: #e76d26;
}

#pickfiles {
  display: block;
  background-color: #ff7c03;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.add-more .md-icon-button {
  display: block;
  background-color: #ff7c03 !important;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  color: #fff;
}
.social_btn {
  display: block;
  background-color: #ff7c03 !important;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  color: #fff;
  margin-right: 10px;
}

.add-more .md-icon-button:hover,
.social_btn:hover {
  background-color: #dd6825 !important;
}

.range__container {
  margin: 12px;
  padding: 12px;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  display: -ms-flexbox;
  display: block;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px dashed #707078;
}

.split_card {
  display: inline-flex;
}

.page_number {
  display: block;
  margin-top: 10px;
}

.split_card_body {
  margin-left: 5px;
  margin-right: 5px;
}

h3 {
  font-weight: 500;
  margin-bottom: 50px;
}

.social_btn i {
  color: #fff !important;
}

.md-button-content,
.md-button-content i {
  color: #fff !important;
}

.badge {
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff7c03;
  border-radius: 100%;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-family: "Roboto Mono", monospace;
}

#merge-options {
  padding-bottom: 30px;
}

@media (max-width: 640px) {
  .drop-area {
    width: 100%;
  }

  .uploader__btn {
    min-width: auto;
  }
}
</style>
