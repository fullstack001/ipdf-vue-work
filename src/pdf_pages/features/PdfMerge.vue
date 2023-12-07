<template>
  <div class="main">
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
      <div class="upload_btn_area">
        <div v-show="!file_objs.length" class="upload-buttons">
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
          </div>
        </div>
        <div
          class="add-more"
          v-bind:style="
            file_objs.length
              ? 'position: absolute; top: 50px; right: -30px'
              : 'position: relative; margin: auto; right: 0; top: 0;'
          "
        >
          <div class="md-primary" md-content="4" v-if="file_objs.length">
            <button class="md-icon-button" @click="open_add_local">
              <md-icon>computer</md-icon>
            </button>
          </div>
          <GDriveSelector
            v-bind:style="
              file_objs.length ? 'display: block;' : 'display: inline-block;'
            "
            @picked="onPickedGoogleDriver"
          />

          <VueDropboxPicker
            class="cloud dropbox"
            :api-key="'w7vvdh8a5g5av1p'"
            link-type="direct"
            :buttonType="'chooser'"
            :multiselect="true"
            :extensions="['.pdf', '.doc']"
            :folderselect="false"
            v-bind:style="
              file_objs.length ? 'margin-top: 5px;' : 'display: inline-block;'
            "
            @picked="onPickedDropbox"
          />
          <a
            id="orderByName"
            data-order="asc"
            href="javascript:;"
            title="Order files by name"
            data-title="Order files by name"
            style="display: flex"
            v-if="file_objs.length > 1"
            @click="sort_pdf"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              fill="#383E45"
              fill-rule="evenodd"
              v-show="sorted"
            >
              <path
                d="M2.947 15.297V.23c0-.067.026-.123.077-.166S3.14 0 3.22 0h1.635c.08 0 .145.022.196.065s.077.1.077.166v15.066h2.5a.39.39 0 0 1 .261.087.28.28 0 0 1 .102.222c0 .077-.038.154-.114.23l-3.62 3.076a.42.42 0 0 1-.261.087c-.09 0-.178-.03-.26-.087L.11 15.828c-.113-.103-.14-.215-.08-.338.06-.13.174-.193.34-.193h2.575z"
                fill-rule="nonzero"
              ></path>
              <path
                d="M11.222 20.2l2.94-7.52c.194-.496.555-.67 1.1-.67h.54c.513 0 .97.12 1.22.804l2.746 7.386c.083.214.222.603.222.845 0 .536-.485.965-1.068.965-.5 0-.86-.174-1.026-.603l-.582-1.6h-3.66l-.596 1.6c-.153.43-.47.603-1.012.603-.624 0-1.054-.375-1.054-.965 0-.24.14-.63.222-.845zm5.602-1.93l-1.3-3.874h-.028L14.15 18.27h2.663zM11.346 8l4.75-6.083h-3.66c-.602 0-1.088-.333-1.088-.958S11.832 0 12.434 0h5.53c.538 0 .973.25.973 1.042 0 .278-.102.583-.294.82l-4.826 6.222h4.096c.602 0 1.088.333 1.088.958s-.486.958-1.088.958h-5.696C11.448 10 11 9.722 11 8.875c0-.36.154-.625.346-.875z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              fill="#383E45"
              fill-rule="evenodd"
              v-show="!sorted"
            >
              <path
                d="M2.947 15.297V.23c0-.066.026-.122.077-.165S3.14 0 3.22 0h1.634c.08 0 .146.022.196.065s.077.1.077.166v15.066h.33 2.18c.106 0 .193.03.26.087a.28.28 0 0 1 .102.222c0 .077-.038.154-.114.23l-3.62 3.076c-.075.058-.162.087-.26.087a.46.46 0 0 1-.261-.087L.1 15.828c-.112-.103-.14-.216-.078-.328.06-.14.174-.203.34-.203h2.575z"
                fill-rule="nonzero"
              ></path>
              <path
                d="M11.212 8.083L14.016.66c.185-.5.53-.66 1.058-.66h.516c.5 0 .926.12 1.164.794l2.62 7.3c.08.212.212.595.212.833 0 .53-.463.952-1.02.952-.476 0-.82-.172-.98-.595l-.556-1.587h-3.5l-.57 1.587c-.146.423-.45.595-.966.595C11.41 9.87 11 9.5 11 8.917c0-.238.132-.622.212-.833zm5.344-1.905l-1.23-3.823H15.3l-1.283 3.823h2.54zm-5.2 13.442l4.908-5.794h-3.783c-.622 0-1.124-.317-1.124-.913S11.86 12 12.482 12h5.715c.556 0 1.005.238 1.005.992a1.21 1.21 0 0 1-.304.78L13.9 19.7h4.233c.622 0 1.124.317 1.124.913s-.503.913-1.124.913h-5.887c-.794 0-1.257-.265-1.257-1.072 0-.344.16-.595.357-.833z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="files-list">
        <div class="preview-container mt-4" v-if="file_objs.length">
          <draggable
            v-model="file_objs"
            :options="{ animation: 150 }"
            class="md-layout"
          >
            <div
              class="preview-card md-layout-item"
              v-for="(file_obj, index) in file_objs"
              :key="file_obj.file.name"
            >
              <div class="file__actions">
                <a
                  class="file__btn rotate tooltip--top tooltip"
                  data-rotate="0"
                  title="Rotate"
                  data-title="Rotate"
                  @click="setRotationDegree(`id${index}`, index)"
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
                  @click="remove(file_objs.indexOf(file))"
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
                <PdfViewer :fileUrl="getURL(file_obj)" />
              </div>
              <span>{{ file_obj.file.name }}</span>
              <md-tooltip md-direction="top"
                >{{ (file_obj.file.size / 1024).toFixed(2) }} KByte
                {{ file_obj.page }}pages
              </md-tooltip>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div v-show="file_objs.length > 0">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, degrees } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import CryptoJS from "crypto-js";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import GDriveSelector from "@/components/GDriveSelector.vue";
