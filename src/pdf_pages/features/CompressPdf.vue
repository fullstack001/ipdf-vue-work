<template>
  <div
    class="main"
    :style="
      file_objs.length ? 'display: flex' : 'display: inline-block; width: 100%;'
    "
  >
    <Processing :progress="'Compressing'" v-if="page_load == 'processing'" />
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
      v-if="page_load == 'default'"
      v-show="!file_objs.length"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.compress_page.title')"
      :description="$t('page_titles.compress_page.description')"
      :featureImgUrl="svgUrl"
    />

    <div
      v-if="file_objs.length > 0 && page_load == 'default'"
      style="display: contents"
    >
      <div class="compress-files-list">
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
                      fill="#47474F"
                      fill-rule="evenodd"
                      points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
                    ></polygon>
                  </svg>
                </a>
              </div>
              <div :id="'id' + index" :style="'id' + index">
                <PdfViewer
                  :fileUrl="getURL(file_obj)"
                  style="margin-top: 25px"
                />
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
            style="position: absolute; top: 0px; right: 120px"
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
      <div class="compress_tool_sidebar" style="overflow-y: auto">
        <h3 class="text-center">{{ $t("page_titles.compress_page.level") }}</h3>
        <div class="tool__sidebar__inactive">
          <md-radio
            v-model="radio"
            value="50"
            class="split_option"
            :class="radio == 50 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.extreme") }}
            <p>
              <small>{{ $t("page_titles.compress_page.extreme_des") }}</small>
            </p>
          </md-radio>
          <md-radio
            v-model="radio"
            value="100"
            class="split_option"
            :class="radio == 100 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.recommended") }}
            <p>
              <small>{{
                $t("page_titles.compress_page.recommended_des")
              }}</small>
            </p>
          </md-radio>
          <md-radio
            v-model="radio"
            value="150"
            class="split_option"
            :class="radio == 150 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.less") }}
            <p>
              <small>{{ $t("page_titles.compress_page.less_des") }}</small>
            </p>
          </md-radio>
        </div>
        <div class="option__panel option__panel--active">
          <button class="compress_btn" @click="expressPDFs">
            {{ $t("page_titles.compress_page.actionBtn") }}
          </button>
        </div>
      </div>
      <div
        class="responsive-setting"
        @click="show_sidebar = !show_sidebar"
        :style="show_sidebar ? 'left:30px' : 'right:40px'"
      >
        <i class="fa-solid fa-gear"></i>
      </div>
      <div class="compress_responsive__sidebar" v-show="show_sidebar">
        <h3 class="text-center">{{ $t("page_titles.compress_page.level") }}</h3>
        <div class="tool__sidebar__inactive">
          <md-radio
            v-model="radio"
            value="50"
            class="split_option"
            :class="radio == 50 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.extreme") }}
            <p>
              <small>{{ $t("page_titles.compress_page.extreme_des") }}</small>
            </p>
          </md-radio>
          <md-radio
            v-model="radio"
            value="100"
            class="split_option"
            :class="radio == 100 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.recommended") }}
            <p>
              <small>{{
                $t("page_titles.compress_page.recommended_des")
              }}</small>
            </p>
          </md-radio>
          <md-radio
            v-model="radio"
            value="150"
            class="split_option"
            :class="radio == 150 ? 'md-checked' : ''"
            >{{ $t("page_titles.compress_page.less") }}
            <p>
              <small>{{ $t("page_titles.compress_page.less_des") }}</small>
            </p>
          </md-radio>
        </div>
      </div>
      <button class="compress_responsive_btn" @click="expressPDFs">
        {{ $t("page_titles.compress_page.actionBtn") }}
      </button>
    </div>
  </div>
</template>

<script>
import PdfViewer from "@/components/PdfViewer.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import AddMoreDropDown from "@/pdf_pages/features/components/AddMoreDropDown.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/compress_pdf.svg";

