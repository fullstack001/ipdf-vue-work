<template>
  <div
    class="main"
    :style="
      file_objs.length
        ? 'display: flex'
        : 'display: inline-block;  width: 100%;'
    "
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
      :title="$t('page_titles.rotate_page.title')"
      :description="$t('page_titles.rotate_page.description')"
      :featureImgUrl="svgUrl"
    />

    <div
      class="rotate-files-list"
      style="position: relative"
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
      <div class="add-more" v-show="file_objs.length">
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
      <div
        class="responsive-setting"
        @click="show_sidebar = !show_sidebar"
        :style="show_sidebar ? 'left:20px' : 'right:20px'"
        v-if="page_load == 'default' && file_objs.length"
      >
        <i class="fa-solid fa-gear"></i>
      </div>
    </div>
    <div
      class="rotate_tool_sidebar"
      style="overflow-y: auto"
      v-if="page_load == 'default' && file_objs.length"
    >
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
                      fill="#969696"
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
                      fill="#969696"
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
        <button class="rotate_btn" @click="rotatePdfs">
          {{ $t("page_titles.rotate_page.actionBtn") }}
        </button>
      </div>
    </div>
    <button
      class="rotate_responsive_btn"
      @click="rotatePdfs"
      v-if="page_load == 'default' && file_objs.length"
    >
      {{ $t("page_titles.rotate_page.actionBtn") }}
    </button>
    <div
      class="rotate_responsive__sidebar"
      v-if="page_load == 'default' && file_objs.length"
      v-show="show_sidebar"
    >
      <h3>{{ $t("page_titles.rotate_page.rotatePdf") }}</h3>

      <div class="option__panel option__panel--active">
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
                      fill="#969696"
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
                      fill="#969696"
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
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, degrees } from "pdf-lib";
import PdfViewer from "@/components/PdfViewer.vue";
import draggable from "vuedraggable";
import generateURL from "@/pdf_pages/services/generateURL";
import getPageType from "@/pdf_pages/services/getPagetype";
import getPageNumber from "@/pdf_pages/services/getPageNumber";
import { online_names } from "../services/online_name";
import AddMoreDropDown from "./components/AddMoreDropDown.vue";
import JSZip from "jszip";
import Processing from "./components/Processing.vue";
import Uploading from "./components/Uploading.vue";
import { fileHandlingMixin } from "@/globalMixin.js";
import SvgImage from "@/assets/feature_img/rotate_pdf.svg";
import SelectFileComponent from "./components/SelectFileComponent.vue";

export default {
  metaInfo: {
    title: "Rotate PDF – Rotate PDF Pages for Free | Online PDF Rotator ",
    meta: [
      {
        name: "Keywords",
        content:
          "Rotate PDF, rotate PDF pages, online PDF rotation, adjust PDF orientation, rotate PDF online, PDF page rotation",
      },
      {
        name: "description",
        content:
          "Rotate PDF pages effortlessly with our PDF rotator. This online PDF rotation tool provides a quick and easy way to adjust the orientation of pages in your PDF files.",
      },
      {
        property: "og:description",
        content:
          "Rotate PDF pages effortlessly with our PDF rotator. This online PDF rotation tool provides a quick and easy way to adjust the orientation of pages in your PDF files.",
      },
      {
        property: "og:title",
        content: "Rotate PDF – Rotate PDF Pages for Free | Online PDF Rotator",
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
      sorted: false,
      optionSelect: null,
      online_names: online_names,
      page_load: "default",
      progress: 0,
      size: 0,
      file_name: "",
      svgUrl: SvgImage,
      show_sidebar: false,
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
    async handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        let type = await getPageType(files[i]);
        let pageNum = await getPageNumber(files[i]);
        this.file_objs.push({
          file: files[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
        this.origin_file_objs.push({
          file: files[i],
          degree: 0,
          type: type,
          page: pageNum,
        });
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
.rotate-files-list {
  width: 80%;
  text-align: center;
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
  display: block;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 6px;
  background: #f5f5fa;
  border-radius: 8px;
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

.rotate_tool_sidebar,
.rotate_responsive__sidebar {
  display: block;
  padding: 0 0 120px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  height: 100vh;
  background-color: #fff;
  text-align: center;
}

h3 {
  margin: 20px auto;
  font-weight: 600;
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

.rotate_btn,
.rotate_responsive_btn {
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
  margin-top: 150px;
}
.rotate_responsive_btn,
.rotate_responsive__sidebar {
  display: none;
}
.tools__item {
  background: #fff;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: calc(25% - 30px);
  border: 1px solid #f5f5fa;
  margin: 15px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 4px;
}

.prew_title {
  word-wrap: break-word;
}
.badge-container {
  position: relative;
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
.responsive-setting {
  display: none;
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
  .rotate-files-list {
    width: 100%;
    padding-left: 17%;
    min-height: 80vh;
  }
  .rotate_tool_sidebar {
    display: none;
  }
  .rotate_responsive__sidebar {
    display: block;
    position: absolute;
    z-index: 999;
    width: 85% !important;
    height: 550px;
    right: 0px;
    top: 65px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    box-shadow: 0px 2px 0px 2px #ccc1da;
  }
  .responsive-setting {
    display: block;
    position: absolute;
    font-size: 26px;
    background-color: #fff;
    color: #ff7c03;
    border-radius: 50%;
    padding: 6px;
    top: 30px;
  }
  .add-more {
    top: 60px;
  }
  .rotate_responsive_btn {
    display: block;
    position: absolute;
    top: 60vh;
    right: 10px;
  }
}
</style>
