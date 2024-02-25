<template>
  <div
    class="main"
    :style="file_objs.length ? 'display: flex; width: 100%' : ''"
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
    <SelectFileComponent
      v-if="page_load == 'default' && !file_objs.length"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.pdf_word.title')"
      :description="$t('page_titles.pdf_word.description')"
      :featureImgUrl="svgUrl"
    />
    <div
      class="pw-files-list"
      v-if="page_load == 'default' && file_objs.length"
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
            </div>
          </div>
        </draggable>
      </div>
      <div class="add-more">
        <div class="add-more-area">
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

    <div
      class="pw_tool__sidebar"
      style="overflow-y: auto"
      v-if="page_load == 'default' && file_objs.length > 0"
    >
      <h3 class="text-center">PDF to Word</h3>
      <button class="pw-btn" @click="convertToWord">
        {{ $t("page_titles.pdf_word.actionBtn") }}
      </button>
    </div>
    <button
      v-show="file_objs.length > 0 && page_load == 'default'"
      class="pw_responsive_btn"
      @click="convertToWord"
    >
      {{ $t("page_titles.pdf_word.actionBtn") }}
    </button>
  </div>
</template>

<script>
import PdfViewer from "@/components/PdfViewer.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/pdf_word.svg";

export default {
  metaInfo: {
    title: "Convert PDF to Word – Free PDF to Word Converter",
    meta: [
      {
        name: "Keywords",
        content:
          "PDF to Word, convert PDF to Word, PDF to Word online, PDF to DOCX converter, extract text from PDF, online document conversion",
      },
      {
        name: "description",
        content:
          "Convert PDF to Word documents with precision. Our online PDF to Word converter ensures accurate and efficient conversion, retaining the original formatting.",
      },
      {
        property: "og:description",
        content:
          "Convert PDF to Word documents with precision. Our online PDF to Word converter ensures accurate and efficient conversion, retaining the original formatting.",
      },
      {
        property: "og:title",
        content: "Convert PDF to Word – Free PDF to Word Converter",
      },
    ],
  },
  mixins: [fileHandlingMixin],
  components: {
    PdfViewer,
    draggable,
    SelectFileComponent,
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
      svgUrl: SvgImage,
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
.pw-files-list {
  width: 80%;
  text-align: center;
  position: relative;
  padding: 20px;
  height: 100vh;
}
.pw_tool__sidebar {
  width: 20%;
  background-color: #fff;
  width: 20%;
  height: 100vh;
  text-align: center;
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

.add-more {
  width: fit-content;
  position: absolute;
  margin: auto;
  right: 120px;
  top: 30px;
}

.add-more-area {
  position: relative;
  display: block;
}

.pw-btn,
.pw_responsive_btn {
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
  margin-top: 100%;
}
.pw_responsive_btn {
  display: none;
}

h3 {
  font-weight: 500;
}

@media (max-width: 640px) {
  .pw_tool__sidebar {
    display: none;
  }
  .pw-files-list {
    width: 100%;
    padding-left: 17%;
    min-height: 80vh;
  }

  .pw_responsive_btn {
    display: block;
    position: absolute;
    top: 200px;
    right: 10px;
  }
}
</style>
