<template>
  <div class="edit-pdf-content row">
    <div id="sidebar" class="tool__sidebar col-md-2">
      <PdfPreviewList :url="pdfUrl" />
    </div>
    <div class="col-md-7 sign_right">
      <div class="toolbar"></div>
      <div
        id="pdf-container-annotate"
        ref="scrollableDiv"
        @mouseover="get_objects"
      ></div>
    </div>
    <div class="sign_tool col-md-3">
      <div class="toolbar"></div>
      <h3 class="mt-3 mb-5">{{ $t("page_titles.sign_page.sign_options") }}</h3>
      <div class="furniture" v-show="sign_obj">
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1034.000000, -523.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g transform="translate(1034.000000, 523.000000)">
                    <g transform="translate(1.000000, 0.000000)">
                      <path
                        d="M14.67,-5.68434189e-14 C16.2124997,-5.68434189e-14 17.3339599,0.789694841 18.1597802,2.20228232 C18.2504115,2.35730942 18.1920489,2.55664723 18.0321179,2.63831415 L17.2096179,3.05831415 C17.0588599,3.13529691 16.8742157,3.07824776 16.7931576,2.92964129 C16.2924861,2.01174355 15.5689136,1.5175 14.67,1.5175 C12.8839926,1.5175 11.64,3.47234552 11.64,6.35 C11.64,9.216486 12.8881139,11.1825 14.67,11.1825 C15.5829753,11.1825 16.3177904,10.6154145 16.8035776,9.60914092 C16.8793484,9.4521871 17.0688678,9.3875483 17.2247542,9.4654915 L18.0647542,9.8854915 C18.2215266,9.9638777 18.2831822,10.1558499 18.2013702,10.3108621 C17.3881718,11.8516591 16.2601581,12.7 14.67,12.7 C11.8532818,12.7 10,10.057059 10,6.35 C10,2.63168801 11.8491494,-5.68434189e-14 14.67,-5.68434189e-14 Z"
                        id="AC"
                      ></path>
                      <path
                        d="M4.9852063,0.1925 C5.09549393,0.1925 5.19535805,0.250315736 5.25125803,0.341024173 L5.28441566,0.414833459 L8.80191566,12.0873335 C8.85480571,12.2628442 8.74644946,12.4395027 8.57818972,12.480925 L8.5027063,12.49 L7.4527063,12.49 C7.34153052,12.49 7.24104067,12.4312663 7.18541677,12.3394525 L7.15264527,12.2647905 L6.37816076,9.6025 L2.45475183,9.6025 L1.68026733,12.2647905 C1.64921265,12.3715409 1.56474702,12.4516248 1.46105045,12.4793883 L1.3802063,12.49 L0.312706297,12.49 C0.129399486,12.49 -0.00848137218,12.3352804 0.000406527772,12.162225 L0.0134969301,12.0873335 L3.53099693,0.414833459 C3.56281854,0.309236362 3.64698946,0.230301206 3.74996905,0.202951028 L3.8302063,0.1925 L4.9852063,0.1925 Z M4.4077063,2.75743368 L2.84700218,8.1025 L5.96841042,8.1025 L4.4077063,2.75743368 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                    <path
                      d="M1.07142857,20 L18.9285714,20 C19.5203051,20 20,19.4403559 20,18.75 C20,18.0596441 19.5203051,17.5 18.9285714,17.5 L1.07142857,17.5 C0.479694911,17.5 0,18.0596441 0,18.75 C0,19.4403559 0.479694911,20 1.07142857,20 Z"
                      id="Line-6"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_text">Signautres</div>
          <div class="sign_draggable_prev">
            <img :src="sign_obj && sign_obj.sign" class="my-2 add_item" />
          </div>

          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="sign_num > 0">
                {{ sign_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.996689 15.2858C0.673841 15.0636 0.5 14.718 0.5 14.3231C0.5 14.175 0.524834 14.0022 0.649007 13.8788L2.78477 7.53497C2.95861 7.06597 3.35596 6.54761 3.77815 6.27608L6.78311 4.35072C7.40397 3.95577 8.27318 4.02983 8.7947 4.54819L11.601 7.3375C11.899 7.63371 12.048 8.07802 12.048 8.49765C12.048 8.79386 11.9487 9.11475 11.7748 9.36159L9.81291 12.3484C9.53973 12.768 9.01821 13.1629 8.54636 13.311L2.16391 15.4339C1.74172 15.5573 1.31954 15.5079 0.996689 15.2858ZM8.17384 12.3484L2.50785 14.2329L6.26804 10.4955C6.81331 10.7405 7.48691 10.6423 7.95033 10.2009C8.52152 9.63312 8.52152 8.69512 7.95033 8.1027C7.37914 7.53497 6.43543 7.53497 5.8394 8.1027C5.3626 8.55687 5.26723 9.24799 5.55327 9.80959L1.69772 13.6418L3.65397 7.83118C3.75331 7.58434 4.00166 7.23876 4.22517 7.09066L7.25497 5.14061C7.47848 4.99251 7.85099 5.01719 8.02483 5.21466L10.8311 8.02865C10.9553 8.15207 10.9801 8.32486 10.9801 8.47296C10.9801 8.59639 10.9553 8.71981 10.8808 8.79386L8.91887 11.7806C8.76987 12.0028 8.42219 12.2743 8.17384 12.3484ZM6.53477 8.81854C6.33609 9.01602 6.33609 9.31222 6.53477 9.5097C6.73344 9.68249 7.03146 9.68249 7.23013 9.5097C7.42881 9.31222 7.42881 9.01602 7.23013 8.81854C7.03146 8.62107 6.73344 8.62107 6.53477 8.81854Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16722 3.93109C8.89404 3.63488 8.67053 3.26462 8.67053 2.86967C8.67053 2.47473 8.74503 2.07978 8.99338 1.80826L9.86258 0.944315C10.1606 0.648106 10.6076 0.5 11.005 0.5C11.4023 0.5 11.8742 0.67279 12.1473 0.944315L15.1275 3.90641C15.4255 4.20262 15.5 4.57288 15.5 4.96782C15.5 5.36277 15.2765 5.75771 15.0033 6.02924L14.1341 6.89318C13.8609 7.18939 13.5381 7.3375 13.1407 7.3375C12.7434 7.3375 12.4205 7.16471 12.1474 6.89318L9.16722 3.93109ZM9.66256 2.80729C9.66324 2.82853 9.66391 2.84944 9.66391 2.86967C9.66391 2.99309 9.78808 3.11652 9.88742 3.19057L12.8675 6.15266C13.0414 6.35013 13.2401 6.35013 13.4387 6.15266L14.3079 5.28872C14.4073 5.21466 14.5315 5.06656 14.5315 4.94314C14.5315 4.92248 14.5322 4.90182 14.5328 4.88127C14.5363 4.77911 14.5396 4.67975 14.457 4.59756L11.4768 1.63547C11.2781 1.438 10.8063 1.438 10.6076 1.63547L9.73841 2.49941C9.65536 2.58196 9.6591 2.69901 9.66256 2.80729Z"
                fill="white"
              ></path>
            </svg>
          </div>
          <div class="sign_draggable_text">Initials</div>
          <div class="sign_draggable_prev">
            <img class="my-2 add_item" :src="sign_obj && sign_obj.init" />
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="init_num > 0">
                {{ init_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.996689 15.2858C0.673841 15.0636 0.5 14.718 0.5 14.3231C0.5 14.175 0.524834 14.0022 0.649007 13.8788L2.78477 7.53497C2.95861 7.06597 3.35596 6.54761 3.77815 6.27608L6.78311 4.35072C7.40397 3.95577 8.27318 4.02983 8.7947 4.54819L11.601 7.3375C11.899 7.63371 12.048 8.07802 12.048 8.49765C12.048 8.79386 11.9487 9.11475 11.7748 9.36159L9.81291 12.3484C9.53973 12.768 9.01821 13.1629 8.54636 13.311L2.16391 15.4339C1.74172 15.5573 1.31954 15.5079 0.996689 15.2858ZM8.17384 12.3484L2.50785 14.2329L6.26804 10.4955C6.81331 10.7405 7.48691 10.6423 7.95033 10.2009C8.52152 9.63312 8.52152 8.69512 7.95033 8.1027C7.37914 7.53497 6.43543 7.53497 5.8394 8.1027C5.3626 8.55687 5.26723 9.24799 5.55327 9.80959L1.69772 13.6418L3.65397 7.83118C3.75331 7.58434 4.00166 7.23876 4.22517 7.09066L7.25497 5.14061C7.47848 4.99251 7.85099 5.01719 8.02483 5.21466L10.8311 8.02865C10.9553 8.15207 10.9801 8.32486 10.9801 8.47296C10.9801 8.59639 10.9553 8.71981 10.8808 8.79386L8.91887 11.7806C8.76987 12.0028 8.42219 12.2743 8.17384 12.3484ZM6.53477 8.81854C6.33609 9.01602 6.33609 9.31222 6.53477 9.5097C6.73344 9.68249 7.03146 9.68249 7.23013 9.5097C7.42881 9.31222 7.42881 9.01602 7.23013 8.81854C7.03146 8.62107 6.73344 8.62107 6.53477 8.81854Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16722 3.93109C8.89404 3.63488 8.67053 3.26462 8.67053 2.86967C8.67053 2.47473 8.74503 2.07978 8.99338 1.80826L9.86258 0.944315C10.1606 0.648106 10.6076 0.5 11.005 0.5C11.4023 0.5 11.8742 0.67279 12.1473 0.944315L15.1275 3.90641C15.4255 4.20262 15.5 4.57288 15.5 4.96782C15.5 5.36277 15.2765 5.75771 15.0033 6.02924L14.1341 6.89318C13.8609 7.18939 13.5381 7.3375 13.1407 7.3375C12.7434 7.3375 12.4205 7.16471 12.1474 6.89318L9.16722 3.93109ZM9.66256 2.80729C9.66324 2.82853 9.66391 2.84944 9.66391 2.86967C9.66391 2.99309 9.78808 3.11652 9.88742 3.19057L12.8675 6.15266C13.0414 6.35013 13.2401 6.35013 13.4387 6.15266L14.3079 5.28872C14.4073 5.21466 14.5315 5.06656 14.5315 4.94314C14.5315 4.92248 14.5322 4.90182 14.5328 4.88127C14.5363 4.77911 14.5396 4.67975 14.457 4.59756L11.4768 1.63547C11.2781 1.438 10.8063 1.438 10.6076 1.63547L9.73841 2.49941C9.65536 2.58196 9.6591 2.69901 9.66256 2.80729Z"
                fill="white"
              ></path>
            </svg>
          </div>
          <div
            class="sign_draggable_prev"
            @mouseover="show_img = 'name'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="sign_obj && sign_obj.name"
              v-bind:style="
                show_img == 'name' ? 'display: block;' : 'display: none;'
              "
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'name' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.name") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="name_num > 0">
                {{ name_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.996689 15.2858C0.673841 15.0636 0.5 14.718 0.5 14.3231C0.5 14.175 0.524834 14.0022 0.649007 13.8788L2.78477 7.53497C2.95861 7.06597 3.35596 6.54761 3.77815 6.27608L6.78311 4.35072C7.40397 3.95577 8.27318 4.02983 8.7947 4.54819L11.601 7.3375C11.899 7.63371 12.048 8.07802 12.048 8.49765C12.048 8.79386 11.9487 9.11475 11.7748 9.36159L9.81291 12.3484C9.53973 12.768 9.01821 13.1629 8.54636 13.311L2.16391 15.4339C1.74172 15.5573 1.31954 15.5079 0.996689 15.2858ZM8.17384 12.3484L2.50785 14.2329L6.26804 10.4955C6.81331 10.7405 7.48691 10.6423 7.95033 10.2009C8.52152 9.63312 8.52152 8.69512 7.95033 8.1027C7.37914 7.53497 6.43543 7.53497 5.8394 8.1027C5.3626 8.55687 5.26723 9.24799 5.55327 9.80959L1.69772 13.6418L3.65397 7.83118C3.75331 7.58434 4.00166 7.23876 4.22517 7.09066L7.25497 5.14061C7.47848 4.99251 7.85099 5.01719 8.02483 5.21466L10.8311 8.02865C10.9553 8.15207 10.9801 8.32486 10.9801 8.47296C10.9801 8.59639 10.9553 8.71981 10.8808 8.79386L8.91887 11.7806C8.76987 12.0028 8.42219 12.2743 8.17384 12.3484ZM6.53477 8.81854C6.33609 9.01602 6.33609 9.31222 6.53477 9.5097C6.73344 9.68249 7.03146 9.68249 7.23013 9.5097C7.42881 9.31222 7.42881 9.01602 7.23013 8.81854C7.03146 8.62107 6.73344 8.62107 6.53477 8.81854Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16722 3.93109C8.89404 3.63488 8.67053 3.26462 8.67053 2.86967C8.67053 2.47473 8.74503 2.07978 8.99338 1.80826L9.86258 0.944315C10.1606 0.648106 10.6076 0.5 11.005 0.5C11.4023 0.5 11.8742 0.67279 12.1473 0.944315L15.1275 3.90641C15.4255 4.20262 15.5 4.57288 15.5 4.96782C15.5 5.36277 15.2765 5.75771 15.0033 6.02924L14.1341 6.89318C13.8609 7.18939 13.5381 7.3375 13.1407 7.3375C12.7434 7.3375 12.4205 7.16471 12.1474 6.89318L9.16722 3.93109ZM9.66256 2.80729C9.66324 2.82853 9.66391 2.84944 9.66391 2.86967C9.66391 2.99309 9.78808 3.11652 9.88742 3.19057L12.8675 6.15266C13.0414 6.35013 13.2401 6.35013 13.4387 6.15266L14.3079 5.28872C14.4073 5.21466 14.5315 5.06656 14.5315 4.94314C14.5315 4.92248 14.5322 4.90182 14.5328 4.88127C14.5363 4.77911 14.5396 4.67975 14.457 4.59756L11.4768 1.63547C11.2781 1.438 10.8063 1.438 10.6076 1.63547L9.73841 2.49941C9.65536 2.58196 9.6591 2.69901 9.66256 2.80729Z"
                fill="white"
              ></path>
            </svg>
          </div>
          <div
            class="sign_draggable_prev"
            @mouseover="show_img = 'date'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="date_img"
              v-bind:style="
                show_img == 'date' ? 'display: block;' : 'display: none;'
              "
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'date' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.date") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="dateModalValidate = true"></i>
              <div class="sign_counters" v-if="date_num > 0">
                {{ date_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.996689 15.2858C0.673841 15.0636 0.5 14.718 0.5 14.3231C0.5 14.175 0.524834 14.0022 0.649007 13.8788L2.78477 7.53497C2.95861 7.06597 3.35596 6.54761 3.77815 6.27608L6.78311 4.35072C7.40397 3.95577 8.27318 4.02983 8.7947 4.54819L11.601 7.3375C11.899 7.63371 12.048 8.07802 12.048 8.49765C12.048 8.79386 11.9487 9.11475 11.7748 9.36159L9.81291 12.3484C9.53973 12.768 9.01821 13.1629 8.54636 13.311L2.16391 15.4339C1.74172 15.5573 1.31954 15.5079 0.996689 15.2858ZM8.17384 12.3484L2.50785 14.2329L6.26804 10.4955C6.81331 10.7405 7.48691 10.6423 7.95033 10.2009C8.52152 9.63312 8.52152 8.69512 7.95033 8.1027C7.37914 7.53497 6.43543 7.53497 5.8394 8.1027C5.3626 8.55687 5.26723 9.24799 5.55327 9.80959L1.69772 13.6418L3.65397 7.83118C3.75331 7.58434 4.00166 7.23876 4.22517 7.09066L7.25497 5.14061C7.47848 4.99251 7.85099 5.01719 8.02483 5.21466L10.8311 8.02865C10.9553 8.15207 10.9801 8.32486 10.9801 8.47296C10.9801 8.59639 10.9553 8.71981 10.8808 8.79386L8.91887 11.7806C8.76987 12.0028 8.42219 12.2743 8.17384 12.3484ZM6.53477 8.81854C6.33609 9.01602 6.33609 9.31222 6.53477 9.5097C6.73344 9.68249 7.03146 9.68249 7.23013 9.5097C7.42881 9.31222 7.42881 9.01602 7.23013 8.81854C7.03146 8.62107 6.73344 8.62107 6.53477 8.81854Z"
                fill="white"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16722 3.93109C8.89404 3.63488 8.67053 3.26462 8.67053 2.86967C8.67053 2.47473 8.74503 2.07978 8.99338 1.80826L9.86258 0.944315C10.1606 0.648106 10.6076 0.5 11.005 0.5C11.4023 0.5 11.8742 0.67279 12.1473 0.944315L15.1275 3.90641C15.4255 4.20262 15.5 4.57288 15.5 4.96782C15.5 5.36277 15.2765 5.75771 15.0033 6.02924L14.1341 6.89318C13.8609 7.18939 13.5381 7.3375 13.1407 7.3375C12.7434 7.3375 12.4205 7.16471 12.1474 6.89318L9.16722 3.93109ZM9.66256 2.80729C9.66324 2.82853 9.66391 2.84944 9.66391 2.86967C9.66391 2.99309 9.78808 3.11652 9.88742 3.19057L12.8675 6.15266C13.0414 6.35013 13.2401 6.35013 13.4387 6.15266L14.3079 5.28872C14.4073 5.21466 14.5315 5.06656 14.5315 4.94314C14.5315 4.92248 14.5322 4.90182 14.5328 4.88127C14.5363 4.77911 14.5396 4.67975 14.457 4.59756L11.4768 1.63547C11.2781 1.438 10.8063 1.438 10.6076 1.63547L9.73841 2.49941C9.65536 2.58196 9.6591 2.69901 9.66256 2.80729Z"
                fill="white"
              ></path>
            </svg>
          </div>
          <div
            class="sign_draggable_prev"
            @mouseover="show_img = 'text'"
            @mouseleave="show_img = null"
          >
            <img
              class="my-2 add_item"
              :src="text_img"
              v-bind:style="
                show_img == 'text' ? 'display: block;' : 'display: none;'
              "
            />
            <span
              class="mt-3 mb-3 fs-4 add_item"
              v-bind:style="
                show_img == 'text' ? 'display: none;' : 'display: block; '
              "
              >{{ $t("page_titles.sign_page.text") }}</span
            >
          </div>
          <div class="sign_draggable_actions">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="textModalValidate = true"></i>
              <div class="sign_counters" v-if="text_num > 0">
                {{ text_num }}
              </div>
            </div>
          </div>
        </div>
        <div class="sign_item p-1" draggable="true">
          <div class="sign_draggable_drag">
            <svg
              width="10px"
              height="18px"
              viewBox="0 0 10 18"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-1001.000000, -476.000000)"
                  fill="#161616"
                >
                  <g transform="translate(1001.000000, 476.000000)">
                    <ellipse
                      cx="1.2"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="1.2"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="1.25714286"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="8.8"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                    <ellipse
                      cx="8.4"
                      cy="16.3428571"
                      rx="1.2"
                      ry="1.25714286"
                    ></ellipse>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="sign_draggable_icon">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.622 10.343h-2.31v-.468c0-.586-.356-1.09-.86-1.3.176-1.065.456-2.063 1.36-3.671a3.319 3.319 0 0 0 .424-1.623c0-1.815-1.453-3.295-3.267-3.28-1.61.011-2.874 1.203-3.144 2.638-.167.888.015 1.779.514 2.509.684 1 1.013 2.238 1.208 3.427a1.409 1.409 0 0 0-.858 1.3v.468H2.378c-1.275 0-2.311 1.052-2.311 2.344v.97c0 .258.207.468.462.468H.99v.469c0 .775.622 1.406 1.387 1.406h9.244c.765 0 1.387-.63 1.387-1.406v-.47h.462c.255 0 .462-.209.462-.468v-.969c0-1.292-1.036-2.344-2.31-2.344ZM5.1 4.613a2.384 2.384 0 0 1-.366-1.798C4.92 1.813 5.827.923 7.03.936c1.267.015 2.28 1.067 2.28 2.345 0 .407-.104.807-.302 1.159-.965 1.717-1.275 2.804-1.476 4.028H6.467C6.244 7.113 5.88 5.755 5.1 4.614Zm3.288 5.262v.468H5.613v-.468c0-.259.208-.47.463-.47h1.848c.255 0 .463.211.463.47Zm3.697 4.719a.466.466 0 0 1-.462.468H2.378a.466.466 0 0 1-.462-.468v-.47h10.168v.47Zm.925-1.407H.99v-.5c0-.775.622-1.406 1.387-1.406h9.244c.765 0 1.387.63 1.387 1.406v.5Z"
                fill="#FFF"
                fill-rule="nonzero"
              ></path>
            </svg>
          </div>
          <div class="sign_draggable_text">Stamp</div>
          <div class="sign_draggable_prev">
            <img class="my-2 add_item" :src="sign_obj && sign_obj.stamp" />
          </div>
          <div class="sign_draggable_actions" @click="$emit('editSign')">
            <div class="sign__draggable_actions_edit">
              <i class="fa fa-pencil" @click="$emit('editSign')"></i>
              <div class="sign_counters" v-if="stamp_num > 0">
                {{ stamp_num }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="sign_btn" @click="savePDF">
        {{ $t("page_titles.sign_page.actionBtn") }}
      </button>
    </div>
    <DateFormatModal v-if="dateModalValidate" @close="set_date_format" />
    <TextModal v-if="textModalValidate" @close="set_text" :textProps="text" />
  </div>
</template>

<script>
import "@/assets/js/styles.css";
import "@/assets/js/pdfannotate.css";
import { PDFAnnotate } from "@/assets/js/pdfsign.js";
import convert from "@/pdf_pages/services/convertTextToImg.js";
import DateFormatModal from "./DateFormatModal.vue";
import TextModal from "./TextModal.vue";

import PdfPreviewList from "./PdfPreviewList.vue";
const today = new Date();

// Get the components of the date (year, month, day)
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
const day = today.getDate().toString().padStart(2, "0");

// Format the date as "YYYY-MM-DD"
const formattedDate = `${year}-${month}-${day}`;

export default {
  components: {
    DateFormatModal,
    TextModal,
    PdfPreviewList,
  },
  created() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler);
  },
  async mounted() {
    this.loadScripts();

    this.date_img = await convert(this.date);
    this.text_img = await convert(this.text);
  },
  props: {
    pdfUrl: {
      require: true,
      type: String,
    },
    get_pdf: {
      default: false,
    },
    currentPage: {
      require: true,
    },
    totalPageNum: {
      require: true,
    },
    sign_obj: {
      type: Object,
    },
  },
  watch: {
    get_pdf(newValue) {
      if (newValue == true) {
        this.savePDF();
      }
    },
    currentPage(newValue) {
      if (newValue != 0) {
        const scrollableDiv = this.$refs.scrollableDiv;
        const totalHeight =
          scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
        // const scrollToPosition =
        //   ((newValue - 1) / this.totalPageNum) * totalHeight * 1.2;
        const targetElement = document.getElementById(
          `page-${newValue}-canvas`
        );
        const elementHeight = targetElement.offsetHeight;
        this.setScrollbarPosition((elementHeight + 25) * (newValue - 1));
      }
    },
  },
  data() {
    return {
      pdf: null,
      show_img: null,
      date_img: null,
      text_img: null,
      date: formattedDate,
      text: "Text",
      dateModalValidate: false,
      textModalValidate: false,
      sign_num: 0,
      init_num: 0,
      name_num: 0,
      date_num: 0,
      text_num: 0,
      stamp_num: 0,
    };
  },
  methods: {
    async set_text(data) {
      this.text = data;
      this.textModalValidate = false;
      this.text_img = await convert(this.text);
    },
    async set_date_format(data) {
      this.date = data;
      this.dateModalValidate = false;
      this.date_img = await convert(this.date);
    },
    keyDownHandler(e) {
      var activeObject =
        this.pdf.fabricObjects[this.pdf.active_canvas].getActiveObject();
      if (e.key == "Delete" && activeObject) {
        this.pdf.fabricObjects[this.pdf.active_canvas].remove(activeObject);
        // this.pdf.fabricObjects[this.pdf.active_canvas].renderAll();
        this.get_objects();
      }
      // Your handler code here
    },
    loadScripts() {
      var pdf = new PDFAnnotate("pdf-container-annotate", this.pdfUrl, {
        scale: 1,
        pageImageCompression: "SLOW", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
      });
      this.pdf = pdf;
    },
    async get_objects() {
      const images = await this.pdf.savePdf("output.pdf");
      this.set_counts(images);
    },
    setScrollbarPosition(position) {
      // Set the scrollbar's location programmatically
      this.$refs.scrollableDiv.scrollTop = position;
    },
    set_counts(data) {
      var sign_num = 0;
      var init_num = 0;
      var name_num = 0;
      var date_num = 0;
      var text_num = 0;
      var stamp_num = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].length == 0) continue;
        const item = data[i];
        for (let j = 0; j < item.length; j++) {
          switch (item[j].url) {
            case this.sign_obj.sign:
              sign_num++;
              break;
            case this.sign_obj.init:
              init_num++;
              break;
            case this.sign_obj.name:
              name_num++;
              break;
            case this.date_img:
              date_num++;
              break;
            case this.text_img:
              text_num++;
              break;
            case this.stamp_img:
              stamp_num++;
              break;
            default:
              break;
          }
        }
      }
      this.sign_num = sign_num;
      this.init_num = init_num;
      this.name_num = name_num;
      this.date_num = date_num;
      this.text_num = text_num;
      this.stamp_num = stamp_num;
    },
    async savePDF() {
      const images = await this.pdf.savePdf("output.pdf");
      const matched = {
        text: [this.sign_obj.name_text, this.date, this.text],
        img: [this.sign_obj.name, this.date_img, this.text_img],
      };
      this.$emit("upload", [images, matched]);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
/* @import "~bootstrap/dist/css/bootstrap.min.css"; */
</style>

<style scoped>
img {
  cursor: move;
}
#pdf-container-annotate {
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  margin-top: 10px;
  text-align: center;
}

.canvas-container {
  position: absolute !important;
}
.edit-pdf-content {
  max-height: 100vh;
  overflow-y: scroll;
}

#colorpicker {
  height: 25px !important;
}
.sign_counters {
  background-color: #4a7aab;
  border-radius: 50%;
  padding-left: 9px;
  padding-right: 9px;
  color: white;
}
.sign_btn {
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
.sign_item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  border-radius: 4px;
  border: 1px solid #9bb8da;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.14);
  background-color: #f4f5f9;
  margin-bottom: 10px;
  min-height: 70px;
}

.sign_draggable_drag {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
}

.sign_draggable_icon {
  background-color: #4a7aab;
  box-shadow: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
.sign__draggable_actions_edit {
  color: #4a7aab;
}
.sign_draggable_text {
  font-size: 8px;
  color: #4a7aab;
  letter-spacing: 0.16px;
  line-height: 24px;
  position: absolute;
  left: 55px;
  top: -12px;
  font-weight: 600;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-right: auto;
  padding: 12px;
}

.sign_draggable_prev {
  order: 1px dashed #adadb6;
  height: calc(100% - 8px);
  -ms-flex: auto;
  flex: auto;
  margin-left: 8px;
  margin-right: 4px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 24px;
}

.sign_draggable_actions :hover {
  color: red;
  cursor: pointer;
}
.sign_right {
  padding: 0;
}
.tool__sidebar {
  padding: 0;
}
.sign_tool {
  background: #fefefe;
  padding: 0;
}
.furniture {
  margin: 10px 14px;
}
</style>
