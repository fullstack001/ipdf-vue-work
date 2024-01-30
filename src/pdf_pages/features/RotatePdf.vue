<template>
  <div
    class="main"
    :style="file_objs.length ? 'display: flex' : 'display: inline-block'"
  >
    <Processing :progress="'Rotating'" v-if="page_load == 'processing'" />
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
      v-if="page_load == 'default'"
    >
      <div class="upload_btn_area">
        <div v-show="!file_objs.length" class="upload-buttons">
          <div class="page-title">
            {{ $t("page_titles.rotate_page.title") }}
          </div>
          <div class="page-description">
            {{ $t("page_titles.rotate_page.description") }}
          </div>
          <div class="drop-area">
            <div class="drop-img">
              <img src="@/assets/feature_img/merge_pdf.svg" alt="" />
            </div>
            <div class="upload_btn">
              <label for="fileInput" class="uploader__btn md-raised">
                {{ $t("page_titles.rotate_page.selectBtn") }}
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
                <faq
                  v-for="(faqItem, index) in faqItems"
                  :key="index"
                  :faq="faqItem"
                >
                </faq>
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
                  :id="`left${file_obj.file.name}`"
                  @click="setRotationLeftDegree(`id${index}`, index)"
                >
                  <svg
                    width="52px"
                    height="45px"
                    viewBox="0 0 52 45"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="fill: #fff"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1260.000000, -324.000000)"
                        fill="#fefefe"
                        fill-rule="nonzero"
                      >
                        <path
                          d="M1303.40861,357.720381 C1306.06297,354.535554 1307.53947,350.535229 1307.53947,346.302674 C1307.53947,336.448501 1299.5515,328.460535 1289.69733,328.460535 C1279.84363,328.460535 1271.85519,336.448771 1271.85519,346.302674 C1271.85519,347.534417 1270.85666,348.532942 1269.62492,348.532942 C1268.39318,348.532942 1267.39465,347.534417 1267.39465,346.302674 C1267.39465,333.98526 1277.38017,324 1289.69733,324 C1302.01498,324 1312,333.985016 1312,346.302674 C1312,351.58873 1310.15146,356.597043 1306.8351,360.576162 C1306.0465,361.522363 1304.64017,361.650123 1303.69396,360.86152 C1302.74776,360.072918 1302.62,358.666582 1303.40861,357.720381 Z M1292.10102,363.98459 C1293.34307,363.816886 1294.55546,363.520625 1295.72196,363.102258 C1296.88138,362.686427 1298.15838,363.289231 1298.57422,364.448659 C1298.99005,365.608088 1298.38724,366.885088 1297.22781,367.30092 C1295.76746,367.824679 1294.25043,368.195385 1292.69787,368.405013 C1291.4772,368.569829 1290.35405,367.713893 1290.18923,366.493227 C1290.02442,365.272561 1290.88035,364.149406 1292.10102,363.98459 Z M1281.08127,361.929904 C1281.51399,362.169108 1281.94775,362.386233 1282.3836,362.581237 C1283.50794,363.084275 1284.01161,364.403527 1283.50857,365.527868 C1283.00553,366.652209 1281.68628,367.155874 1280.56194,366.652835 C1280.0099,366.405852 1279.46411,366.132645 1278.92328,365.833679 C1277.84529,365.237767 1277.45448,363.880795 1278.05039,362.802797 C1278.6463,361.7248 1280.00327,361.333992 1281.08127,361.929904 Z M1264.10778,338.719625 L1269.32528,346.853313 L1277.45896,341.635817 C1278.49573,340.970763 1279.87534,341.272098 1280.54039,342.308868 C1281.20544,343.345639 1280.90411,344.72524 1279.86734,345.390295 L1269.85641,351.811978 C1268.81964,352.477032 1267.44004,352.175697 1266.77499,351.138927 L1260.3533,341.128 C1259.68825,340.091229 1259.98958,338.711628 1261.02635,338.046573 C1262.06312,337.381519 1263.44273,337.682854 1264.10778,338.719625 Z"
                          id="Repeat-Copy"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </a>
                <a
                  class="file__btn rotate tooltip--top tooltip"
                  :id="`right${file_obj.file.name}`"
                  @click="setRotationDegree(`id${index}`, index)"
                >
                  <svg
                    width="52px"
                    height="45px"
                    viewBox="0 0 52 45"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1129.000000, -324.000000)"
                        fill="#fff"
                        fill-rule="nonzero"
                      >
                        <path
                          d="M1137.59139,357.720381 C1138.38,358.666582 1138.25224,360.072918 1137.30604,360.86152 C1136.35983,361.650123 1134.9535,361.522363 1134.1649,360.576162 C1130.84854,356.597043 1129,351.58873 1129,346.302674 C1129,333.985016 1138.98502,324 1151.30267,324 C1163.61983,324 1173.60535,333.98526 1173.60535,346.302674 C1173.60535,347.534417 1172.60682,348.532942 1171.37508,348.532942 C1170.14334,348.532942 1169.14481,347.534417 1169.14481,346.302674 C1169.14481,336.448771 1161.15637,328.460535 1151.30267,328.460535 C1141.4485,328.460535 1133.46053,336.448501 1133.46053,346.302674 C1133.46053,350.535229 1134.93703,354.535554 1137.59139,357.720381 Z M1148.89898,363.98459 C1150.11965,364.149406 1150.97558,365.272561 1150.81077,366.493227 C1150.64595,367.713893 1149.5228,368.569829 1148.30213,368.405013 C1146.74957,368.195385 1145.23254,367.824679 1143.77219,367.30092 C1142.61276,366.885088 1142.00995,365.608088 1142.42578,364.448659 C1142.84162,363.289231 1144.11862,362.686427 1145.27804,363.102258 C1146.44454,363.520625 1147.65693,363.816886 1148.89898,363.98459 Z M1159.91873,361.929904 C1160.99673,361.333992 1162.3537,361.7248 1162.94961,362.802797 C1163.54552,363.880795 1163.15471,365.237767 1162.07672,365.833679 C1161.53589,366.132645 1160.9901,366.405852 1160.43806,366.652835 C1159.31372,367.155874 1157.99447,366.652209 1157.49143,365.527868 C1156.98839,364.403527 1157.49206,363.084275 1158.6164,362.581237 C1159.05225,362.386233 1159.48601,362.169108 1159.91873,361.929904 Z M1176.89222,338.719625 C1177.55727,337.682854 1178.93688,337.381519 1179.97365,338.046573 C1181.01042,338.711628 1181.31175,340.091229 1180.6467,341.128 L1174.22501,351.138927 C1173.55996,352.175697 1172.18036,352.477032 1171.14359,351.811978 L1161.13266,345.390295 C1160.09589,344.72524 1159.79456,343.345639 1160.45961,342.308868 C1161.12466,341.272098 1162.50427,340.970763 1163.54104,341.635817 L1171.67472,346.853313 L1176.89222,338.719625 Z"
                          id="Repeat"
                        ></path>
                      </g>
                    </g>
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

    <div v-show="file_objs.length > 0" v-if="page_load == 'default'">
      <div id="sidebar" class="tool__sidebar" style="overflow-y: auto">
        <h3>{{ $t("page_titles.rotate_page.rotatePdf") }}</h3>

        <div class="option__panel option__panel--active" id="merge-options">
          <div class="option__panel__content">
            <div class="info multiple">
              {{ $t("page_titles.rotate_page.info_a") }}
              <svg width="14" height="17" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m11.328 6.375 1.24-1.2A6.505 6.505 0 0 1 14 8.452h-1.775a4.904 4.904 0 0 0-.896-2.087l-.001.01Zm.896 3.778H14a6.552 6.552 0 0 1-1.424 3.288l-1.24-1.2a4.963 4.963 0 0 0 .888-2.088Zm-.888 4.497a7.118 7.118 0 0 1-3.427 1.36v-1.725a5.31 5.31 0 0 0 2.162-.871l1.266 1.226-.001.01ZM6.152 2.595V0l4 3.846-4 3.76V4.303c-2.496.406-4.394 2.485-4.394 4.995 0 2.51 1.898 4.6 4.394 4.995v1.708C2.68 15.585 0 12.745 0 9.298c0-3.447 2.68-6.29 6.152-6.703Z"
                  fill="#3A87AD"
                  fill-rule="evenodd"
                ></path>
              </svg>
              {{ $t("page_titles.rotate_page.info_b") }}
            </div>
          </div>
          <div class="rotate-action-panel">
            <div>
              <div class="form__group">
                <div class="option__title fileSelector">
                  {{ $t("page_titles.rotate_page.set_rotate") }}
                </div>
                <div class="float-right option" data-action="reset">
                  <a @click="reset_all">
                    {{ $t("page_titles.rotate_page.reset") }}
                  </a>
                </div>
              </div>
              <ul
                class="option__image fileSelector"
                v-if="this.file_objs.length > 1"
              >
                <li
                  class="option__image__item"
                  data-action="select"
                  data-value="all"
                  :class="{ 'option--active': optionSelect == 'all' }"
                  @click="() => (optionSelect = 'all')"
                >
                  <svg
                    width="47px"
                    height="32px"
                    viewBox="0 0 47 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1071.000000, -509.000000)"
                        fill="#969696"
                        fill-rule="nonzero"
                      >
                        <g transform="translate(1071.000000, 509.000000)">
                          <path
                            d="M3,3 L3,29 L21,29 L21,3 L3,3 Z M2,0 L22,0 C23.1045695,0 24,0.8954305 24,2 L24,30 C24,31.1045695 23.1045695,32 22,32 L2,32 C0.8954305,32 0,31.1045695 0,30 L0,2 C0,0.8954305 0.8954305,0 2,0 Z"
                            id="portrait"
                          ></path>
                          <path
                            d="M18,25 L44,25 L44,7 L18,7 L18,25 Z M15,26 L15,6 C15,4.8954305 15.8954305,4 17,4 L45,4 C46.1045695,4 47,4.8954305 47,6 L47,26 C47,27.1045695 46.1045695,28 45,28 L17,28 C15.8954305,28 15,27.1045695 15,26 Z"
                            id="landscape"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div class="option__image__item__title">
                    {{ $t("page_titles.rotate_page.all") }}
                  </div>
                </li>
                <li
                  class="option__image__item"
                  data-action="select"
                  data-value="portrait"
                  :class="{ 'option--active': optionSelect == 'portrait' }"
                  @click="() => (optionSelect = 'portrait')"
                >
                  <svg
                    width="24px"
                    height="32px"
                    viewBox="0 0 24 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1208.000000, -509.000000)"
                        fill="#fefefe"
                        fill-rule="nonzero"
                      >
                        <path
                          d="M1211,512 L1211,538 L1229,538 L1229,512 L1211,512 Z M1210,509 L1230,509 C1231.10457,509 1232,509.895431 1232,511 L1232,539 C1232,540.104569 1231.10457,541 1230,541 L1210,541 C1208.89543,541 1208,540.104569 1208,539 L1208,511 C1208,509.895431 1208.89543,509 1210,509 Z"
                          id="portrait"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <div class="option__image__item__title">
                    {{ $t("page_titles.rotate_page.portrait") }}
                  </div>
                </li>
                <li
                  class="option__image__item"
                  data-action="select"
                  data-value="landscape"
                  :class="{ 'option--active': optionSelect == 'landscape' }"
                  @click="() => (optionSelect = 'landscape')"
                >
                  <svg
                    width="32px"
                    height="24px"
                    viewBox="0 0 32 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        transform="translate(-1335.000000, -513.000000)"
                        fill="#fefefe"
                        fill-rule="nonzero"
                      >
                        <path
                          d="M1338,534 L1364,534 L1364,516 L1338,516 L1338,534 Z M1335,535 L1335,515 C1335,513.895431 1335.89543,513 1337,513 L1365,513 C1366.10457,513 1367,513.895431 1367,515 L1367,535 C1367,536.104569 1366.10457,537 1365,537 L1337,537 C1335.89543,537 1335,536.104569 1335,535 Z"
                          id="landscape"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <div class="option__image__item__title">
                    {{ $t("page_titles.rotate_page.landscape") }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="option__panel__content1">
            <div class="option__title">
              {{ $t("page_titles.rotate_page.rotation") }}
            </div>
            <div class="form__group">
              <div class="option__actions">
                <button
                  class="option__btn option--action"
                  data-action="rotateRight"
                  @click="rotate_right"
                >
                  <div class="option__btn__icon">
                    <i class="fa-solid fa-rotate-right"></i>
                  </div>
                  <span>{{ $t("page_titles.rotate_page.right") }}</span>
                </button>

                <button
                  class="option__btn option--action"
                  data-action="rotateLeft"
                  @click="rotate_left"
                >
                  <div class="option__btn__icon">
                    <i class="fa-solid fa-rotate-left"></i>
                  </div>
                  <span>{{ $t("page_titles.rotate_page.left") }}</span>
                </button>
              </div>
            </div>
          </div>
          <button class="option__panel__title" @click="rotatePdfs">
            {{ $t("page_titles.rotate_page.actionBtn") }}
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
import getPageType from "@/pdf_pages/services/getPagetype";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import faq from "@/components/Faq.vue";
import FeatureTitle from "./components/FeatureTitle.vue";
import { online_names } from "../services/online_name";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import JSZip from "jszip";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";

export default {
  components: {
    PdfViewer,
    VueDropboxPicker,
    draggable,
    faq,
    FeatureTitle,
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
      sorted: false,
      optionSelect: null,
      online_names: online_names,
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
      faqItems: [
        {
          q: "In what order will my merged PDF files appear?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: "true",
        },
        {
          q: "How many pages can I include in a merged PDF?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: "false",
        },
        {
          q: "Can I delete and reorder pages after I merge files?",
          a: "Once you add the files you'd like to combine, you can drag and drop them into your preferred order. The top file in your list will appear first in the merged PDF file.",
          active: "false",
        },
      ],
      origin_file_objs: [],
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
    //rotate left
    setRotationLeftDegree(tagId, index) {
      const computedStyle = window.getComputedStyle(
        document.getElementById(tagId)
      );
      const transformValue = computedStyle.getPropertyValue("transform");

      // Extract rotation degree from the transform value
      const matrix = new DOMMatrixReadOnly(transformValue);
      let rotation = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI) - 90;
      if (rotation < 0) rotation = rotation + 360;
      document.getElementById(tagId).style.transform = `rotate(${rotation}deg)`;
      let type =
        this.file_objs[index].type == "landscape" ? "portrait" : "landscape";

      //save rotation
      this.file_objs[index] = {
        file: this.file_objs[index]["file"],
        degree: rotation,
        type: type,
      };
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
      let type =
        this.file_objs[index].type == "landscape" ? "portrait" : "landscape";

      //save rotation
      this.file_objs[index] = {
        file: this.file_objs[index]["file"],
        degree: rotation,
        type: type,
      };
    },

    //download from dropbox
    async onPickedDropbox(data) {
      for (let i = 0; i < data.length; i++) {
        let type = await getPageType(data[i]);
        let pageNum = await getPageNumber(data[i]);
        this.file_objs.push({
          file: data[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
        this.origin_file_objs.push({
          file: data[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
      }
      console.log(this.file_objs);
    },
    async onPickedGoogleDriver(data) {
      for (let i = 0; i < data.length; i++) {
        let type = await getPageType(data[i]);
        let pageNum = await getPageNumber(data[i]);
        this.file_objs.push({
          file: data[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
        this.origin_file_objs.push({
          file: data[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
      }
      console.log(this.file_objs);
    },
    async onChange() {
      const data = this.$refs.file.files;
      var add_objs = [],
        i = 0;
      for (i = 0; i < data.length; i++) {
        let type = await getPageType(data[i]);
        let pageNum = await getPageNumber(data[i]);
        add_objs.push({ file: data[i], degree: 0, type: type, page: pageNum });
      }

      this.file_objs = [...this.file_objs, ...add_objs];
      this.origin_file_objs = [...this.origin_file_objs, ...add_objs];
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
    reset_all() {
      console.log(this.reset_all);
      this.optionSelect = null;
      this.file_objs = [];

      // Using a promise with $nextTick
      this.$nextTick().then(() => {
        // Now, the DOM has been updated, and you can safely execute the next statement
        this.file_objs = [...this.origin_file_objs];
      });
    },
    rotate_right() {
      if (this.file_objs.length == 1) {
        let element = document.getElementById(
          `right${this.file_objs[0].file.name}`
        );
        element.click();
      } else {
        switch (this.optionSelect) {
          case "all":
            for (let i = 0; i < this.file_objs.length; i++) {
              let element = document.getElementById(
                `right${this.file_objs[i].file.name}`
              );
              element.click();
            }
            break;
          case "portrait":
            const PortraitArray = this.file_objs.filter((item) => {
              return item.type == "portrait";
            });
            console.log(PortraitArray);
            for (let i = 0; i < PortraitArray.length; i++) {
              let element = document.getElementById(
                `right${PortraitArray[i].file.name}`
              );
              element.click();
            }
            break;
          case "landscape":
            const filterArray = this.file_objs.filter((item) => {
              return item.type == "landscape";
            });
            console.log(filterArray);
            for (let i = 0; i < filterArray.length; i++) {
              let element = document.getElementById(
                `right${filterArray[i].file.name}`
              );
              element.click();
            }
            break;

          default:
            break;
        }
      }
    },
    rotate_left() {
      if (this.file_objs.length == 1) {
        let element = document.getElementById(
          `left${this.file_objs[0].file.name}`
        );
        element.click();
      } else {
        switch (this.optionSelect) {
          case "all":
            for (let i = 0; i < this.file_objs.length; i++) {
              let element = document.getElementById(
                `left${this.file_objs[i].file.name}`
              );
              element.click();
            }
            break;
          case "portrait":
            const PortraitArray = this.file_objs.filter((item) => {
              return item.type == "portrait";
            });
            for (let i = 0; i < PortraitArray.length; i++) {
              let element = document.getElementById(
                `left${PortraitArray[i].file.name}`
              );
              element.click();
            }
            break;
          case "landscape":
            const filterArray = this.file_objs.filter((item) => {
              return item.type == "landscape";
            });
            for (let i = 0; i < filterArray.length; i++) {
              let element = document.getElementById(
                `left${filterArray[i].file.name}`
              );
              element.click();
            }
            break;
          default:
            break;
        }
      }
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

    //rotatePdfs
    async rotatePdfs() {
      this.page_load = "processing";

      const results = [];
      for (let i = 0; i < this.file_objs.length; i++) {
        const rotatedPdf = await PDFDocument.create();
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
        const copiedPages = await rotatedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        if (this.file_objs[i]["degree"] != 0) {
          copiedPages.forEach((page) => {
            page.setRotation(degrees(this.file_objs[i]["degree"]));
            rotatedPdf.addPage(page);
          });
        } else {
          copiedPages.forEach((page) => rotatedPdf.addPage(page));
        }
        const rotatedPdfFile = await rotatedPdf.save();
        results.push(rotatedPdfFile);
      }

      console.log(results);
      results.length == 1 ? this.uploadPdf(results) : this.generateZip(results);
    },
    uploadPdf(pdfFile) {
      const formData = new FormData();
      const blob = new Blob(pdfFile, { type: "application/pdf" });

      this.page_load = "uploading";
      this.file_name =
        this.file_objs[0].file.name.split(".")[0] + "_rotate.pdf";
      formData.append("pdf", blob);

      this.$axios
        .post("/pdf/pdf_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.progress = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.size = progressEvent.total;
          }.bind(this),
        })
        .then((response) => {
          const obj = {
            id: response.data,
            button_title: "Successfully Rotated",
            dis_text: "PDF has been Rotated!",
            down_name:
              this.file_objs[0].file.name.split(".")[0] + "_rotate.pdf",
            file_type: "application/pdf",
            before: "rotatepdf",
          };
          // Your secret message
          const message = JSON.stringify(obj);

          // Your secret key (should be kept private)
          const secretKey = "mySecretKey123";

          // Encrypt the message using AES encryption with the secret key
          const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
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
        .catch((e) => {
          this.page_load = "default";
        });
    },

    //create Zip file for download
    async generateZip(pdfFiles) {
      const zip = new JSZip();

      const promises = pdfFiles.map(async (data, i) => {
        // Add the PDF file to the ZIP
        zip.file(
          this.file_objs[i].file.name.split(".")[0] + "_rotate.pdf",
          data
        );
      });

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          //save on vuex

          //upload zip file to server
          const formData = new FormData();
          const blob = new Blob([content], { type: "application/zip" });

          formData.append("file", blob);
          this.page_load = "uploading";
          this.file_name = "pdfden_rotated.zip";

          this.$axios
            .post("/pdf/zip_upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function (progressEvent) {
                this.progress = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
                this.size = progressEvent.total;
              }.bind(this),
            })
            .then((response) => {
              const obj = {
                id: response.data,
                button_title: "Successfully Rotated",
                dis_text: "PDF has been rotated!",
                down_name: "rotated_pdf.zip",
                file_type: "application/zip",
                before: "rotatepdf",
              };
              // Your secret message
              const message = JSON.stringify(obj);

              // Your secret key (should be kept private)
              const secretKey = "mySecretKey123";

              // Encrypt the message using AES encryption with the secret key
              const encrypted = CryptoJS.AES.encrypt(
                message,
                secretKey
              ).toString();

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
            .catch((e) => {
              this.page_load = "default";
              this.$swal(
                "Server Error!",
                "Please check your Network.",
                "Warning"
              );
            });
        });
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
.option__image {
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  margin-left: -10px;
  margin-right: 10px;
  font-size: 15px;
}
ul {
  list-style: none;
}
.form__group {
  font-size: 20px;
  margin-left: 10px;
  margin-bottom: 20px;
  display: flex;
}
.option__btn {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  width: 240px;
  margin: 8px auto;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 8px;
  -webkit-box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.14);
  letter-spacing: 0.3px;
  text-align: center;
  line-height: 18px;
  color: #161616;
  padding: 0;
  overflow: hidden;
  background: #f5f5fa;
  border-width: 0;
}
.option__btn:hover {
  border: solid 1px #e76d26;
  color: red;
}
.option__btn span {
  margin-left: 20px;
}
.option__actions {
  margin: auto;
}
.option__btn__icon {
  padding: 12px;
  width: 55px;
  -ms-flex: 0 0 55px;
  -webkit-box-flex: 0;
  flex: 0 0 55px;
  height: 100%;
  min-height: 45px;
  background: #ff7c03;
  color: white;
  font-size: 20px;
}
.float-right {
  margin-left: 70px;
  color: red;
  cursor: pointer;
}
.option {
  -webkit-transition: all 0.4s linear;
  -o-transition: all 0.4s linear;
  transition: all 0.4s linear;
}
.option__title {
  font-weight: 500;
  color: #33333b;
  margin: 0px 0 24px 7px;
  text-align: left;
  /* margin-left: 10px; */
  font-size: 20px;
}
.option__image__item {
  padding: 18px 20px;
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 30%;
  text-align: center;
  color: #85858e;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 4px;
  background: #f5f5fa;
  border-radius: 8px;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: none;
  -o-transition: none;
  transition: none;
  border: 2px solid rgba(0, 0, 0, 0);
}
.option__image__item svg {
  margin: auto;
  margin-bottom: 20px;
}
.option__image__item.option--active {
  color: #ff7c03;
  border: 2px solid #ff7c03;
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
  padding-left: 20px;
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
  min-width: 400px;
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
  font-size: 15px;
  margin-bottom: 30px;
  text-align: center;
  max-width: 370px;
  margin-left: auto;
  margin-right: auto;
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
  margin-top: 250px;
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

.security-area .md-layout {
  width: 80%;
  margin: auto;
}
.md-layout {
  margin-right: 80px;
  max-height: 95vh;
  overflow-y: auto;
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
