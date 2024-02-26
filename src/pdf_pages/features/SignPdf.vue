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
    <SelectFileComponent
      v-if="!file && page_load == 'default'"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.sign_page.title')"
      :description="$t('page_titles.sign_page.description')"
      :featureImgUrl="svgUrl"
    />

    <SignatureModal
      v-if="modalValidate"
      :nameProps="sign_name"
      @close="set_sign_items"
    />
  </div>
</template>

<script>
import generateURL from "@/pdf_pages/services/generateURL";
import SignatureModal from "@/pdf_pages/features/components/SignatureModal.vue";
import SignComponent from "./components/SignComponent.vue";
import addImagesToPDF1 from "../services/add_img_to_pdf1";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import getPageNumber from "../services/getPageNumber";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/sign_pdf.svg";
export default {
  metaInfo: {
    title:
      "Sign PDF – Securely Sign PDF Files for Free | Electronic Signature Tool",
    meta: [
      {
        name: "Keywords",
        content:
          "Sign PDF, digital signature, sign PDF online, electronic signature, PDF signing tool, e-signature, online signature, sign PDF documents, secure PDF ",
      },
      {
        name: "description",
        content:
          "Sign PDF documents securely our electronic signature tool. This tool ensures a seamless and reliable way to sign your PDFs electronically.",
      },
      {
        property: "og:description",
        content:
          "Sign PDF documents securely our electronic signature tool. This tool ensures a seamless and reliable way to sign your PDFs electronically.",
      },
      {
        property: "og:title",
        content:
          "Sign PDF – Securely Sign PDF Files for Free | Electronic Signature Tool",
      },
    ],
  },
  mixins: [fileHandlingMixin],
  components: {
    SignComponent,
    SignatureModal,
    SelectFileComponent,
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
      svgUrl: SvgImage,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      if (window.innerWidth <= 640) {
        this.$swal(
          "Warning!",
          "This feature is not available in this region.  Please use a device with a resolution of 920px or higher.",
          "warning"
        );
        this.$nextTick().then(() => {
          // Now, the DOM has been updated, and you can safely execute the next statement
          this.$router.push("/");
        });
      }
    },
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
.main {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #eee !important;
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
}
</style>
