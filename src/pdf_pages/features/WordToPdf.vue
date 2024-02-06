<template>
  <div
    class="main"
    :style="
      file_objs.length > 0
        ? 'display: flex'
        : 'display: inline-block; width: 100%;'
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
            {{ $t("page_titles.word_pdf.title") }}
          </div>
          <div class="page-description">
            {{ $t("page_titles.word_pdf.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/word_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised md-danger">
                {{ $t("page_titles.word_pdf.selectBtn") }}
              </label>
              <input
                type="file"
                multiple
                name="file"
                id="fileInput"
                class="hidden-input"
                @change="onChange"
                ref="file"
                accept=".doc, .docx"
              />
              <div
                class="add-more"
                v-bind:style="'position: absolute; margin: auto; right: -50px; top: -5px;'"
              >
                <div
                  class="badge-container md-primary"
                  md-content="4"
                  v-if="file_objs.length"
                >
                  <md-button class="md-icon-button" @click="open_add_local">
                    <md-icon>computer</md-icon>
                    <md-tooltip md-direction="right"
                      >{{ $t("toolTip.upload_local") }}
                    </md-tooltip>
                  </md-button>
                  <div class="badge">
                    {{ file_objs.length }}
                  </div>
                </div>
                <GDriveSelector
                  @picked="onPickedGoogleDriver"
                  :buttonStyle="'download'"
                />

                <VueDropboxPicker
                  class="cloud dropbox"
                  link-type="direct"
                  :multiselect="true"
                  :extensions="['.docx', '.doc']"
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
            <div>{{ $t("page_titles.word_pdf.dropFiles") }}</div>
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
              v-for="(file, index) in file_objs"
              :key="file.file.name + index"
              @mouseover="show_file_action = file.file.name + index"
              @mouseleave="show_file_action = null"
            >
              <div
                class="file__actions"
                v-show="show_file_action == file.file.name + index"
              >
                <a
                  class="file__btn remove tooltip--top tooltip"
                  title="Remove this file"
                  data-title="Remove this file"
                  @click="remove(file_objs.indexOf(file))"
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
                <img
                  src="@/assets/img/word.png"
                  srcset="@/assets/img/word.png"
                  alt="language selector icon"
                  class="word_preview_img"
                />
              </div>
              <div class="prew_title">
                {{
                  file.file.name.length > 19
                    ? file.file.name.substring(0, 20) + "..."
                    : file.file.name
                }}
              </div>
            </div>
          </draggable>
          <div
            class="add-more"
            v-bind:style="
              file_objs.length
                ? 'position: absolute; top: 0px; right: 80px'
                : 'position: relative; margin: auto; right: 0; top: 0;'
            "
          >
            <div
              class="badge-container md-primary"
              md-content="4"
              v-if="file_objs.length"
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
    </div>

    <div v-show="file_objs.length > 0" v-if="page_load == 'default'">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <h3 class="text-center">Word to PDF</h3>
        <div class="option__panel option__panel--active" id="convert-options">
          <button class="option__panel__title" @click="convertToPdf">
            {{ $t("page_titles.word_pdf.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import GDriveSelector from "@/components/GDriveSelector.vue";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/fileHandlingMixin.js";

export default {
  mixins: [fileHandlingMixin],
  components: {
    VueDropboxPicker,
    draggable,
    GDriveSelector,
    AddMoreDropDown,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      file_objs: [],
      second: false,
      show_file_action: null,
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
      first_file: 0,
    };
  },

  methods: {
    handleFiles(files) {
      // Process the dropped files
      for (let i = 0; i < files.length; i++) {
        this.file_objs.push({ file: files[i], degree: 0 });
      }
    },

    remove(i) {
      this.file_objs.splice(i, 1);
    },

    async convertToPdf() {
      this.page_load = "uploading";
      const formData = new FormData();
      let degrees = [];
      for (let i = 0; i < this.file_objs.length; i++) {
        formData.append("files", this.file_objs[i].file);
        degrees.push(this.file_objs[i].degree);
      }
      console.log(degrees);
      formData.append("degrees", degrees);
      this.$axios
        .post("/pdf/wordtopdf", formData, {
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
          const type = response.data.split(".")[1];
          const obj = {
            id: response.data,
            button_title: "Download Converted PDF",
            dis_text: "Word has been Converted!",
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
@import "../../assets/css/wordToPdf.css";
</style>
