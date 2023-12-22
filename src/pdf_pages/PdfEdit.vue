<template>
  <div>
    <md-toolbar
      md-elevation="0"
      class="md-transparent nav-par"
      v-if="$route.path != '/login'"
    >
      <div class="md-toolbar-row nav-top">
        <router-link to="/">
          <img src="@/assets/img/vue-logo.png" width="160" srcset="" />
        </router-link>
        <router-link to="/mergepdf">
          <p class="nav-btn" :class="{ 'active-link': isActive('/mergepdf') }">
            <b>{{ $t("features.merge.title") }}</b>
          </p>
        </router-link>
        <router-link to="/splitpdf">
          <p class="nav-btn" :class="{ 'active-link': isActive('/splitpdf') }">
            <b>{{ $t("features.split.title") }}</b>
          </p>
        </router-link>
        <router-link to="/compresspdf">
          <p
            class="nav-btn"
            :class="{ 'active-link': isActive('/compresspdf') }"
          >
            <b>{{ $t("features.compress.title") }}</b>
          </p>
        </router-link>
        <router-link to="wordtopdf">
          <p class="nav-btn">
            <b>{{ $t("other_features.convert_pdf.title") }}</b>
          </p>
        </router-link>
        <p class="nav-btn">
          <b>{{ $t("other_features.all_pdf_tools.title") }}</b>
        </p>

        <div class="md-toolbar-section-end">
          <div class="md-collapse">
            <md-list>
              <li class="md-list-item">
                <div class="md-list-item-content">
                  <md-button class="md-button md-just-icon md-simple login-btn">
                    Login
                  </md-button>
                </div>
              </li>
              <li class="md-list-item">
                <div class="md-list-item-content">
                  <button class="signup-btn">SIGN UP</button>
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
    <edit-content></edit-content>
    <div class="footer">
      <div class="block__container">
        <LangSelector />
        <div class="footer-links">
          <div class="footer-link">
            <router-link to="/"> About </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> Merge Pdf </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> Split Pdf </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> Compress Pdf </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> Convert Pdf </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> Blog </router-link>
          </div>
        </div>
        <div class="footer-social">
          <div class="social">
            <i class="fa-brands fa-facebook-f"></i>
          </div>
          <div class="social">
            <i class="fa-brands fa-instagram"></i>
          </div>
          <div class="social">
            <i class="fa-brands fa-twitter"></i>
          </div>
          <div class="social">
            <i class="fa-brands fa-youtube"></i>
          </div>
        </div>
        <div class="copyright">© Copyright PdfDen. All rights reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
import EditContent from "./EditContent.vue";
import LangSelector from "@/components/LangSelector/LangSelector.vue";
export default {
  components: {
    EditContent,
    LangSelector,
  },

  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style lang="css">
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
  margin-left: 50px;
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

.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
  position: relative;
}

.footer-links {
  display: inline-flex;
  margin: 10px 0;
}

.footer-social {
  display: inline-flex;
  margin: 10px 0;
  position: absolute;
  right: 0;
}

.social {
  background-color: #fff;
  border-radius: 50%;
  margin-right: 10px;
  width: 35px;
  height: 35px;
  padding: 7px 5px 6px 10px;
  color: #e34f4f;
}

.footer-link {
  margin: 0px 20px 0 0px;
}

.footer-link a {
  color: #000 !important;
}
.copyright {
  padding-bottom: 20px;
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

@media (min-width: 992px) {
  .block__container {
    max-width: 84%;
  }
}

@media (min-width: 1366px) {
  .block__container {
    max-width: 84%;
  }
}
</style>
