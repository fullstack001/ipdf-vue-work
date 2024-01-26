<template>
  <div
    class="main"
    :style="file_objs.length ? 'display: flex' : 'display: inline-block'"
  >
    <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
      <div class="upload_btn_area">
        <div v-show="!file_objs.length" class="upload-buttons">
          <div class="page-title">
            {{ $t("page_titles.merge_page.title") }}
          </div>
          <div class="page-description">
            {{ $t("page_titles.merge_page.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/merge_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised">
                {{ $t("page_titles.merge_page.selectBtn") }}
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
              <div class="add-more">
                <div class="md-primary" md-content="4" v-if="file_objs.length">
                  <button class="local-upload" @click="open_add_local">
                    <md-icon>computer</md-icon>
                  </button>
                </div>
                <GDriveSelector
                  @picked="onPickedGoogleDriver"
                  :buttonStyle="'download'"
                />

                <VueDropboxPicker
                  class="cloud dropbox"
                  link-type="direct"
                  :buttonType="'chooser'"
                  :multiselect="true"
                  :extensions="['.pdf', '.doc']"
                  :folderselect="false"
                  v-bind:style="
                    file_objs.length
                      ? 'margin-top: 5px;'
                      : 'display: inline-block;'
                  "
                  @picked="onPickedDropbox"
                />
              </div>
            </div>
            <div>
              {{ $t("page_titles.merge_page.dropFiles") }}
            </div>
          </div>
          <!-- <div class="security-area">
            <div class="security-titlel">
              <div class="security-img">
                <img src="@/assets/img/carbon_security.png" alt="" />
              </div>
              <div>
                {{ $t("page_titles.merge_page.securitySection.title") }}
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item security-items">
                <div class="try-img">
                  <span class="material-icons"> check_circle</span>
                </div>
                <div class="try-title">
                  {{
                    $t("page_titles.merge_page.securitySection.description1")
                  }}
                </div>
              </div>
              <div class="md-layout-item security-items">
                <div class="try-img">
                  <span class="material-icons"> check_circle</span>
                </div>
                <div class="try-title">
                  {{
                    $t("page_titles.merge_page.securitySection.description2")
                  }}
                </div>
              </div>
              <div class="md-layout-item security-items">
                <div class="try-img">
                  <span class="material-icons"> check_circle</span>
                </div>
                <div class="try-title">
                  {{
                    $t("page_titles.merge_page.securitySection.description3")
                  }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="merge-descriptions">
            <div class="block__container">
              <div class="description-areas">
                <div class="description-title">
                  {{ $t("page_titles.merge_page.howSection.title") }}
                </div>
                <div class="description-sub-title">
                  {{ $t("page_titles.merge_page.howSection.description") }}
                </div>
              </div>
            </div>
            <div class="premium">
              <div class="block__container">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <div class="premium-list">
                      <div class="premium-img">
                        <img src="@/assets/img/icons/round1.png" alt="" />
                      </div>
                      <div class="premium-text">
                        {{ $t("page_titles.merge_page.howSection.list1") }}
                      </div>
                    </div>
                    <div class="premium-list">
                      <div class="premium-img">
                        <img src="@/assets/img/icons/round2.png" alt="" />
                      </div>
                      <div class="premium-text">
                        {{ $t("page_titles.merge_page.howSection.list2") }}
                      </div>
                    </div>
                    <div class="premium-list">
                      <div class="premium-img">
                        <img src="@/assets/img/icons/round3.png" alt="" />
                      </div>
                      <div class="premium-text">
                        {{ $t("page_titles.merge_page.howSection.list3") }}
                      </div>
                    </div>
                    <div class="premium-list">
                      <div class="premium-img">
                        <img src="@/assets/img/icons/round4.png" alt="" />
                      </div>
                      <div class="premium-text">
                        {{ $t("page_titles.merge_page.howSection.list4") }}
                      </div>
                    </div>
                    <div class="premium-list">
                      <div class="premium-img">
                        <img src="@/assets/img/icons/round5.png" alt="" />
                      </div>
                      <div class="premium-text">
                        {{ $t("page_titles.merge_page.howSection.list5") }}
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item">
                    <div class="free-img">
                      <img src="@/assets/img/merge-combine.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="try-sesction">
              <div class="block__container">
                <div class="description-title">
                  {{ $t("page_titles.merge_page.trySection.title") }}
                </div>
                <div class="md-layout">
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img src="@/assets/img/icons/combine-pdfs.svg" alt="" />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title1") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description1")
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img src="@/assets/img/icons/merge-into-one.svg" alt="" />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title2") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description2")
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img src="@/assets/img/icons/organize-pdf.svg" alt="" />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title3") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description3")
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img
                        src="@/assets/img/icons/download-and-share.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title4") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description4")
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img
                        src="@/assets/img/icons/work-in-any-browser.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title5") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description5")
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="md-layout-item try-items">
                    <div class="try-img">
                      <img src="@/assets/img/icons/best-pdf.svg" alt="" />
                    </div>
                    <div>
                      <div class="try-title">
                        {{ $t("page_titles.merge_page.trySection.title6") }}
                      </div>
                      <div class="try-description">
                        {{
                          $t("page_titles.merge_page.trySection.description6")
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="solution">
              <div class="block__container">
                <div class="solution-header">
                  <div class="description-title">
                    {{ $t("page_titles.merge_page.articleSection.title") }}
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item">
                    <md-card>
                      <md-card-media>
                        <img src="@/assets/img/merge1.png" alt="People" />
                        <div class="card-tip">
                          <div class="card-tip-date">10</div>
                          <div class="card-tip-month">NOV</div>
                        </div>
                      </md-card-media>

                      <md-card-header>
                        <div class="md-title">
                          {{
                            $t("page_titles.merge_page.articleSection.title1")
                          }}
                        </div>
                        <div class="md-subhead">
                          {{
                            $t(
                              "page_titles.merge_page.articleSection.description1"
                            )
                          }}
                        </div>
                      </md-card-header>
                    </md-card>
                  </div>
                  <div class="md-layout-item">
                    <md-card>
                      <md-card-media>
                        <img src="@/assets/img/merge2.png" alt="People" />
                        <div class="card-tip">
                          <div class="card-tip-date">10</div>
                          <div class="card-tip-month">NOV</div>
                        </div>
                      </md-card-media>

                      <md-card-header>
                        <div class="md-title">
                          {{
                            $t("page_titles.merge_page.articleSection.title2")
                          }}
                        </div>
                        <div class="md-subhead">
                          {{
                            $t(
                              "page_titles.merge_page.articleSection.description2"
                            )
                          }}
                        </div>
                      </md-card-header>
                    </md-card>
                  </div>
                  <div class="md-layout-item">
                    <md-card>
                      <md-card-media>
                        <img src="@/assets/img/merge3.png" alt="People" />
                        <div class="card-tip">
                          <div class="card-tip-date">10</div>
                          <div class="card-tip-month">NOV</div>
                        </div>
                      </md-card-media>

                      <md-card-header>
                        <div class="md-title">
                          {{
                            $t("page_titles.merge_page.articleSection.title3")
                          }}
                        </div>
                        <div class="md-subhead">
                          {{
                            $t(
                              "page_titles.merge_page.articleSection.description3"
                            )
                          }}
                        </div>
                      </md-card-header>
                    </md-card>
                  </div>
                </div>
              </div>
            </div>
            <div class="faq-section">
              <div class="block__container">
                <div class="description-title">
                  {{ $t("page_titles.merge_page.qaSection.title") }}
                </div>
                <div v-for="(faqItem, index) in faqItems" :key="index">
                  <faq :faq="faqItem" />
                </div>
              </div>
            </div>

            <div class="rate-secttion">
              <div class="block__container">
                <div class="description-title">
                  {{ $t("page_titles.merge_page.rateSection.title") }}
                </div>
                <div class="rate-star">
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star</span>
                  <span class="material-icons">star_outline</span>
                </div>
                <div class="rate-reviews">
                  <span class="rate-score"> 4.8/5 - </span>
                  <span class="rate-votes">
                    254956 {{ $t("page_titles.merge_page.rateSection.vote") }}
                  </span>
                </div>
              </div>
            </div>
            <div class="online-section">
              <div class="block__container">
                <div class="description-title">
                  {{ $t("page_titles.merge_page.onlineSection.title") }}
                </div>
                <div class="tools_container">
                  <div
                    v-for="(item, index) in $t('onlines')"
                    :key="index"
                    class="tools__item"
                  >
                    <feature-title :item="{ item }"> </feature-title>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="files-list" style="position: relative">
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
                >{{ (file_obj.file.size / 1024).toFixed(2) }} Kbyte
                {{ file_obj.page }} pages
              </md-tooltip>
            </div>
          </draggable>
        </div>
        <div
          class="add-more"
          v-show="file_objs.length"
          :style="file_objs.length > 1 ? 'right: 30px' : 'right: 120px'"
        >
          <a
            id="orderByName"
            data-order="asc"
            href="javascript:;"
            title="Order files by name"
            data-title="Order files by name"
            style="display: flex"
            v-if="file_objs.length > 1"
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
        <h3>{{ $t("page_titles.merge_page.mergePdf") }}</h3>

        <div class="option__panel option__panel--active" id="merge-options">
          <div class="option__panel__content">
            <div
              class="info drag"
              style="display: none"
              v-show="file_objs.length == 1"
            >
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
            class="option__panel__title"
            @click="mergePDFs"
            :disabled="file_objs.length == 1"
          >
            {{ $t("page_titles.merge_page.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, degrees } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import CryptoJS from "crypto-js";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import GDriveSelector from "@/components/GDriveSelector.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import faq from "@/components/Faq.vue";
import FeatureTitle from "./components/FeatureTitle.vue";
import { online_names } from "../services/online_name";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    faq,
    FeatureTitle,
    GDriveSelector,
    AddMoreDropDown,
    // GDrivePicker,
  },
  data() {
    return {
      show_file_action: null,
      isDragging: false,
      files: [],
      file_objs: [],
      sorted: false,
      online_names: online_names,
      faqItems: [
        {
          q: "In what order will my merged PDF files appear?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: true,
        },
        {
          q: "How many pages can I include in a merged PDF?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: false,
        },
        {
          q: "Can I delete and reorder pages after I merge files?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: false,
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.file) {
      console.log(this.$route.params.file);
      this.file_objs = this.$route.params.file.map((file) => {
        return { file: file, degree: 0 };
      });
    }
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
    async onPickedDropbox(data) {
      for (let i = 0; i < data.length; i++) {
        let pageNum = await getPageNumber(data[i]);
        this.file_objs.push({ file: data[i], degree: 0, page: pageNum });
      }
      console.log(this.file_objs);
    },
    async onPickedGoogleDriver(data) {
      for (let i = 0; i < data.length; i++) {
        let pageNum = await getPageNumber(data[i]);
        this.file_objs.push({ file: data[i], degree: 0, page: pageNum });
      }
      console.log(this.file_objs);
    },
    async onChange() {
      const data = this.$refs.file.files;
      var add_objs = [],
        i = 0;
      for (i = 0; i < data.length; i++) {
        let pageNum = await getPageNumber(data[i]);
        add_objs.push({ file: data[i], degree: 0, page: pageNum });
      }
      this.file_objs = [...this.file_objs, ...add_objs];
      console.log(this.file_objs);
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
      this.$isLoading(true); // show loading screen
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

      const formData = new FormData();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      console.log(blob);

      formData.append("pdf", blob);

      this.$axios
        .post("/pdf/pdf_upload", formData)
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: "Successfully Merged",
            dis_text: "PDF has been merged!",
            down_name: "merged_pdf.pdf",
            file_type: "application/pdf",
            before: "mergepdf",
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
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.$isLoading(false); // hide loading screen
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
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
  margin: 8px auto 0;
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  color: #47474f;
}

.dropzone-container {
  width: 100%;
  min-height: 100vh;
  /* padding: 4rem; */
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
  cursor: pointer;
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
  position: absolute;
  margin: auto;
  right: -50px;
  top: -5px;
}

.add-more-area {
  position: relative;
  display: block;
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
  margin-bottom: 130px;
  text-align: left;
}

.option__panel__title {
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

.option__panel__title:hover {
  background-color: #e76d26;
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

.merge-descriptions {
  text-align: left;
  margin-top: 50px;
  background-color: #fafafa;
  padding: 50px 0 0 0;
}

.description-title {
  color: #575757;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  padding: 10px 0;
}
.description-title {
  color: #575757;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  padding: 10px 0;
}

.premium {
  padding-bottom: 50px;
}

.premium-list {
  display: flex;
  margin: 10px 0px;
  padding-top: 10px;
  padding-bottom: 13px;
  border-bottom: solid 1px #e0e0e0;
}

.premium-img img {
  width: 40px;
}

.premium-text {
  padding: 0 10px;
}

.free-img {
  text-align: center;
}

.free-img img {
  max-width: 200px;
  margin: 100px;
}

.try-sesction {
  padding: 50px 0;
  background-color: #fff;
}

.try-items {
  margin: 15px 0;
  display: flex;
}

.try-img img {
  width: 120px;
  margin-top: 10px;
}

.card-tip {
  position: absolute;
  background-color: #ff7c03;
  border-radius: 0px 8px 8px 0px;
  bottom: 15px;
  color: #fff;
  padding: 5px 5px;
  font-weight: 500;
}

.card-tip-date {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
.md-card-header {
  box-shadow: none !important;
}

.try-title {
  color: #575757;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  padding: 10px 0;
}

.md-card-media {
  padding: 15px;
}

.md-card-header {
  background-color: #fff !important;
  margin-bottom: 15px !important;
}

.faq-section {
  padding: 50px 0;
  background-color: #fff;
}

.rate-secttion {
  padding: 50px 0;
  background-color: #fafafa;
  text-align: center;
}

.rate-star {
  padding: 20px 0;
}

.rate-star span {
  color: #ff7c03;
}

.rate-score {
  color: #ff7c03;
  font-size: 18px;
}

.rate-star span {
  cursor: pointer;
}

.rate-votes {
  font-size: 18px;
}

.online-section {
  padding: 50px 0;
  text-align: center;
  background-position: center center;
  background-size: 100% auto;
  background-image: url("../../assets/img/online-tools.png");
}

.tools_container {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  margin-top: 30px;
}

#orderByName {
  margin-top: 20px;
  background-color: #fff;
  padding: 9px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 50px;
}

.tools__item {
  background: #fff;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-preferred-size: calc(25% - 30px);
  flex-basis: calc(25% - 30px);
  border: 1px solid #f5f5fa;
  margin: 15px;
  position: relative;
  overflow: hidden;
  -webkit-transition: background-color 0.4s ease-out,
    -webkit-box-shadow 0.4s ease-out;
  transition: background-color 0.4s ease-out, -webkit-box-shadow 0.4s ease-out;
  -o-transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out;
  transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out;
  transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out,
    -webkit-box-shadow 0.4s ease-out;
  z-index: 1;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
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

.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
}
.md-layout {
  max-height: 95vh;
  overflow-y: auto;
}

.security-area .md-layout {
  width: 80%;
  margin: auto;
}

.security-titlel {
  display: inline-flex;
  text-align: center;
  width: 50%;
  margin-top: 30px;
}

.security-items {
  display: inline-flex;
  margin-top: 20px;
  width: 60%;
}

.security-items .try-img span {
  color: #8ac823;
  padding-top: 8px;
}

.security-items .try-title {
  font-size: 14px;
  font-weight: 400;
}

@media (max-width: 960px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(33.333% - 4px);
    flex-basis: calc(33.333% - 4px);
  }
  .block__container {
    max-width: 84%;
    margin-left: 5px;
    padding-left: 0px;
  }

  .faq-section {
    padding-left: 10px;
  }

  .try-sesction {
    padding-left: 10px;
  }

  .description-title,
  .description-sub-title {
    padding-left: 10px;
  }
}
@media (max-width: 640px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(50% - 4px);
    flex-basis: calc(50% - 4px);
  }
  .block__container {
    max-width: 84%;
    margin-left: 5px;
    padding-left: 0px;
  }

  .security-area {
    margin-left: -50px;
  }
  .drop-area {
    margin-left: 80px !important;
  }

  .page-title,
  .page-description {
    margin-left: 30px !important;
  }
}
@media (max-width: 440px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(100% - 4px);
    flex-basis: calc(100% - 4px);
  }
  .block__container {
    max-width: 84%;
    margin-left: 5px;
    padding-left: 0px;
  }

  .page-title {
    max-width: 300px;
    margin: 8px auto 0;
    margin-left: 15%;
  }

  .page-description {
    max-width: 300px;
    margin: 8px auto 0;
    margin-left: 15%;
  }
}
</style>
@/store/store
