<template>
  <div
    class="main"
    :style="
      file_objs.length
        ? 'display: flex;'
        : 'display: inline-block;  width: 100%;'
    "
  >
    <Processing :progress="'Merging'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="'pdfden_merged.pdf'"
      v-if="page_load == 'uploading'"
    />

    <SelectFileComponent
      v-if="page_load == 'default' && !file_objs.length"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.merge_page.title')"
      :description="$t('page_titles.merge_page.description')"
      :featureImgUrl="svgUrl"
    />
    <input
      type="file"
      multiple
      hidden
      name="file"
      id="fileInput"
      class="hidden-input"
      @change="onChange"
      ref="file"
      accept=".pdf"
    />
    <MergeDesription v-if="!file_objs.length && page_load == 'default'" />
    <div
      class="merge-files-list"
      style="position: relative"
      v-show="page_load == 'default' && file_objs.length"
    >
      <div class="preview-container mt-4">
        <draggable
          v-model="file_objs"
          :options="{ animation: 150 }"
          class="md-layout"
        >
          <div
            class="preview-card md-layout-item"
            v-for="(file_obj, index) in file_objs"
            :key="file_obj.file.name + index"
            @mouseover="show_file_action = file_obj.file.name + index"
            @mouseleave="show_file_action = null"
          >
            <div
              class="file__actions"
              v-show="show_file_action == file_obj.file.name + index"
            >
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
                    fill="#fff"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                class="file__btn remove tooltip--top tooltip"
                title="Remove this file"
                data-title="Remove this file"
                @click="remove(file_objs.indexOf(file_obj))"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <polygon
                    fill="#fff"
                    fill-rule="evenodd"
                    points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
                  ></polygon>
                </svg>
              </a>
            </div>
            <div :id="'id' + index" :style="'id' + index" class="preview_img">
              <PdfViewer :fileUrl="getURL(file_obj)" />
            </div>
            <div class="prew_title">
              {{
                file_obj.file.name.length > 19
                  ? file_obj.file.name.substring(0, 20) + "..."
                  : file_obj.file.name
              }}
            </div>
            <md-tooltip md-direction="top"
              >{{ (file_obj.file.size / 1024).toFixed(2) }} KB -
              {{ file_obj.page }} pages
            </md-tooltip>
          </div>
        </draggable>
      </div>
      <div
        class="add-more"
        v-show="file_objs.length"
        :class="file_objs.length > 1 ? 'fileMore' : 'fileOne'"
      >
        <a
          id="orderByName"
          data-order="asc"
          href="javascript:;"
          title="Order files by name"
          data-title="Order files by name"
          :style="file_objs.length > 1 ? 'display: flex' : 'display:none'"
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
        <div class="add-more-area">
          <div class="badge-container md-primary" md-content="4">
            <AddMoreDropDown
              :pdfCounts="this.file_objs.length"
              @open_add_local="open_add_local"
              @onPickedDropbox="onPickedDropbox"
              @onPickedGoogleDriver="onPickedGoogleDriver"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="merge__sidebar"
      style="overflow-y: auto"
      v-show="file_objs.length > 0"
      v-if="page_load == 'default'"
    >
      <h3>{{ $t("page_titles.merge_page.mergePdf") }}</h3>

      <div class="option__panel option__panel--active" id="merge-options">
        <div class="option__panel__content">
          <div class="info drag" v-show="file_objs.length == 1">
            {{ $t("page_titles.merge_page.one_des") }}
          </div>
          <div class="info multiple" v-show="file_objs.length > 1">
            {{ $t("page_titles.merge_page.more_des") }}
            <br />
            {{ $t("page_titles.merge_page.more_des_a") }}
          </div>
          <div class="multiple hidden">
            {{ $t("page_titles.merge_page.multi") }}
          </div>
        </div>
        <button
          class="Merge__btn"
          @click="mergePDFs"
          :disabled="file_objs.length == 1"
        >
          {{ $t("page_titles.merge_page.actionBtn") }}
        </button>
      </div>
    </div>
    <button
      v-show="file_objs.length > 0"
      class="Merge_responsive_btn"
      @click="mergePDFs"
      :disabled="file_objs.length == 1"
      v-if="page_load == 'default'"
    >
      {{ $t("page_titles.merge_page.actionBtn") }}
    </button>
  </div>
</template>

<script>
import { PDFDocument, degrees } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import MergeDesription from "./components/MergeDesription.vue";
import SvgImage from "@/assets/feature_img/merge_pdf.svg";

