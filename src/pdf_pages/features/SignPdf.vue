<template>
  <div
    class="main"
    :style="
      files.length ? 'display: flex' : 'display: inline-block; width: 100%;'
    "
  >
    <div v-if="files.length">
      <div id="sidebar" class="tool__sidebar">
        <PdfPreviewList :url="getURL(files[0])" @set_img="set_image_url" />
      </div>
    </div>
    <div class="files-list" v-if="files.length">
      <SignComponent
        :pdfUrl="getURL(files[0])"
        :get_pdf="get_result"
        :currentPage="currentPageNum"
        :totalPageNum="totalPageNum"
        @upload="upload_png"
      />
    </div>
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
      <div class="upload_btn_area">
        <div v-show="!files.length" class="upload-buttons">
          <div class="page-title">Sign PDF</div>
          <div class="page-description">
            Your tool to eSign documents. Sign a document yourself or send a
            signature request to others.
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/sign_pdf.svg" alt="" />
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
              <div
                class="add-more"
                v-bind:style="'position: absolute; margin: auto; right: -50px; top: -5px;'"
              >
                <GDriveSelector
                  @picked="onPickedGoogleDriver"
                  :buttonStyle="'download'"
                />

                <VueDropboxPicker
                  class="cloud dropbox"
                  link-type="direct"
                  :multiselect="true"
                  :extensions="['.pdf', '.doc']"
                  :folderselect="false"
                  v-bind:style="
                    files.length > 0
                      ? 'display: block; margin-top: 5px;'
                      : 'display: inline-block;'
                  "
                  @picked="onPickedDropbox"
                />
              </div>
            </div>
            <div>Or Drop PDFs Here</div>
          </div>
        </div>
      </div>
    </div>
    <SignatureModal v-if="modalValidate" @close="modalValidate = false" />
  </div>
</template>

<script>
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import CryptoJS from "crypto-js";
import store from "@/store/index";
import * as type from "@/store/types";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
// import AddMoreDropDown from "@/pdf_pages/features/components/AddMoreDropDown.vue";
import SignatureModal from "@/pdf_pages/features/components/SignatureModal.vue";
import PdfPreviewList from "./components/PdfPreviewList.vue";
import SignComponent from "./components/SignComponent.vue";

export default {
  components: {
    PdfPreviewList,
    SignComponent,
    VueDropboxPicker,
    GDriveSelector,
    // AddMoreDropDown,
    SignatureModal,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      second: false,
      modalValidate: false,
      currentPageImage: null,
      currentPageNum: 0,
      totalPageNum: 0,
      get_result: false,
    };
  },
  watch: {
    files(newValue, oldValue) {
      if ((oldValue.length == 0, newValue.length == 1)) {
        this.modalValidate = true;
      }
    },
  },

  methods: {
    set_image_url(data) {
      this.currentPageImage = data.url;
      this.currentPageNum = data.pageNum;
      this.totalPageNum = data.totalPageNum;
    },
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

      this.files = [...files];
    },

    //download from dropbox
    onPickedDropbox(data) {
      this.files = [...this.files, ...data];
    },
    onPickedGoogleDriver(data) {
      this.files = [...this.files, ...data];
    },

    onChange() {
      const data = this.$refs.file.files;
      this.files = [...this.files, ...data];
    },

    getURL(file) {
      const fileSrc = generateURL(file);
      return fileSrc;
    },

    upload_png() {
      console.log("asd");
    },

    //expressPDFs
    async expressPDFs() {
      if (this.radio) {
        this.$isLoading(true); // show loading screen
        let originSize = 0;
        const formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          formData.append("files", this.files[i].file);
          originSize = originSize + this.files[i].file.size;
        }
        formData.append("level", this.radio);
        this.$axios
          .post("/pdf/pdf_compress", formData)
          .then((response) => {
            let reSize = null;
            // Handle response from server
            const type = response.data.file.split(".")[1];
            if (response.data.reSize >= originSize / 1024) {
              reSize = (originSize / 1024) * 0.8;
            } else {
              reSize = response.data.reSize;
            }
            console.log(type);
            const obj = {
              id: response.data.file,
              button_title: "Download Compressed PDF",
              dis_text: "PDF has been compressed!",
              down_name: `pdfdenCompressed.${type}`,
              file_type: `application/${type}`,
              before: "compresspdf",
              originSize: (originSize / 1024).toFixed(2),
              resultSize: reSize.toFixed(2),
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
          .catch((error) => {
            console.error("Error uploading files:", error);
          })
          .finally(() => {
            this.$isLoading(false); // hide loading screen
          });
      } else {
        this.second = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.md-radio {
  display: flex;
}
</style>

<style scoped>
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

.dropbox-icon {
  background-color: #ff7c03;
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
  background-color: #ff7c03;
  padding: 15px 40px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.option__panel__title:hover {
  background-color: #ff7c03;
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
  margin-left: 5px;
}

.add-more .md-icon-button:hover {
  background-color: #ff7c03 !important;
}

h3 {
  font-weight: 500;
}

.tool__sidebar__inactive {
  min-width: 400px;
  padding: 10px;
}

.split_option {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: left;
}

.md-radio-label {
  font-weight: 500 !important;
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
