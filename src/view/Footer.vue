<template>
  <div class="footer">
    <div class="block__container">
      <!-- <LangSelector /> -->
      <div class="footer_menus">
        <LocaleSwitcher />
        <div class="footer-links">
          <div class="footer-link">
            <router-link to="/"> {{ $t("nav-links.about") }} </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> {{ $t("nav-links.merge_pdf") }} </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> {{ $t("nav-links.split_pdf") }} </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/">
              {{ $t("nav-links.compress_pdf") }}
            </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/">
              {{ $t("nav-links.convert_pdf") }}
            </router-link>
          </div>
          <div class="footer-link">
            <router-link to="/"> {{ $t("nav-links.blog") }} </router-link>
          </div>
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
    </div>
    <div class="block__container">
      <div class="copyright">© {{ $t("nav-links.copyright") }}</div>
    </div>
  </div>
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import LocalizedLink from "@/components/LocalizedLink";

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
  display: flex;
}

.footer_menus {
  display: flex;
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

.footer {
  padding-top: 40px;
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