export default {
  metaInfo: {
    title: "Merge PDF - Combine PDF Files for Free",

    meta: [
      {
        name: "Keywords",
        content:
          "PDF merge, merge PDF, merge PDF online, combine PDF files, merge multiple PDFs, PDF merger, online PDF merge, merge PDF documents, merge PDF pages, PDF file merge, combine PDF pages",
      },
      {
        name: "description",
        content:
          "Merge PDF files easily with our PDF combiner. Combine multiple PDFs into a single document online. Fast, secure, and user-friendly PDF merge tool for your convenience.",
      },
      {
        property: "og:description",
        content:
          "Merge PDF files easily with our PDF combiner. Combine multiple PDFs into a single document online. Fast, secure, and user-friendly PDF merge tool for your convenience.",
      },
      {
        property: "og:title",
        content: "Merge PDF - Combine PDF Files for Free",
      },
    ],
  },
  mixins: [fileHandlingMixin],
  components: {
    PdfViewer,
    draggable,
    AddMoreDropDown,
    Processing,
    Uploading,
    SelectFileComponent,
    MergeDesription,
  },
  data() {
    return {
      show_file_action: null,
      isDragging: false,
      files: [],
      page_load: "default",
      progress: 0,
      size: 0,
      file_objs: [],
      sorted: false,
      svgUrl: SvgImage,
    };
  },
  mounted() {
    if (this.$route.params.file) {
      console.log(this.$route.params.file);
      this.file_objs = this.$route.params.file.map(async (file) => {
        let pageNum = await getPageNumber(files[i]);
        return { file: file, degree: 0, page: pageNum };
      });
    }
  },

  methods: {
    async handleFiles(files) {
      // Process the dropped files
      for (let i = 0; i < files.length; i++) {
        let pageNum = await getPageNumber(files[i]);
        this.file_objs.push({ file: files[i], degree: 0, page: pageNum });
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
      this.page_load = "processing";
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

        const pdf = await PDFDocument.load(pdfBytes, {
          ignoreEncryption: true,
        });
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

      //upload to server
      this.page_load = "uploading";
      const formData = new FormData();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      console.log(blob);

      formData.append("pdf", blob);

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
            button_title: "Successfully Merged",
            dis_text: "PDF has been merged!",
            down_name: "merged_pdf.pdf",
            file_type: "application/pdf",
            before: "mergepdf",
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
.merge-files-list {
  width: 80%;
  align-self: normal;
  text-align: center;
}

.preview-container {
  position: relative;
  margin-top: 2rem;
  padding-left: 40px;
}

.preview_area {
  display: flex;
}
.preview-card {
  cursor: grab;
  flex: 1 1;
  margin: 4px;
  max-width: 215px;
  min-width: 215px;
  min-height: 230px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0);
  background: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  padding-bottom: 10px;
}

.preview-card:focus,
.preview-card:active,
.preview-card:visited {
  border: dotted 2px #e76d26;
}
.preview_img {
  margin-top: 40px;
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

.merge__sidebar {
  text-align: center;
  height: 100vh;
  background-color: #fff;
  max-width: 20% !important;
  min-width: 20px !important;
}

.draggable-item {
  margin: 5px;
  padding: 10px;
  background-color: lightblue;
  cursor: move;
}
.add-more {
  width: fit-content;
  position: absolute;
  margin: auto;
  top: 40px;
}
.fileOne {
  right: 120px;
}
.fileMore {
  right: 40px;
}

.option__panel__content {
  margin: 10px;
  background: #fefefe;
  padding: 10px;
  border-radius: 5px;
  font-size: 13px;
  margin-bottom: 130px;
  text-align: left;
}

.Merge__btn {
  font-size: 22px;
  line-height: 26px;
  min-height: 48px;
  padding: 8px 12px;
  color: #fff;
  border-radius: 8px;
  border: 2px solid #ff7c03;
  background: linear-gradient(180deg, #ff7c03 0%, #ff4f03 100%);
  padding: 15px 40px;
  font-weight: 600;
  cursor: pointer;
}
.Merge_responsive_btn {
  font-size: 22px;
  line-height: 26px;
  min-height: 48px;
  padding: 8px 12px;
  color: #fff;
  border-radius: 8px;
  border: 2px solid #ff7c03;
  background: linear-gradient(180deg, #ff7c03 0%, #ff4f03 100%);
  padding: 15px 40px;
  font-weight: 600;
  cursor: pointer;
  display: none;
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

#orderByName {
  margin-top: 20px;
  background-color: #fff;
  padding: 9px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 58px;
}

.prew_title {
  word-wrap: break-word;
}
.badge-container {
  position: relative;
}
h3 {
  font-weight: 500;
  margin-bottom: 10px;
}
.badge[data-v-3a2b3612] {
  position: absolute;
  top: -10px;
  right: 30px;
  background-color: rgb(10, 10, 10);
  color: white;
  border-radius: 100%;
  padding: 0px 8px;
  font-size: 10px;
  z-index: 1000;
  border: solid 2px #ff7c03;
}
@media only screen and (max-width: 640px) {
  .select-wrapper {
    padding-right: 60px;
  }
  .merge__sidebar {
    display: none;
  }
  .merge-files-list {
    width: 100%;
    min-height: 80vh;
    margin-left: 14%;
  }
  .fileOne {
    right: 110px;
  }
  .fileMore {
    right: 25px;
  }
  .Merge_responsive_btn {
    display: block;
    position: absolute;
    top: 80vh;
    right: 10px;
  }
}
</style>
