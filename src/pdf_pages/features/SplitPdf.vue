<template>
  <div
    class="main"
    :style="file ? 'display: flex;' : 'display: inline-block;  width: 100%;'"
  >
    <Processing :progress="'Splitting'" v-if="page_load == 'processing'" />
    <Uploading
      :progress="progress"
      :number="1"
      :total="1"
      :size="size"
      :file_name="file_name"
      v-if="page_load == 'uploading'"
    />
    <div
      class="dropzone-container"
      @dragover.prevent
      @drop="handleDrop"
      :style="pages.length ? 'width: 113%' : 'width: 100%'"
      ref="dropzone"
      v-if="page_load == 'default'"
    >
      <div class="upload_btn_area">
        <div v-show="!pages.length" class="upload-buttons">
          <div class="page-title">{{ $t("page_titles.split_page.title") }}</div>
          <div class="page-description">
            {{ $t("page_titles.split_page.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/split_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised md-danger">
                {{ $t("page_titles.split_page.selectBtn") }}
              </label>
              <input
                type="file"
                name="file"
                id="fileInput"
                class="hidden-input"
                @change="onChange"
                ref="file"
                accept=".pdf"
              />
              <div class="add-more">
                <GDriveSelector
                  @picked="onPickedGoogleDriver"
                  :buttonStyle="'download'"
                  style="margin-left: -5px; margin-top: 5px"
                />

                <VueDropboxPicker
                  class="cloud dropbox"
                  link-type="direct"
                  :multiselect="false"
                  :extensions="['.pdf']"
                  :folderselect="false"
                  @picked="onPickedDropbox"
                />
              </div>
            </div>
            <div>{{ $t("page_titles.split_page.dropFiles") }}</div>
          </div>
        </div>
      </div>
      <div class="files-list">
        <div class="preview-container mt-4" v-if="pages.length">
          <draggable
            v-model="pages"
            :options="{ animation: 150 }"
            class="md-layout"
          >
            <div class="range__container" v-for="page in pages" :key="page.id">
              <div v-show="extractEdit && showFlag(page.id)">
                <div class="md-badge">
                  <i class="fa-solid fa-check"></i>
                </div>
              </div>
              <div v-show="!extractEdit">
                <p>{{ $t("page_titles.split_page.range") }} {{ page.id }}</p>
              </div>
              <div class="split_card" v-if="page.range[0] == page.range[1]">
                <div
                  class="split_card_body"
                  @click="click_extract_pages(page.range[0])"
                >
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[0] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[1] }}</div>
                </div>
              </div>
              <div class="split_card" v-else>
                <div class="split_card_body">
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[0] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[0] }}</div>
                </div>
                <div class="split_card_body">
                  <div>
                    <PdfViewer
                      :fileUrl="generateURL(file)"
                      :pageNumber="page.range[1] * 1"
                    />
                  </div>
                  <div class="page_number">{{ page.range[1] }}</div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div
      v-show="pages.length"
      style="width: 30%"
      class="sidebar-area"
      v-if="page_load == 'default'"
    >
      <div
        id="sidebar"
        class="tool__sidebar"
        style="overflow-y: auto"
        ref="sidebar"
        :style="myStyleObject"
      >
        <h3>{{ $t("page_titles.split_page.split") }}</h3>
        <div class="tab-area">
          <md-tabs md-alignment="centered">
            <md-tab
              id="tab-home"
              md-icon="picture_as_pdf"
              md-label="Split by range"
              :exact="true"
              @click="rangeSplit"
              v-bind:class="extractEdit ? 'active_tab' : ''"
              :md-template-data="{ badge: 1 }"
              md-active-tab
            >
              <SpiltRange
                :rangeArray="pages"
                :maxNumber="pageCount"
                @set_check="set_checkBox"
                @rangeChange="changeRange"
              />
            </md-tab>
            <md-tab
              id="Extract pages"
              md-icon="account_tree"
              md-label="Extract Pages"
              @click="extractSplit"
              :set_disAll="pdf_click"
              v-bind:class="extractEdit ? '' : 'active_tab'"
            >
              <SplitExtra
                @set_check="set_checkBox"
                :set_disAll="pdf_click"
                :maxNum="pageCount"
                :extractpage="extractPages"
                @extractChange="setExtract"
              />
            </md-tab>
          </md-tabs>
        </div>

        <div class="option__panel option__panel--active" id="merge-options">
          <div v-if="show_checkBox">
            <md-checkbox v-model="merge_selected" value="true">
              {{ $t("page_titles.split_page.allRange") }}
            </md-checkbox>
          </div>
          <button class="option__panel__title" @click="splitPDF">
            {{ $t("page_titles.split_page.actionBtn") }}
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
import SplitExtra from "@/components/SplitExtra.vue";
import SpiltRange from "@/components/SpiltRange.vue";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import GDriveSelector from "@/components/GDriveSelector.vue";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/fileHandlingMixin.js";

import getPageNumber from "@/pdf_pages/services/getPageNumber";

