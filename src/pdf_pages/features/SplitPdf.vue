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
      v-if="!pages.length && page_load == 'default'"
      @open_add_local="open_add_local"
      @onPickedDropbox="onPickedDropbox"
      @onPickedGoogleDriver="onPickedGoogleDriver"
      @handleFile="handleFiles"
      :title="$t('page_titles.split_page.title')"
      :description="$t('page_titles.split_page.description')"
      :featureImgUrl="imgUrl"
    />

    <div class="split-files-list" v-if="pages.length && page_load == 'default'">
      <div class="preview-container mt-4">
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
      <div
        class="responsive-setting"
        @click="show_sidebar = !show_sidebar"
        :style="show_sidebar ? 'left:30px' : 'right:20px'"
        v-if="page_load == 'default' && pages.length"
      >
        <i class="fa-solid fa-gear"></i>
      </div>
    </div>

    <button
      class="sign_responsive_btn"
      @click="splitPDF"
      v-if="page_load == 'default' && pages.length"
    >
      {{ $t("page_titles.split_page.actionBtn") }}
    </button>

    <div
      v-if="page_load == 'default' && pages.length"
      v-show="show_sidebar"
      class="split_responsive__sidebar"
      style="overflow-y: auto"
      ref="sidebar"
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
      </div>
    </div>
    <div
      v-if="page_load == 'default' && pages.length"
      class="split_tool__sidebar"
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
        <button class="sign_complete_btn" @click="splitPDF">
          {{ $t("page_titles.split_page.actionBtn") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import PdfViewer from "@/components/PdfViewer.vue";
import draggable from "vuedraggable";
import SplitExtra from "@/components/SplitExtra.vue";
import SpiltRange from "@/components/SpiltRange.vue";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import SelectFileComponent from "./components/SelectFileComponent.vue";
import SvgImage from "@/assets/feature_img/split_pdf.svg";

export default {
  metaInfo: {
    title: "Split PDF – Separate Pages in your PDF File for Free",

    meta: [
      {
        name: "Keywords",
        content:
          "Split PDF, PDF split, split PDF online, divide PDF files, PDF splitter, online PDF split, extract PDF pages, split PDF documents, split PDF pages, PDF file split",
      },
      {
        name: "description",
        content:
          "Split PDF files effortlessly with our PDF splitter. Divide and extract pages from your PDFs online. Enjoy a simple, secure, and user-friendly PDF split tool.",
      },
      {
        property: "og:description",
        content:
          "Split PDF files effortlessly with our PDF splitter. Divide and extract pages from your PDFs online. Enjoy a simple, secure, and user-friendly PDF split tool.",
      },
      {
        property: "og:title",
        content: "Split PDF – Separate Pages in your PDF File for Free",
      },
    ],
  },
  mixins: [fileHandlingMixin],
  components: {
    PdfViewer,
    draggable,
    SplitExtra,
    SpiltRange,
    Processing,
    Uploading,
    SelectFileComponent,
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
      show_sidebar: false,
      imgUrl: SvgImage,
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
.md-badge {
  position: absolute;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 9px;
  top: 5px;
  font-size: 18px;
  font-style: revert;
  font-weight: bold;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
  z-index: 6;
  background: green !important;
}
.split-files-list {
  width: 80%;
}

.preview-container {
  position: relative;
  margin-top: 2rem;
}

.preview_area {
  display: flex;
}
.preview-card {
  cursor: grab;
  flex: 1 1;
  margin: 4px;
  max-width: 165px;
  height: 215px;
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

.split_tool__sidebar {
  min-height: 100vh;
  min-width: 20%;
  max-width: 20%;
  text-align: center;
  /* position: absolute; */
  top: 0;
  right: 0;
  margin-top: 0px;
  background-color: #fff;
}

.draggable-item {
  margin: 5px;
  padding: 10px;
  background-color: lightblue;
  cursor: move;
}

.option__panel__content {
  margin: 10px;
  background: #def2ff;
  padding: 10px;
  border-radius: 5px;
  font-size: 13px;
}

.sign_complete_btn,
.sign_responsive_btn {
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
.sign_responsive_btn {
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

.range__container {
  margin: 12px;
  padding: 12px;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  display: -ms-flexbox;
  display: block;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px dashed #707078;
}

.split_card {
  display: inline-flex;
}

.page_number {
  display: block;
  margin: 10px 65px 0;
}

.split_card_body {
  margin-left: 5px;
  margin-right: 5px;
}

h3 {
  font-weight: 500;
  margin-bottom: 50px;
}

.social_btn i {
  color: #fff !important;
}

.md-button-content,
.md-button-content i {
  color: #ff7c03 !important;
}

.range_btn {
  padding: 5px 0px;
  font-size: 14px;
  margin: 10px 10px;
  border-radius: 10px;
  color: #f5f5fa !important;
  font-weight: 500;
  background-color: #fefefe !important;
}

.range_btn .active_btn {
  background-color: #ff7c03 !important;
}

.active_btn {
  background-color: #ff7c03 !important;
}

.active_btn .md-button-content {
  color: #fff !important;
}

.range_btn:hover .md-button-content {
  color: #fff !important;
}

.md-button-content:hover,
.md-button-content:focus,
.md-button-content:active {
  color: #fff !important;
}

.badge {
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff7c03;
  border-radius: 100%;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.05em;
  font-family: "Roboto Mono", monospace;
}

#merge-options {
  padding-bottom: 30px;
}
.responsive-setting {
  display: none;
}

@media (max-width: 640px) {
  .split-files-list {
    width: 100%;
    min-height: 80vh;
  }
  .split_tool__sidebar {
    display: none;
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
  .split_responsive__sidebar {
    height: 710px;
    overflow-y: auto;
    position: absolute;
    z-index: 999;
    width: 80%;
    right: 0px;
    top: 65px;
    background-color: rgb(255, 255, 255);
    text-align: center;
  }
  .sign_responsive_btn {
    display: block;
    position: absolute;
    top: 80vh;
    right: 10px;
  }
}
</style>
