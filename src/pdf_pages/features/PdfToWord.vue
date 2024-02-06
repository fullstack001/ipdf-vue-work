<template>
  <div
    class="main"
    :style="
      file_objs.length ? 'display: flex' : 'display: inline-block; width: 100%;'
    "
  >
    <Processing :progress="'Converting'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="file_objs.length"
      :size="size"
      :file_name="file_name"
      v-if="page_load == 'uploading'"
    />
    <div
      class="dropzone-container"
      @dragover.prevent
      @drop="handleDrop"
      v-if="page_load == 'default'"
    >
      <div class="upload_btn_area">
        <div v-show="!file_objs.length" class="upload-buttons">
          <div class="page-title">
            {{ $t("page_titles.pdf_word.title") }}
          </div>
          <div class="page-description">
            {{ $t("page_titles.pdf_word.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/pdf_word.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised md-danger">
                {{ $t("page_titles.pdf_word.selectBtn") }}
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
                <md-button
                  v-show="file_objs.length"
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
                  v-bind:style="
                    file_objs.length > 0
                      ? 'display: block; margin-top: 5px;'
                      : 'display: inline-block;'
                  "
                  @picked="onPickedDropbox"
                />
              </div>
            </div>
            <div>{{ $t("page_titles.pdf_word.dropFiles") }}</div>
          </div>
        </div>
      </div>
      <div class="files-list">
        <div class="preview-container mt-4" v-if="file_objs.length">
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
              <div :id="'id' + index" :style="'id' + index">
                <PdfViewer :fileUrl="getURL(file_obj)" />
              </div>
              <div class="prew_title">
                {{
                  file_obj.file.name.length > 19
                    ? file_obj.file.name.substring(0, 20) + "..."
                    : file_obj.file.name
                }}
                <!-- <md-tooltip md-direction="bottom"
                  >{{ file_obj.file.name }}
                </md-tooltip> -->
              </div>
            </div>
          </draggable>
          <div
            class="add-more"
            v-bind:style="
              file_objs.length
                ? 'position: absolute; top: 00px; right: 80px'
                : 'position: relative; margin: auto; right: 0; top: 0;'
            "
          >
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

    <div v-show="file_objs.length > 0" v-if="page_load == 'default'">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <h3 class="text-center">PDF to Word</h3>
        <div class="option__panel option__panel--active" id="convert-options">
          <button class="option__panel__title" @click="convertToWord">
            {{ $t("page_titles.pdf_word.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/fileHandlingMixin.js";

export default {
  mixins: [fileHandlingMixin],
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    GDriveSelector,
    AddMoreDropDown,
    Processing,
    Uploading,
  },
  data() {
    return {
      show_file_action: null,
      isDragging: false,
      files: [],
      file_objs: [],
      second: false,
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
      first_file: 0,
    };
  },

  methods: {
    //click add from local button

    handleFiles(files) {
      // Process the dropped files
      for (let i = 0; i < files.length; i++) {
        this.file_objs.push({ file: files[i], degree: 0 });
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

    makeName(name) {
      return (
        name.split(".")[0].substring(0, 3) +
        "..." +
        name.split(".")[name.split(".").length - 1]
      );
    },

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

    //convertToWord
    async convertToWord() {
      this.page_load = "uploading";
      const formData = new FormData();
      for (let i = 0; i < this.file_objs.length; i++) {
        formData.append("files", this.file_objs[i].file);
      }

      this.$axios
        .post("/pdf/pdf_to_word", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.progress = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.size = progressEvent.total;
            let sum = 0;

            for (let i = 0; i < this.file_objs.length; i++) {
              sum += this.file_objs[i].file.size;
              if (sum >= progressEvent.loaded) {
                this.first_file = i;
                console.log(this.first_file);
                break;
              }
            }
            this.file_name = this.file_objs[this.first_file].file.name;
            if (progressEvent.progress == 1) {
              this.page_load = "processing";
            }
          }.bind(this),
        })
        .then((response) => {
          console.log(response);
          // Handle response from server
          const type = response.data.split(".")[1];
          console.log(type);
          const obj = {
            id: response.data,
            button_title: "Successfully Converted",
            dis_text: "PDF has been converted!",
            down_name: `pdfden_converted.${type}`,
            file_type: `application/${type}`,
            before: "wordtopdf",
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
        .catch((error) => {
          this.page_load = "default";
          this.$swal("Server Error!", "Please check your Network.", "Warning");
        });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/pdfToWord.css";
</style>