export default {
  mixins: [fileHandlingMixin],
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    SplitExtra,
    SpiltRange,
    GDriveSelector,
    Processing,
    Uploading,
  },
  data() {
    return {
      isDragging: false,
      file: null,
      pageCount: 0,
      pages: [],
      extractEdit: false,
      extractPages: [],
      pdf_click: false,
      merge_selected: false,
      show_checkBox: true,
      myStyleObject: {},
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
    };
  },
  async mounted() {
    if (this.$route.params.file) {
      console.log(this.$route.params.file);
      this.file = this.$route.params.file[0];
      // Load the PDF document from the buffer

      let numPages = await getPageNumber(this.file);
      this.pageCount = numPages;
      this.pages = [{ id: 1, range: [1, numPages] }];
      for (let i = 1; i <= numPages; i++) {
        this.extractPages.push([i, i]);
      }
    }
  },

  methods: {
    set_checkBox(flag) {
      this.show_checkBox = flag;
      this.merge_selected = false;
    },

    handleFiles(files) {
      if (files.length > 1) {
        this.$swal(
          "Sorry!",
          "PDFden cannot process  more than one files in a task. One file will be process!",
          "warning"
        );
        this.file = files[0];
        this.get_pages(files[0]);
      } else {
        this.file = files[0];
        this.get_pages(files[0]);
      }
    },

    changeRange(data) {
      this.pages = data;
    },
    async get_pages() {
      let numPages = await getPageNumber(this.file);
      this.pageCount = numPages;
      this.pages = [{ id: 1, range: [1, numPages] }];
      for (let i = 1; i <= numPages; i++) {
        this.extractPages.push([i, i]);
      }
    },

    setExtract(newExtract) {
      this.extractPages = newExtract;
    },
    sidebarChange() {
      const dropzone = this.$refs.dropzone;
      const computedStyle = window.getComputedStyle(dropzone);

      // Accessing a specific CSS property
      const height = computedStyle.getPropertyValue("height");
      console.log("height:", height);
      this.myStyleObject = {
        height: height,
      };
    },
    click_extract_pages(page) {
      let temp = [];
      if (this.extractEdit) {
        if (!this.extractPages.length) {
          this.extractPages.push([page, page]);
          console.log(this.extractPages);
        } else {
          for (let i = 0; i < this.extractPages.length; i++) {
            let item = this.extractPages[i];
            for (let j = item[0]; j <= item[1]; j++) {
              if (temp.indexOf(j) < 0) {
                temp.push(j);
              }
            }
          }

          if (temp.indexOf(page) >= 0) {
            temp.splice(temp.indexOf(page), 1);
          } else {
            temp.push(page);
          }
          temp = [...temp].sort((a, b) => a - b);
          this.extractPages = this.groupConsecutiveNumbers(temp);
          console.log(this.extractPages);
        }
      }
    },
    groupConsecutiveNumbers(arr) {
      const result = [];
      let start = arr[0];
      let end = arr[0];

      for (let i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === 1) {
          end = arr[i];
        } else {
          result.push([start, end]);
          start = arr[i];
          end = arr[i];
        }
      }

      // Push the last range after loop completion
      result.push([start, end]);

      return result;
    },

    //extract split
    extractSplit() {
      this.extractEdit = true;

      this.pages = [];
      for (let i = 1; i <= this.pageCount; i++) {
        this.pages.push({ id: i, range: [i, i] });
      }
      // this.sidebarChange();
    },
    //split as range
    rangeSplit() {
      if (this.extractEdit == true) {
        this.pages = [{ id: 1, range: [1, this.pageCount] }];
        this.extractPages = [];
      }
      this.extractEdit = false;
      // this.sidebarChange();
    },
    showFlag(page) {
      if (!this.extractPages.length) {
        return false;
      } else {
        let budgePages = [];
        for (let i = 0; i < this.extractPages.length; i++) {
          let item = this.extractPages[i];
          for (let j = item[0]; j <= item[1]; j++) {
            if (budgePages.indexOf(j) < 0) {
              budgePages.push(j);
            }
          }
        }
        if (budgePages.indexOf(page) < 0) {
          return false;
        } else {
          return true;
        }
      }
    },

    generateURL(file) {
      if (file.link) {
        return file.link;
      } else if (file.type == "application/pdf") {
        let fileSrc = URL.createObjectURL(file);
        setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
        }, 1000);
        return fileSrc;
      }
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

    splitPDF() {
      let planPages = [];
      if (this.extractEdit) {
        planPages = this.extractPages;
      } else {
        planPages = this.pages.map((page) => {
          return [page.range[0] * 1, page.range[1] * 1];
        });
      }
      //split PDF
      this.splitingPDF(planPages);
    },

    async splitingPDF(planPages) {
      const formData = new FormData();
      let items = { pages: planPages, merge_flag: this.merge_selected };
      items = JSON.stringify(items);

      formData.append("file", this.file);
      formData.append("items", items);

      this.page_load = "uploading";
      this.$axios
        .post("/pdf/pdf_split", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.progress = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.size = progressEvent.total;
            if (progressEvent.progress == 1) {
              this.page_load = "processing";
            }
          }.bind(this),
        })
        .then((response) => {
          console.log(response.data);
          const type = response.data.split(".")[1];
          const obj = {
            id: response.data,
            button_title: "Download SPlitted PDF",
            dis_text: "PDF has been Splitted!",
            down_name: `pdfden_splitted.${type}`,
            file_type: `application/${type}`,
            before: "splitpdf",
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
          console.log(error);
          this.page_load = "default";
          this.$swal("Server Error!", "Please check your Network.", "Warning");
        });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/split.css";
</style>