import draggable from "vuedraggable";
import store from "@/store/index";
import * as type from "@/store/types";
import generateURL from "@/pdf_pages/services/generateURL";
import getPageNumber from "@/pdf_pages/services/getPageNumber";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    GDriveSelector,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      file_objs: [],
      sorted: false,
    };
  },
  mounted() {
    if (this.$route.params.file) {
      console.log(this.$route.params.file);
      this.file_objs = this.$route.params.file.map((file) => {
        return { file: file, degree: 0 };
      });
      console.log(this.file_objs);
    }
  },

  methods: {
    //add merged pdf to vuex
    setPdfResult(result) {
      store.dispatch({
        type: type.SetResult,
        amount: result,
      });
    },

    //click add from local button
    open_add_local() {
      this.$refs.file.click();
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
        this.file_objs.push({ file: files[i], degree: 0 });
      }
    },

    remove(i) {
      this.file_objs.splice(i, 1);
    },

    //rotate thumbnail
    setRotationDegree(tagId, index) {
      const computedStyle = window.getComputedStyle(
        document.getElementById(tagId)
      );
      const transformValue = computedStyle.getPropertyValue("transform");

      // Extract rotation degree from the transform value
      const matrix = new DOMMatrixReadOnly(transformValue);
      const rotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI) + 90;
      if (rotation == 360) rotation = 0;
      document.getElementById(tagId).style.transform = `rotate(${rotation}deg)`;

      //save rotation
      this.file_objs[index] = {
        file: this.file_objs[index]["file"],
        degree: rotation,
      };
    },

    //download from dropbox
    async onPickedDropbox(data) {
      for (let i = 0; i < data.length; i++) {
        let pageNum = await getPageNumber(data[i]);
        this.file_objs.push({ file: data[i], degree: 0, page: pageNum });
      }
      console.log(this.file_objs);
    },
    onPickedGoogleDriver(data) {
      const add_objs = data.map((item) => {
        return { file: item, degree: 0 };
      });
      this.file_objs = [...this.file_objs, ...add_objs];
    },
    async onChange() {
      const data = this.$refs.file.files;
      var add_objs = [],
        i = 0;
      for (i = 0; i < data.length; i++) {
        let pageNum = await getPageNumber(data[i]);
        add_objs.push({ file: data[i], degree: 0, page: pageNum });
      }
      this.file_objs = [...this.file_objs, ...add_objs];
      console.log(this.file_objs);
    },
    getURL(file_obj) {
      const fileSrc = generateURL(file_obj.file);
      return fileSrc;
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

    //sort pdf files
    sort_pdf() {
      if (!this.sorted) {
        let temp = this.file_objs;
        temp = temp.sort((a, b) => {
          const nameA = a.file.name.toLowerCase();
          const nameB = b.file.name.toLowerCase();
          console.log(nameA, nameB, nameA > nameB);

          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(temp);
      } else {
        this.file_objs.reverse();
      }
      this.sorted = !this.sorted;
    },

    //mergePDFs
    async mergePDFs() {
      this.$isLoading(true); // show loading screen
      const mergedPdf = await PDFDocument.create();
      for (let i = 0; i < this.file_objs.length; i++) {
        const file = this.file_objs[i]["file"];
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
            page.setRotation(degrees(this.file_objs[i]["degree"]));
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

      this.$axios
        .post("/pdf/pdf_upload", formData)
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: "Download Merged PDF",
            dis_text: "PDF has been merged!",
            down_name: "merged_pdf.pdf",
            file_type: "application/pdf",
            before: "pdfmerge",
          };
          // Your secret message
          const message = JSON.stringify(obj);

          // Your secret key (should be kept private)
          const secretKey = "mySecretKey123";

          // Encrypt the message using AES encryption with the secret key
          const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
          console.log(encrypted);
          this.$router.push({
            name: "download",
            params: {
              param: encrypted,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.$isLoading(false); // hide loading screen
        });
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
  max-width: 250px;
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
  cursor: pointer;
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
  cursor: pointer;
}

.upload_btn .md-button-content {
  font-size: 22px;
  font-weight: 600;
  padding: 0 30px;
}

.add-more {
  width: fit-content;
}
/* .dropbox {
  width: 40px;
} */

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
</style>
