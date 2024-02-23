<template>
  <div class="main">
    <Processing :progress="'Signing'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_signed.pdf'"
      v-if="page_load == 'uploading'"
    />
    <div v-if="file && page_load == 'default'">
      <SignComponent
        :pdfUrl="getURL(file)"
        :get_pdf="get_result"
        :currentPage="currentPageNum"
        :totalPageNum="totalPageNum"
        @upload="upload_png"
        :sign_obj="sign_obj"
        @editSign="modalValidate = true"
      />
    </div>
    <div
      class="dropzone-container"
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
                    file > 0
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
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import getPageNumber from "../services/getPageNumber";

export default {
  mixins: [fileHandlingMixin],
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

  methods: {
    set_sign_items(data) {
      this.modalValidate = false;
      this.sign_obj = data;
      this.sign_name = data.name_text;
    },

    async handleFiles(files) {
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task!",
          "warning"
        );
        return;
      } else {
        this.totalPageNum = await getPageNumber(files[0]);
        this.file = files[0];
        this.modalValidate = true;
      }
    },

    getURL(file) {
      const fileSrc = generateURL(file);
      return fileSrc;
    },

    async upload_png(data) {
      console.log(data);
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

<style scoped>
@import "../../assets/css/sign.css";
</style>
