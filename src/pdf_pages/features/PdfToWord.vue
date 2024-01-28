<template>
  <div
    class="main"
    :style="
      file_objs.length ? 'display: flex' : 'display: inline-block; width: 100%;'
    "
  >
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
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
                ? 'position: absolute; top: 00px; right: 50px'
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

    <div v-show="file_objs.length > 0">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <h3 class="text-center">PDF to Word</h3>
        <div class="option__panel option__panel--active" id="convert-options">
          <button class="option__panel__title" @click="convertToWord">
            {{ $t("page_titles.pdf_word.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
    <md-dialog-alert
      :md-active.sync="second"
      md-title="Select Level!"
      md-content="Your have to select level and compress the PDF"
    />
  </div>
</template>

<script>
import PdfViewer from "@/components/PdfViewer.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import GDriveSelector from "@/components/GDriveSelector.vue";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import CryptoJS from "crypto-js";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    GDriveSelector,
    AddMoreDropDown,
  },
  data() {
    return {
      show_file_action: null,
      isDragging: false,
      files: [],
      file_objs: [],
      second: false,
    };
  },

  methods: {
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
      this.handleFiles(files);
    },
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

    //download from dropbox
    onPickedDropbox(data) {
      const add_objs = data.map((item) => {
        return { file: item, degree: 0 };
      });
      this.file_objs = [...this.file_objs, ...add_objs];
    },
    onPickedGoogleDriver(data) {
      const add_objs = data.map((item) => {
        return { file: item, degree: 0 };
      });
      this.file_objs = [...this.file_objs, ...add_objs];
    },

    onChange() {
      const data = this.$refs.file.files;
      var add_objs = [],
        i = 0;
      for (i = 0; i < data.length; i++) {
        add_objs.push({ file: data[i], degree: 0 });
      }
      this.file_objs = [...this.file_objs, ...add_objs];
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
      this.$isLoading(true); // show loading screen
      const formData = new FormData();
      for (let i = 0; i < this.file_objs.length; i++) {
        formData.append("files", this.file_objs[i].file);
      }

      this.$axios
        .post("/pdf/pdf_to_word", formData)
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
          // Your secret message
          const message = JSON.stringify(obj);
          // Your secret key (should be kept private)
          const secretKey = "mySecretKey123";
          // Encrypt the message using AES encryption with the secret key
          const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
          this.$router.push({
            name: "download",
            params: {
              param: encrypted,
            },
          });
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        })
        .finally(() => {
          this.$isLoading(false); // hide loading screen
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
}

#convert-options {
  margin-top: 70vh;
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
}
.dropzone-container {
  padding: 1rem 4rem;
  /* background: #f7fafc;
  border: 1px solid #e2e8f0; */
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
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.preview-container {
  position: relative;
  margin-top: 2rem;
  margin-right: 20px;
}
.md-layout {
  max-height: 95vh;
  overflow-y: auto;
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
  height: 250px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: distribute;
  align-content: space-around;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0);
  background: #fdfdfd;
  border-radius: 8px;
  -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
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
  min-width: 400px;
  height: 100vh;
  background-color: #fff;
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
@/store/store
