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
      <input
        hidden
        type="file"
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf"
      />
      <SelectFileComponent
        v-if="!file && page_load == 'default'"
        @open_add_local="open_add_local"
        @onPickedDropbox="onPickedDropbox"
        @onPickedGoogleDriver="onPickedGoogleDriver"
        @handleFile="handleFiles"
        :title="$t('page_titles.edit_page.title')"
        :description="$t('page_titles.edit_page.description')"
        :featureImgUrl="svgUrl"
      />
    </div>
    <EditPdfContent
      :pdfUrl="getURL(file)"
      :pageNumProps="pdfPage"
      @upload="upload_png"
      @edit_start="page_load = 'processing'"
      v-if="file"
      v-show="page_load == 'default'"
    />
  </div>
</template>

<script>
import generateURL from "@/pdf_pages/services/generateURL";
import EditPdfContent from "./components/EditPdfContent.vue";
import addImagesToPDF2 from "../services/add_img_to_pdf2";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import getPageNumber from "../services/getPageNumber";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/edit_pdf.svg";
export default {
  metaInfo: {
    title:
      "Edit PDF – Easily Edit your PDF Files for Free | Online PDF Editor & Form Filler",

    meta: [
      {
        name: "Keywords",
        content:
          "Edit PDF, online PDF editor, PDF editing tool, modify PDF, edit text in PDF, add images to PDF, PDF document editor, pdf form filler, pdf filler",
      },
      {
        name: "description",
        content:
          "Edit PDF documents easily with our PDF editor. This online PDF editing tool provides a user-friendly and intuitive platform to make changes to your PDF files.",
      },
      {
        property: "og:description",
        content:
          "Edit PDF documents easily with our PDF editor. This online PDF editing tool provides a user-friendly and intuitive platform to make changes to your PDF files.",
      },
      {
        property: "og:title",
        content:
          "Edit PDF – Easily Edit your PDF Files for Free | Online PDF Editor & Form Filler",
      },
    ],
  },

  mixins: [fileHandlingMixin],
  components: {
    EditPdfContent,
    Processing,
    SelectFileComponent,
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
      svgUrl: SvgImage,
      progress: 0,
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
.md-radio {
  display: flex;
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

.option__panel__content {
  margin: 10px;
  background: #def2ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 13px;
}

.edit-btn {
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
  margin-left: 100px;
  margin-top: 100px;
}

h3 {
  font-weight: 500;
}

@media (max-width: 640px) {
  .drop-area {
    width: 100%;
  }

  .uploader__btn {
    min-width: auto;
  }

  .page-title {
    font-size: 26px !important;
  }
}
</style>
