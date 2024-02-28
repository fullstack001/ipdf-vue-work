<template>
  <div>
    <div v-if="isLoading"></div>
    <div v-else>
      <Nav />
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Nav from "@/view/Nav.vue";
import Footer from "@/view/Footer.vue";
import EventBus from "@/EventBus";

export default {
  name: "app",
  computed: {
    locale() {
      return this.$route.params && this.$route.params.locale
        ? this.$route.params.locale
        : "en";
    },
    metaTags() {
      return [
        {
          property: "og:url",
          content: window.location.href,
        },
        {
          property: "og:site_name",
          content: "pdfden - Online tools for PDF",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:locale",
          content: this.locale,
        },
      ];
    },
  },
  metaInfo() {
    return {
      meta: this.metaTags,
    };
  },
  components: {
    Nav,
    Footer,
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    EventBus.$on("i18n-load-start", () => (this.isLoading = true));
    EventBus.$on("i18n-load-complete", () => (this.isLoading = false));
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload() {
      // Remove the localStorage item when the website is closed
      localStorage.removeItem("token");
    },

    localeProperty() {
      const locale = {
        property: locale,
        content: this.$route.params.locale ? this.$route.params.locale : "en",
      };

      return locale;
    },
    setMetaData() {
      const metaInfo = {
        title: "PDFden ",
        titleTemplate: "%s | Online PDF Tools",
        meta: [
          // {
          //   vmid: "description",
          //   name: "description",
          //   content: "Parent description.",
          // },
          {
            property: "og:url",
            content: window.location.href,
          },
          {
            property: "og:site_name",
            content: "pdfden",
          },
          {
            property: locale,
            content: this.$route.params.locale
              ? this.$route.params.locale
              : "en",
          },
        ],
      };

      return metaInfo;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.tab-area .md-tabs-navigation {
  box-shadow: none;
  padding: 10px;
}

.tab-area .md-button-content {
  display: grid !important;
}

.tab-area .md-button-content .md-tab-label {
  color: #333 !important;
  font-size: 18px;
}

.tab-area .md-button-content .md-tab-icon {
  color: #333 !important;
  font-size: 50px !important;
  width: 50px !important;
  height: 50px !important;
}

.md-tabs-navigation .md-active {
  border: solid 1px #ff7c03;
}

.md-button.md-primary {
  background-color: #ff7c03 !important;
}

.picker-dialog-frame {
  min-height: 600px;
}
.md-stepper .md-steppers.md-vertical .md-stepper-header {
  background-color: #fff !important;
}

.add_button .md-ripple {
  padding: 0 !important;
}

.md-icon-button .md-ripple .md-button-content i {
  color: #000 !important;
}

.nav-btn .md-button,
.nav-btn .md-button:active,
.nav-btn .md-button:focus,
.nav-btn .md-button:hover,
.nav-btn .md-button:active:focus,
.nav-btn .md-button:active:hover {
  padding: 0;
  background-color: transparent !important;
  color: #000 !important;
  font-weight: 600;
  box-shadow: none !important;
}

.nav-btn .md-button .md-ripple {
  padding: 10px 20px !important;
}

.md-list-item .md-list-item-container .md-ripple {
  padding: 0 !important;
}

.md-list-item .md-list-item-container .md-ripple a {
  padding: 10px 20px !important;
}
.md-menu-content .md-list .md-list-item a {
  font-size: 12px !important;
  width: 100% !important;
}

.nav-btn .md-button .md-ripple .md-button-content .material-icons {
  font-size: 12px !important;
}

.md-list-item {
  margin-left: 0 !important;
}

@media (max-width: 991px) {
  .md-layout-item {
    flex: auto !important;
    padding-left: 0;
  }

  .block__container {
    margin-left: 0;
  }
  .tab-area .md-button-content .md-tab-label {
    color: #333 !important;
    font-size: 14px;
  }
}
</style>
