<template>
  <div>
    <div v-if="isLoading">Loading...</div>
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
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    EventBus.$on("i18n-load-start", () => (this.isLoading = true));
    EventBus.$on("i18n-load-complete", () => (this.isLoading = false));
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
</style>
