<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent nav-par"
    v-if="$route.path != '/login'"
  >
    <div class="md-toolbar-row nav-top">
      <LocalizedLink to="/">
        <img src="@/assets/img/vue-logo.png" width="160" srcset="" />
      </LocalizedLink>
      <LocalizedLink to="/pdfmerge">
        <p class="nav-btn" :class="{ 'active-link': isActive('/pdfmerge') }">
          <b>{{ $t("features.merge.title") }}</b>
        </p>
      </LocalizedLink>
      <LocalizedLink to="/pdfsplit">
        <p class="nav-btn" :class="{ 'active-link': isActive('/pdfsplit') }">
          <b>{{ $t("features.split.title") }}</b>
        </p>
      </LocalizedLink>
      <LocalizedLink to="/pdfcompress">
        <p class="nav-btn" :class="{ 'active-link': isActive('/pdfcompress') }">
          <b>{{ $t("features.compress.title") }}</b>
        </p>
      </LocalizedLink>
      <LocalizedLink to="wordtopdf">
        <p class="nav-btn">
          <b>{{ $t("other_features.convert_pdf.title") }}</b>
        </p>
      </LocalizedLink>
      <!-- <LocalizedLink to="pdftoword">
        <p class="nav-btn">
          <b>{{ $t("other_features.convert_pdf.title") }}</b>
        </p>
      </LocalizedLink> -->
      <p class="nav-btn">
        <b>{{ $t("other_features.all_pdf_tools.title") }}</b>
      </p>

      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <md-list>
            <li class="md-list-item">
              <div class="md-list-item-content">
                <md-button class="md-button md-just-icon md-simple login-btn">
                  {{ $t("nav-links.login") }}
                </md-button>
              </div>
            </li>
            <li class="md-list-item">
              <div class="md-list-item-content">
                <button class="signup-btn">
                  {{ $t("nav-links.signup") }}
                </button>
              </div>
            </li>
            <li class="md-list-item">
              <div class="md-list-item-content">
                <drop-down>
                  <md-button
                    slot="title"
                    class="md-button md-just-icon md-simple"
                    data-toggle="dropdown"
                  >
                    <md-icon dm-size="large">menu</md-icon>
                    <p class="hidden-lg hidden-md">Notifications</p>
                  </md-button>
                </drop-down>
              </div>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>
<script>
import LocalizedLink from "@/components/LocalizedLink";
export default {
  components: { LocalizedLink },
  methods: {
    isActive(route) {
      return this.$route.path === route;
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
.nav-top {
  background: #fff;
  width: 100%;
  height: 60px;
  z-index: 1041;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  -webkit-box-shadow: 0 3px 6px 0 rgba(50, 50, 50, 0.3);
  box-shadow: 0 3px 6px 0 rgba(50, 50, 50, 0.3);
  padding: 10px 24px 0;
}
.nav-btn {
  margin-left: 25px;
  font-size: 12px;
  cursor: pointer;
  color: #495057;
}

.nav-btn b {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ff7c03;
}

.nav-btn:hover {
  color: #ff7c03;
}

.download_btn {
  color: #fff !important;
}

.md-theme-default a:not(.md-button) {
  color: #ff7c03;
}

.active-link {
  color: #ff7c03;
}

.login-btn,
.signup-btn {
  font-size: 12px !important;
  font-weight: 600 !important;
}

.signup-btn {
  border-radius: 8px !important;
  background: #ff7c03 !important;
  padding: 10px 15px;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
