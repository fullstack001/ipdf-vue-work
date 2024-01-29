<template>
  <nav class="navbar">
    <div class="block__container">
      <LocalizedLink to="/" style="background-color: #fff !important">
        <img src="@/assets/img/vue-logo.png" width="160" srcset="" />
      </LocalizedLink>
      <div class="navbar-toggle" @click="toggleNavbar">
        <md-icon>menu</md-icon>
      </div>
      <ul class="nav-lists">
        <li class="nav-item" style="position: relative; right: 10%">
          <ul class="nav-list">
            <li>
              <LocalizedLink
                to="/mergepdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/mergepdf') }"
              >
                {{ $t("features.merge.title") }}
              </LocalizedLink>
            </li>

            <li>
              <LocalizedLink
                to="/splitpdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/splitpdf') }"
              >
                {{ $t("features.split.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/compresspdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/compresspdf') }"
              >
                {{ $t("features.compress.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/signpdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/signpdf') }"
              >
                {{ $t("features.sign.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/editpdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/editpdf') }"
              >
                {{ $t("features.edit.title") }}
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                to="/rotatepdf"
                class="nav-btn"
                :class="{ 'active-link': isActive('/rotatepdf') }"
              >
                {{ $t("features.rotate.title") }}
              </LocalizedLink>
            </li>
            <li style="margin-top: -10px">
              <md-speed-dial
                class="dropdown-tooltip"
                md-direction="bottom"
                style="padding: 0; position: absolute; right: -140px"
              >
                <button class="nav-btn" md-menu-trigger style="min-width: 38px">
                  {{ $t("other_features.convert_pdf.title") }}
                </button>

                <md-speed-dial-content style="z-index: 1000">
                  <md-button class="nav-btn">
                    <LocalizedLink to="wordtopdf">
                      {{ $t("features.word_pdf.title") }}
                    </LocalizedLink>
                  </md-button>
                  <md-button class="nav-btn">
                    <LocalizedLink to="pdftoword">
                      {{ $t("features.pdf_word.title") }}
                    </LocalizedLink>
                  </md-button>
                  <!-- <md-menu-item>
                    <LocalizedLink to="signpdf">
                      {{ $t("features.sign.title") }}
                    </LocalizedLink>
                  </md-menu-item>
                  <md-menu-item>
                    <LocalizedLink to="editpdf">
                      {{ $t("features.edit.title") }}
                    </LocalizedLink>
                  </md-menu-item> -->
                </md-speed-dial-content>
              </md-speed-dial>
              {{ user && user.name }}
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <ul class="nav-list">
            <li class="md-list-item login-btn">
              <LocalizedLink to="login">
                {{ $t("nav-links.login") }}
              </LocalizedLink>
            </li>
            <li class="md-list-item signup-btn">
              <LocalizedLink to="signup">
                {{ $t("nav-links.signup") }}
              </LocalizedLink>
            </li>
          </ul>
        </li>
      </ul>
      <div :class="{ 'navbar-open': isOpen }">
        <ul class="mobile-nav-list" @mouseleave="isOpen = false">
          <li>
            <LocalizedLink to="/"> HOME </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="/mergepdf">
              {{ $t("features.merge.title") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="/splitpdf">
              {{ $t("features.split.title") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="/compresspdf">
              {{ $t("features.compress.title") }}
            </LocalizedLink>
          </li>

          <li>
            <LocalizedLink to="wordtopdf">
              {{ $t("other_features.convert_pdf.title") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="login">
              {{ $t("nav-links.login") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="signup">
              {{ $t("nav-links.signup") }}
            </LocalizedLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import store from "@/store/index.js";
import LocalizedLink from "@/components/LocalizedLink";

export default {
  data() {
    return {
      isOpen: false,
    };
  },

  components: { LocalizedLink },
  computed: {
    user() {
      return store.state.user;
    },
  },
  methods: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
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
.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.md-speed-dial {
  display: block;
  flex-direction: column;
}
.md-speed-dial .md-button {
  margin: 1px 0;
  padding: 0;
  background: #fefefe !important;
  height: 40px;
  width: 150px;
  border-radius: 8px;
  border: 1px solid #ff7c03;
}
.md-speed-dial .md-button .md-button-content {
  color: #495057 !important;
  font-weight: 600 !important;
}

.navbar {
  background-color: #fff; /* Material Design Blue */
  z-index: 11;
  position: relative;

  box-shadow: 0px 4px 17px 0px rgb(81 65 65 / 38%);
}
button {
  background: #fefefe;
  margin: 2px 0px;
  height: 38px;
  font-weight: 600;
}
a {
  color: #000000 !important;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.nav-lists {
  list-style: none;
  display: flex;
  margin: 0;
}

.nav-item {
  display: block;
  margin-top: 20px;
  margin-bottom: 10px;
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
}

.nav-list li {
  margin: 0 10px;
}
.nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ff7c03;
  margin-left: 0px;
  font-size: 12px;
  cursor: pointer;
  color: #495057 !important;
  font-weight: 600;
}

.nav-btn:hover {
  color: #ff7c03;
}

.download_btn {
  color: #fff !important;
}

.active-link {
  color: #ff7c03;
}

.login-btn,
.signup-btn {
  font-size: 12px !important;
  font-weight: 600 !important;
}
.login-btn {
  cursor: pointer;
}

.signup-btn {
  border-radius: 8px !important;
  background: #ff7c03 !important;
  padding: 10px 15px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: -10px !important;
}

.mobile-nav-list {
  display: none;
}

.router-link-active {
  color: #fff !important;
  background-color: #ff7c03 !important;
}
@media (max-width: 1570px) {
  .nav-btn {
    padding: 10px 5px;
  }
  .block__container {
    max-width: 100%;
  }
}

@media only screen and (max-width: 991px) {
  .navbar-toggle {
    display: flex;
    position: absolute;
    cursor: pointer;
    right: 18px;
  }

  .navbar-open {
    display: block !important;
    z-index: 10;
  }

  .nav-lists {
    display: none;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #fff; /* Material Design Blue */
  }

  .nav-list.show {
    display: flex;
  }

  .nav-list li {
    text-align: left;
    margin: 20px 0;
  }

  .navbar-open .mobile-nav-list {
    display: block;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: absolute;
    top: 20px;
    right: 0;
    width: 40%;
    background-color: #fff;
    list-style: none;
  }
  .mobile-nav-list li {
    margin: 15px 0;
  }

  .nav-btn {
    margin-left: 0;
    width: fit-content;
    border: none;
  }

  .signup-btn {
    width: fit-content;
  }
}
</style>
