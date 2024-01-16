<template>
  <div class="main row">
    <div v-if="files.length" class="col-md-2">
      <div id="sidebar" class="tool__sidebar">
        <PdfPreviewList :url="getURL(files[0])" @set_img="set_image_url" />
      </div>
    </div>
    <div v-if="files.length" class="col-md-10">
      <SignComponent
        :pdfUrl="getURL(files[0])"
        :get_pdf="get_result"
        :currentPage="currentPageNum"
        :totalPageNum="totalPageNum"
        @upload="upload_png"
        :sign_obj="sign_obj"
        @editSign="modalValidate = true"
      />
    </div>
    <div
      class="dropzone-container col-md-12"
      @dragover.prevent
      @drop="handleDrop"
      v-if="!files.length"
    >
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
                style="display: none"
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
    <SignatureModal
      v-if="modalValidate"
      :nameProps="sign_name"
      @close="set_sign_items"
    />
  </div>
</template>

<script>
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import CryptoJS from "crypto-js";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import SignatureModal from "@/pdf_pages/features/components/SignatureModal.vue";
import PdfPreviewList from "./components/PdfPreviewList.vue";
import SignComponent from "./components/SignComponent.vue";
import addImagesToPDF from "../services/add_img_to_pdf";

export default {
  components: {
    PdfPreviewList,
    SignComponent,
    VueDropboxPicker,
    GDriveSelector,
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
      sign_obj: null,
      sign_name: null,
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
    set_sign_items(data) {
      this.modalValidate = false;
      this.sign_obj = data;
      this.sign_name = data.name_text;
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

    async upload_png(data) {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("files", data[i]);
      }

      this.$axios.post("/pdf/png_upload", formData).then(async (res) => {
        const pdf = await addImagesToPDF(this.getURL(this.files[0]), res.data);
        this.upload_pdf(pdf, res.data);
      });
      this.get_result = false;
    },
    upload_pdf(pdf, data) {
      const deletes = data.map((item) => {
        return item.filename;
      });
      const formData = new FormData();
      formData.append("files", pdf);
      formData.append("deletes", deletes);
      this.$axios
        .post("/pdf/edited_pdf_upload", formData)
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: "Download Signed PDF",
            dis_text: "PDF has been Signed!",
            down_name: "signed_pdf.pdf",
            file_type: "application/pdf",
            before: "signpdf",
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
          console.log(e);
        })
        .finally(() => {
          this.$isLoading(false); // hide loading screen
        });
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

.upload_btn_area {
  position: relative;
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
  min-width: 300px;
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
