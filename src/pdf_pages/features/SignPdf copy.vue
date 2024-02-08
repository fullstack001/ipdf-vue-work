<template>
  <div class="main row">
    <Processing
      :progress="page_load == 'processing' ? 'Signing' : 'Loading'"
      v-if="page_load == 'processing' || rendering_page == 'rendering'"
    />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_signed.pdf'"
      v-if="page_load == 'uploading'"
    />
    <div v-if="file && page_load == 'default'" class="col-md-10">
      <SignComponent
        :pdfUrl="getURL(file)"
        :get_pdf="get_result"
        :currentPage="currentPageNum"
        :totalPageNum="totalPageNum"
        @upload="upload_png"
        :sign_obj="sign_obj"
        @editSign="modalValidate = true"
        v-show="rendering_page == 'default'"
      />
    </div>
    <div
      class="dropzone-container col-md-12"
      @dragover.prevent
      @drop="handleDrop"
      v-if="!file && page_load == 'default'"
    >
      <div class="upload_btn_area">
        <div v-show="!file" class="upload-buttons">
          <div class="page-title">
            {{ $t("page_titles.sign_page.title") }}
          </div>
          <div class="page-description">
            {{ $t("page_titles.sign_page.des") }}
          </div>
          <div class="drop-area">
            <div class="drop-img" style="margin-bottom: 40px">
              <img src="@/assets/feature_img/sign_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised md-danger">
                {{ $t("page_titles.sign_page.selectBtn") }}
              </label>
              <input
                type="file"
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
            <div>{{ $t("page_titles.sign_page.dropFiles") }}</div>
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
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import SignatureModal from "@/pdf_pages/features/components/SignatureModal.vue";
import SignComponent from "./components/SignComponent.vue";
import addImagesToPDF1 from "../services/add_img_to_pdf1";
import Processing from "./components/Processing.vue";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import Uploading from "./components/Uploading.vue";
import $ from "jquery";

export default {
  components: {
    SignComponent,
    VueDropboxPicker,
    GDriveSelector,
    SignatureModal,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      file: null,
      second: false,
      modalValidate: false,
      currentPageImage: null,
      currentPageNum: 0,
      totalPageNum: 0,
      get_result: false,
      sign_obj: null,
      sign_name: null,
      page_load: "default",
      rendering_page: null,
      progress: 0,
      size: 0,
      intervalID: null,
    };
  },
  created() {
    this.count_elements();
  },
  destroyed() {
    this.clear_count_elements();
  },
  // watch: {
  //   file(newValue) {
  //     if (newValue) {
  //       this.modalValidate = true;
  //     }
  //   },
  // },

  methods: {
    count_elements() {
      this.intervalID = setInterval(() => {
        let canvases = $(".pdf-canvas");
        console.log(canvases.length);
        if (this.totalPageNum > 0 && canvases.length > 0) {
          this.clear_count_elements();
          this.rendering_page = "default";
          this.modalValidate = true;
        }
      }, 500);
    },
    clear_count_elements() {
      clearInterval(this.intervalID);
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
      let files = event.dataTransfer.files;
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
    async handleFiles(file) {
      // Process the dropped files
      this.totalPageNum = await getPageNumber(file);
      this.rendering_page = "rendering";
      this.file = file;
    },

    //download from dropbox
    onPickedDropbox(data) {
      this.files = data[0];
    },
    onPickedGoogleDriver(data) {
      this.files = data[0];
    },

    onChange() {
      const data = this.$refs.file.files[0];
      this.handleFiles(data);
      // this.files = [...this.files, ...data];
    },

    getURL(file) {
      const fileSrc = generateURL(file);
      return fileSrc;
    },

    async upload_png(data) {
      this.page_load = "processing";
      let added = data[0];
      let matched = data[1];
      const pdf = await addImagesToPDF1(this.getURL(this.file), added, matched);
      await this.upload_pdf(pdf);

      this.get_result = false;
    },
    upload_pdf(pdf) {
      const formData = new FormData();
      formData.append("pdf", pdf);
      this.page_load = "uploading";
      // formData.append("deletes", deletes);
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
            button_title: "Successfully Signed",
            dis_text: "PDF has been Signed!",
            down_name: "signed_pdf.pdf",
            file_type: "application/pdf",
            before: "signpdf",
          };

          const encrypted = this.$encrypt(obj);
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

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
  background-color: #eee !important;
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
  background-color: #eee !important;
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
  padding: 1rem;
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
