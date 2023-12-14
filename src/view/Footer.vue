<template>
  <div class="footer">
    <div class="block__container">
      <!-- <LangSelector /> -->
      <LocaleSwitcher />
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
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
export default {
  components: {
    LocaleSwitcher,
  },
};
</script>
<style scoped>
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
