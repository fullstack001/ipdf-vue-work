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
      accept=".doc, .docx"
    />
    <SelectFileComponent
      v-if="page_load == 'default' && !file_objs.length"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.word_pdf.title')"
      :description="$t('page_titles.word_pdf.description')"
      :featureImgUrl="svgUrl"
    />

    <div
      class="wp-files-list"
      v-show="page_load == 'default' && file_objs.length"
    >
      <div class="preview-container mt-4" v-if="file_objs.length">
        <div class="badge-container md-primary" md-content="4">
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
        </div>
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
      class="wp_sidebar"
      v-show="file_objs.length > 0 && page_load == 'default'"
    >
      <h3 class="text-center">Word to PDF</h3>
      <div class="option__panel option__panel--active">
        <button class="wp_btn" @click="convertToPdf">
          {{ $t("page_titles.word_pdf.actionBtn") }}
        </button>
      </div>
    </div>
    <button
      v-show="file_objs.length > 0 && page_load == 'default'"
      class="wp_responsive_btn"
      @click="convertToPdf"
    >
      {{ $t("page_titles.word_pdf.actionBtn") }}
    </button>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import SvgImage from "@/assets/feature_img/word_pdf.svg";
import SelectFileComponent from "./components/SelectFileComponent.vue";

export default {
  metaInfo: {
    title: "Convert Word to PDF – Free Word to PDF Converter",
    meta: [
      {
        name: "Keywords",
        content:
          "word to PDF, convert Word to PDF, Word to PDF online, Word to PDF converter, online document conversion, convert DOCX to PDF",
      },
      {
        name: "description",
        content:
          "Convert Word documents to PDF seamlessly. Our online Word to PDF converter ensures a fast and reliable conversion process, preserving the formatting of your documents.",
      },
      {
        property: "og:description",
        content:
          "Convert Word documents to PDF seamlessly. Our online Word to PDF converter ensures a fast and reliable conversion process, preserving the formatting of your documents.",
      },
      {
        property: "og:title",
        content: "Convert Word to PDF – Free Word to PDF Converter",
      },
    ],
  },
  mixins: [fileHandlingMixin],
  components: {
    draggable,
    AddMoreDropDown,
    Processing,
    SelectFileComponent,
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
      svgUrl: SvgImage,
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
.wp-files-list {
  width: 80%;
  text-align: center;
  position: relative;
  padding: 20px;
}
.wp_sidebar {
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
.word_preview_img {
  width: 130px;
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

.wp_btn,
.wp_responsive_btn {
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
.wp_responsive_btn {
  display: none;
}

h3 {
  font-weight: 500;
  font-weight: 500;
  margin-bottom: 10px;
}

@media (max-width: 640px) {
  .wp_sidebar {
    display: none;
  }
  .wp-files-list {
    width: 100%;
    padding-left: 17%;
    min-height: 80vh;
  }

  .wp_responsive_btn {
    display: block;
    position: absolute;
    top: 200px;
    right: 10px;
  }
}
</style>