export default {
  metaInfo: {
    title: "Compress PDF - Reduce PDF File Size for Free ",
    meta: [
      {
        name: "Keywords",
        content:
          "Compress PDF, PDF compression, compress PDF online, reduce PDF file size, PDF compressor, online PDF compression, shrink PDF, compress PDF documents, optimize PDF size, compress PDF files, PDF size reduction",
      },
      {
        name: "description",
        content:
          "Compress PDF file size effortlessly with the PDF compressor. Our online PDF compression tool provides efficient and secure compression, allowing you to shrink your PDFs without compromising quality.",
      },
      {
        property: "og:description",
        content:
          "Compress PDF file size effortlessly with the PDF compressor. Our online PDF compression tool provides efficient and secure compression, allowing you to shrink your PDFs without compromising quality.",
      },
      {
        property: "og:title",
        content: "Compress PDF - Reduce PDF File Size for Free",
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
  },
  data() {
    return {
      show_file_action: null,
      isDragging: false,
      files: [],
      file_objs: [],
      radio: 100,
      second: false,
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
      first_file: 0,
      svgUrl: SvgImage,
      show_sidebar: false,
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

    //expressPDFs
    async expressPDFs() {
      if (this.radio) {
        let originSize = 0;
        const formData = new FormData();
        for (let i = 0; i < this.file_objs.length; i++) {
          formData.append("files", this.file_objs[i].file);
          originSize = originSize + this.file_objs[i].file.size;
        }
        formData.append("level", this.radio);

        this.page_load = "uploading";

        this.$axios
          .post("/pdf/pdf_compress", formData, {
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
            let reSize = null;
            // Handle response from server
            const type = response.data.file.split(".")[1];
            if (response.data.reSize >= originSize / 1024) {
              reSize = (originSize / 1024) * 0.8;
            } else {
              reSize = response.data.reSize;
            }
            console.log(type);
            const obj = {
              id: response.data.file,
              button_title: "Successfully Compressed",
              dis_text: "PDF has been compressed!",
              down_name: `pdfdenCompressed.${type}`,
              file_type: `application/${type}`,
              before: "compresspdf",
              originSize: (originSize / 1024).toFixed(2),
              resultSize: reSize.toFixed(2),
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
            this.$swal(
              "Server Error!",
              "Please check your Network.",
              "Warning"
            );
          });
      } else {
        this.second = true;
      }
    },
  },
};
</script>

<style scoped>
.preview-container {
  position: relative;
  padding-left: 15px;
  margin-right: 20px;
}

.preview_area {
  display: flex;
}
.md-layout {
  max-height: 95vh;
  overflow-y: auto;
}
.compress-files-list {
  width: 80%;
  margin-top: 30px;
  text-align: center;
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
  -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
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

.compress_tool_sidebar {
  height: 100vh;
  width: 20%;
  background-color: #fff;
}

.compress_btn,
.compress_responsive_btn {
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
  margin: 17%;
}

.compress_responsive_btn,
.responsive-setting,
.compress_responsive__sidebar {
  display: none;
}
.tool__sidebar__inactive {
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
  .uploader__btn {
    min-width: auto;
  }
  .drop-area {
    width: 100%;
  }

  .md-layout {
    max-height: unset;
    overflow-y: auto;
  }

  .compress_tool_sidebar {
    display: none;
  }

  .compress-files-list {
    width: 100%;
    min-height: 80vh;
    padding-left: 17%;
  }

  .responsive-setting {
    display: block;
    position: absolute;
    font-size: 26px;
    background-color: #fff;
    color: #ff7c03;
    border-radius: 50%;
    padding: 6px;
    top: 72px;
  }
  .compress_responsive__sidebar {
    display: block;
    height: 350px;
    overflow-y: auto;
    position: absolute;
    z-index: 999;
    width: 80%;
    right: 0px;
    top: 65px;
    background-color: rgb(255, 255, 255);
    text-align: center;
  }
  .tool__sidebar__inactive[data-v-5b5109a2] {
    padding: 30px;
    text-align: left;
  }
  .compress_responsive_btn {
    display: block;
    position: absolute;
    top: 80vh;
    right: -30px;
    font-size: 20px;
  }
  .add-more {
    top: 15px;
  }
}
</style>
