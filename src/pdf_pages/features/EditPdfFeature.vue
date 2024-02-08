<template>
  <div>
    <Processing
      :progress="page_load == 'Editing'"
      v-if="page_load == 'processing'"
    />
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
    </div>
    <EditPdfContent
      :pdfUrl="getURL(file)"
      :pageNumProps="pdfPage"
      @upload="upload_png"
      @edit_start="page_load = 'processing'"
      v-if="file"
    />
  </div>
</template>

<script>
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import EditPdfContent from "./components/EditPdfContent.vue";
import addImagesToPDF2 from "../services/add_img_to_pdf2";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/fileHandlingMixin.js";
import getPageNumber from "../services/getPageNumber";

export default {
  mixins: [fileHandlingMixin],
  components: {
    VueDropboxPicker,
    GDriveSelector,
    EditPdfContent,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      get_result: false,
      page_load: "default",
      pdfPage: null,
      size: 0,
      progress: 0,
    };
  },
  methods: {
    async handleFiles(files) {
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task.",
          "warning"
        );
        return;
      } else {
        this.pdfPage = await getPageNumber(files[0]);
        this.file = files[0];
      }
    },

    getURL(file) {
      const fileSrc = generateURL(file);
      return fileSrc;
    },
    get_edit_result() {
      this.get_result = true;
    },

    async upload_png(data) {
      console.log(data);
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
