<template>
  <div>
    <Processing :progress="'Editing'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_edited.pdf'"
      v-if="page_load == 'uploading'"
    />
    <div
      class="main"
      :style="
        file
          ? 'display: flex;justify-content:flex-end'
          : 'display: inline-block; width: 100%;'
      "
      v-if="page_load == 'default'"
    >
      <div class="shell" v-if="file" v-show="rendering_page">
        <div
          class="bar"
          :style="{
            width:
              (rendering_progress * 100) / (timePerPage * totalPageNum) + '%',
          }"
        ></div>
      </div>
      <div v-if="file" v-show="!rendering_page">
        <div id="sidebar" class="tool__sidebar">
          <PdfPreviewList :url="getURL(file)" @set_img="set_image_url" />
        </div>
      </div>
      <div class="files-list" v-if="file" v-show="!rendering_page">
        <EditPdf
          :pdfUrl="getURL(file)"
          :get_pdf="get_result"
          :currentPage="currentPageNum"
          :totalPageNum="totalPageNum"
          @upload="upload_png"
        />
      </div>
      <div
        v-show="!file"
        class="dropzone-container"
        @dragover.prevent
        @drop="handleDrop"
      >
        <div class="upload_btn_area">
          <div class="upload-buttons">
            <div class="page-title">
              {{ $t("page_titles.edit_page.title") }}
            </div>
            <div class="page-description">
              {{ $t("page_titles.edit_page.description") }}
            </div>
            <div class="drop-area">
              <div class="drop-img">
                <img src="@/assets/feature_img/edit_pdf.svg" alt="" />
              </div>
              <div class="upload_btn">
                <label
                  for="fileInput"
                  class="uploader__btn md-raised md-danger"
                >
                  {{ $t("page_titles.edit_page.selectBtn") }}
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
                <div
                  class="add-more"
                  v-bind:style="'position: absolute; margin: auto; right: -50px; top: -5px;'"
                >
                  <md-button
                    v-show="file"
                    class="md-icon-button"
                    @click="open_add_local"
                  >
                    <md-icon>computer</md-icon>
                    <md-tooltip md-direction="bottom">{{
                      $t("toolTip.upload_local")
                    }}</md-tooltip>
                  </md-button>
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
                    style="'display: block; margin-top: 5px;'"
                    @picked="onPickedDropbox"
                  />
                </div>
              </div>
              <div>{{ $t("page_titles.edit_page.dropFiles") }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="file" id="sidebar">
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
            <button class="option__panel__title" @click="get_edit_result">
              {{ $t("page_titles.edit_page.actionBtn") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import CryptoJS from "crypto-js";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import PdfPreviewList from "./components/PdfPreviewList.vue";
import EditPdf from "./components/EditPdf.vue";
import addImagesToPDF from "../services/add_img_to_pdf";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import getPageNumber from "@/pdf_pages/services/getPageNumber";

export default {
  components: {
    VueDropboxPicker,
    PdfPreviewList,
    GDriveSelector,
    EditPdf,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      currentPageNum: 0,
      totalPageNum: 0,
      get_result: false,
      page_load: "default",
      rendering_page: true,
      progress: 0,
      size: 0,
      rendering_progress: 0,
      timePerPage: 152,
    };
  },
  watch: {
    totalPageNum(newValue) {
      console.log("End convert");
      this.count_render_page_time();
    },
  },

  methods: {
    count_render_page_time() {
      console.log(this.totalPageNum);
      let intervalId = setInterval(() => {
        this.rendering_progress = this.rendering_progress + 1;

        if (this.rendering_progress >= this.timePerPage * this.totalPageNum) {
          clearInterval(intervalId);
          this.rendering_page = false;
        }
      }, 1);
    },
    set_image_url(data) {
      this.currentPageNum = data.pageNum;
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
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task",
          "warning"
        );
        return;
      } else {
        this.handleFiles(files[0]);
      }
    },
    //download from dropbox
    async onPickedDropbox(data) {
      this.file = data[0];
      this.totalPageNum = await getPageNumber(data[0]);
    },
    async onPickedGoogleDriver(data) {
      this.file = data[0];
      this.totalPageNum = await getPageNumber(data[0]);
    },

    async onChange() {
      const data = this.$refs.file.files;
      this.file = data[0];
      this.totalPageNum = await getPageNumber(data[0]);
      console.log("start convert");
    },

    getURL(file) {
      const fileSrc = generateURL(file);
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
    get_edit_result() {
      this.get_result = true;
    },

    async upload_png(data) {
      this.page_load = "processing";
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("files", data[i]);
      }

      this.$axios.post("/pdf/png_upload", formData).then(async (res) => {
        const pdf = await addImagesToPDF(this.getURL(this.file), res.data);
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
      this.page_load = "uploading";
      this.$axios
        .post("/pdf/edited_pdf_upload", formData, {
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
            button_title: "Successfully Edited",
            dis_text: "PDF has been edited!",
            down_name: "edited_pdf.pdf",
            file_type: "application/pdf",
            before: "editpdf",
          };
          // Your secret message
          const message = JSON.stringify(obj);
          // Your secret key (should be kept private)
          const secretKey = "mySecretKey123";
          // Encrypt the message using AES encryption with the secret key
          const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
          this.$router.push({
            name:
              this.$route.params.locale == undefined
                ? "download"
                : "en_download",
            params: {
              param: encrypted,
            },
          });
        })
        .catch((e) => {
          this.page_load = "default";
          this.$swal("Server Error!", "Please check your Network.", "Warning");
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

.shell {
  height: 5px;
  width: 79%;
  border: none;
  border-radius: 13px;
  padding: 0px;
  margin: auto;
  margin-top: 10px;
  position: absolute;
  left: 0;
  top: 52px;
}

.bar {
  background: linear-gradient(to right, #ff7c03, #ff7c03);
  height: 5px;
  width: 15px;
  border-radius: 9px;
}
.md-radio {
  display: flex;
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

.page-description {
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
  padding: 0rem;
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
  min-width: 400px;
  max-width: 400px;
  height: 100vh;
  background-color: #fff;
}

.edit-title {
  margin-top: 50px;
  border-bottom: solid 1px #eee;
}

.edit-desc-title {
  text-align: left;
  font-size: 24px;
  margin-left: 30px;
  margin-top: 10px;
}

.edit-desc-detail {
  background-color: #def2ff;
  padding: 24px;
  color: #161616;
  margin: 30px;
  border-radius: 5px;
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

.files-list {
  width: 100%;
  max-width: 1300px !important;
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
