<template>
  <div
    class="main"
    :style="
      file_objs.length > 0
        ? 'display: flex'
        : 'display: inline-block; width: 100%;'
    "
  >
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
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
                <!-- <a
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
                </a> -->
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
                ? 'position: absolute; top: 0px; right: 50px'
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

    <div v-show="file_objs.length > 0">
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
import CryptoJS from "crypto-js";
import GDriveSelector from "@/components/GDriveSelector.vue";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";

export default {
  components: {
    VueDropboxPicker,
    draggable,
    GDriveSelector,
    AddMoreDropDown,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      file_objs: [],
      second: false,
      show_file_action: null,
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
    onChange() {
      const data = this.$refs.file.files;
      var add_objs = [],
        i = 0;
      for (i = 0; i < data.length; i++) {
        add_objs.push({ file: data[i], degree: 0 });
      }
      this.file_objs = [...this.file_objs, ...add_objs];
      console.log(this.file_objs);
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
      let rotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI) + 90;
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

    async convertToPdf() {
      this.$isLoading(true); // show loading screen
      const formData = new FormData();
      let degrees = [];
      for (let i = 0; i < this.file_objs.length; i++) {
        formData.append("files", this.file_objs[i].file);
        degrees.push(this.file_objs[i].degree);
      }
      console.log(degrees);
      formData.append("degrees", degrees);
      this.$axios
        .post("/pdf/wordtopdf", formData)
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
        .catch((err) => console.log(err))
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
.word_preview_img {
  width: 130px;
}
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
#convert-options {
  margin-top: 70vh;
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
  margin-left: 5px;
}

.add-more .md-icon-button:hover {
  background-color: #ff7c03 !important;
}

h3 {
  font-weight: 500;
}

.tool__sidebar {
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

.badge-container {
  position: relative;
}
h3 {
  font-weight: 500;
  margin-bottom: 10px;
}
.badge {
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

@media (max-width: 640px) {
  .drop-area {
    width: 100%;
  }

  .uploader__btn {
    min-width: auto;
  }
}
</style>
