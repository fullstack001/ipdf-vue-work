<template>
  <div>
    <Processing
      :progress="page_load == 'processing' ? 'Editing' : 'Loading'"
      v-if="page_load == 'processing' || rendering_page == 'rendering'"
    />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_edited.pdf'"
      v-if="page_load == 'uploading'"
    />
    <!-- <RendingProgress
      :page="totalPageNum"
      @stop_render="rendering_page = 'default'"
      v-if="rendering_page == 'rendering'"
    /> -->
    <div
      class="main"
      :style="
        file
          ? 'display: flex;justify-content:flex-end'
          : 'display: inline-block; width: 100%;'
      "
      v-if="page_load == 'default'"
    >
      <div v-if="file" v-show="rendering_page == 'default'">
        <div id="sidebar" class="tool__sidebar">
          <PdfPreviewList :url="getURL(file)" @set_page="set_current_page" />
        </div>
      </div>
      <div class="files-list" v-if="file" v-show="rendering_page == 'default'">
        <EditPdf
          :pdfUrl="getURL(file)"
          :get_pdf="get_result"
          :currentPage="currentPageNum"
          :totalPageNum="totalPageNum"
          @upload="upload_png"
          @start_editing="page_load = 'processing'"
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
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import PdfPreviewList from "./components/PdfPreviewList.vue";
import EditPdf from "./components/EditPdf.vue";
import addImagesToPDF2 from "../services/add_img_to_pdf2";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
// import RendingProgress from "@/pages/RendingProgress.vue";
import $ from "jquery";

export default {
  components: {
    VueDropboxPicker,
    PdfPreviewList,
    GDriveSelector,
    EditPdf,
    Processing,
    Uploading,
    // RendingProgress,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      currentPageNum: 0,
      totalPageNum: 0,
      get_result: false,
      page_load: "default",
      progress: 0,
      rendering_page: null,
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
  methods: {
    count_elements() {
      this.intervalID = setInterval(() => {
        let canvases = $(".pdf-canvas");
        console.log(canvases.length);
        if (this.totalPageNum > 0 && canvases.length > 0) {
          this.clear_count_elements();
          this.rendering_page = "default";
        }
      }, 500);
    },
    clear_count_elements() {
      clearInterval(this.intervalID);
    },
    set_current_page(data) {
      this.currentPageNum = data;
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
      this.totalPageNum = await getPageNumber(data[0]);
      this.rendering_page = "rendering";
      this.file = data[0];
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
      const pdf = await addImagesToPDF2(this.getURL(this.file), data);
      await this.upload_pdf(pdf);
    },
    upload_pdf(pdf) {
      const formData = new FormData();
      formData.append("pdf", pdf);
      this.page_load = "uploading";
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
            button_title: "Successfully Edited",
            dis_text: "PDF has been edited!",
            down_name: "edited_pdf.pdf",
            file_type: "application/pdf",
            before: "editpdf",
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

<style scoped>
@import "../../assets/css/editFuture.css";
</style>
