<template>
  <!-- <md-toolbar
    md-elevation="0"
    class="md-transparent nav-par"
    v-if="$route.path != '/login'"
  > -->
  <nav class="navbar">
    <LocalizedLink to="/">
      <img src="@/assets/img/vue-logo.png" width="160" srcset="" />
    </LocalizedLink>
    <div class="navbar-toggle" @click="toggleNavbar">
      <md-icon>menu</md-icon>
    </div>
    <ul class="nav-lists">
      <li class="nav-item">
        <ul class="nav-list">
          <li>
            <LocalizedLink
              to="/pdfmerge"
              class="nav-btn"
              :class="{ 'active-link': isActive('/pdfmerge') }"
            >
              {{ $t("features.merge.title") }}
            </LocalizedLink>
          </li>

          <li>
            <LocalizedLink
              to="/pdfsplit"
              class="nav-btn"
              :class="{ 'active-link': isActive('/pdfsplit') }"
            >
              {{ $t("features.split.title") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink
              to="/pdfcompress"
              class="nav-btn"
              :class="{ 'active-link': isActive('/pdfcompress') }"
            >
              {{ $t("features.compress.title") }}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="/wordtopdf" class="nav-btn">
              {{ $t("other_features.convert_pdf.title") }}
            </LocalizedLink>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <ul class="nav-list">
          <li class="md-list-item login-btn">
            {{ $t("nav-links.login") }}
          </li>
          <li class="md-list-item signup-btn">
            {{ $t("nav-links.signup") }}
          </li>
        </ul>
      </li>
    </ul>
    <div :class="{ 'navbar-open': isOpen }">
      <ul class="mobile-nav-list">
        <li>
          <LocalizedLink
            to="/pdfmerge"
            class="nav-btn"
            :class="{ 'active-link': isActive('/pdfmerge') }"
          >
            {{ $t("features.merge.title") }}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/pdfsplit"
            class="nav-btn"
            :class="{ 'active-link': isActive('/pdfsplit') }"
          >
            {{ $t("features.split.title") }}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink
            to="/pdfcompress"
            class="nav-btn"
            :class="{ 'active-link': isActive('/pdfcompress') }"
          >
            {{ $t("features.compress.title") }}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink to="wordtopdf" class="nav-btn">
            {{ $t("other_features.convert_pdf.title") }}
          </LocalizedLink>
        </li>
        <li class="login-btn">
          <a href="" class="nav-btn">{{ $t("nav-links.login") }}</a>
        </li>
        <li class="signup-btn">
          <a href="" class="nav-btn"> {{ $t("nav-links.signup") }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import LocalizedLink from "@/components/LocalizedLink";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  components: { LocalizedLink },
  methods: {
    toggleNavbar() {
      console.log("toggle");
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

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff; /* Material Design Blue */
  padding: 10px;
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
  margin: 0 15px;
}
.nav-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #ff7c03;
  margin-left: 25px;
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
  color: #ff7c03 !important;
}

@media only screen and (max-width: 991px) {
  .navbar-toggle {
    display: flex;
    position: absolute;
    right: 10px;
    cursor: pointer;
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
    flex-direction: column;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background-color: #fff; /* Material Design Blue */
    list-style: none;
  }
  .mobile-nav-list li {
    margin: 30px 0;
  }

  .nav-btn {
    margin-left: 0;
    width: fit-content;
  }

  .signup-btn {
    width: fit-content;
  }
}
</style>
