<template>
  <div>
    <div class="tools">
      <!-- section 1 -->
      <h2>{{ $t("page_titles.landing.title1") }}</h2>
      <h4>{{ $t("page_titles.landing.text1") }}</h4>
      <div class="tools_container">
        <div
          v-for="(item, index) in $t('features')"
          :key="index"
          class="tools__item"
        >
          <feature-title :item="{ item }"> </feature-title>
        </div>
      </div>
      <!-- section 1 -->
    </div>

    <div class="solution">
      <div class="block__container">
        <div class="solution-header">
          {{ $t("page_titles.landing.section1.title") }}
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-card>
              <md-card-media>
                <img src="@/assets/img/solution1.png" alt="People" />
              </md-card-media>

              <md-card-header>
                <div class="md-title">
                  {{ $t("page_titles.landing.section1.title1") }}
                </div>
                <div class="md-subhead">
                  {{ $t("page_titles.landing.section1.text1") }}
                </div>
              </md-card-header>
            </md-card>
          </div>
          <div class="md-layout-item">
            <md-card>
              <md-card-media>
                <img src="@/assets/img/solution2.png" alt="People" />
              </md-card-media>

              <md-card-header>
                <div class="md-title">
                  {{ $t("page_titles.landing.section1.title2") }}
                </div>
                <div class="md-subhead">
                  {{ $t("page_titles.landing.section1.text2") }}
                </div>
              </md-card-header>
            </md-card>
          </div>
          <div class="md-layout-item">
            <md-card>
              <md-card-media>
                <img src="@/assets/img/solution3.png" alt="People" />
              </md-card-media>

              <md-card-header>
                <div class="md-title">
                  {{ $t("page_titles.landing.section1.title3") }}
                </div>
                <div class="md-subhead">
                  {{ $t("page_titles.landing.section1.text3") }}
                </div>
              </md-card-header>
            </md-card>
          </div>
        </div>
      </div>
    </div>

    <div class="premium">
      <div class="block__container">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="premium_title">
              {{ $t("page_titles.landing.section2.title") }}
            </div>
            <div class="premium_text">
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="" />
                </span>
                <span>{{ $t("page_titles.landing.section2.item1") }} </span>
              </div>
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="" />
                </span>
                <span>{{ $t("page_titles.landing.section2.item2") }}</span>
              </div>
              <div>
                <span>
                  <img src="@/assets/img/right-arrow.png" alt="" />
                </span>
                <span> {{ $t("page_titles.landing.section2.item3") }}</span>
              </div>
            </div>
            <div>
              <a href="" class="btn premium_btn"
                >{{ $t("page_titles.landing.section2.button") }}
              </a>
            </div>
          </div>
          <div class="md-layout-item">
            <div class="free-img">
              <img src="@/assets/img/free.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureTitle from "./components/FeatureTitle.vue";
import { feature_names } from "../services/feature_name";

export default {
  components: {
    FeatureTitle,
  },
  data() {
    return {
      features: feature_names,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
}

h2::first-letter {
  text-transform: uppercase;
}
.md-layout-item {
  height: 40px;

  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background: md-get-palette-color(red, 200);
    content: " ";
  }
}
.pattern-bg {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: fixed;
  top: 0;
  background-position: center center;
  background-size: 100% auto;
  background-image: url("../../assets/img/background.svg");
}

.tools h2,
.tools h4 {
  text-align: center;
}

h2 {
  font-weight: 600;
  padding-top: 60px;
  margin-top: 0 !important;
}

h4 {
  font-weight: 500;
  margin-bottom: 50px;
}
.elevation-demo {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  align-items: center;
  justify-content: center;
}

.tools {
  display: -ms-flexbox;
  display: block;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  margin: auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0 68px 42px;
  background-position: center center;
  background-size: 100% auto;
  background-image: url("../../assets/img/background.svg");
}

.tools_container {
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
}

.tools__item {
  background: #fff;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-preferred-size: calc(25% - 30px);
  flex-basis: calc(25% - 30px);
  border: 1px solid #f5f5fa;
  position: relative;
  overflow: hidden;
  -webkit-transition: background-color 0.4s ease-out,
    -webkit-box-shadow 0.4s ease-out;
  transition: background-color 0.4s ease-out, -webkit-box-shadow 0.4s ease-out;
  -o-transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out;
  transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out;
  transition: box-shadow 0.4s ease-out, background-color 0.4s ease-out,
    -webkit-box-shadow 0.4s ease-out;
  z-index: 1;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
}

.solution {
  background-color: #fff;
  padding: 40px 0 30px;
  z-index: 1;
  position: relative;
}

.trusted {
  padding: 96px 0 124px;
}

.trusted-header {
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
  margin-bottom: 30px;
}

.trusted_text {
  margin-top: 16px;
  text-align: center;
  font-weight: 400;
  color: #47474f;
  font-size: 20px;
}

.trusted .md-layout {
  margin-top: 70px;
}

.trusted .md-layout .md-layout-item {
  text-align: center;
}
.trusted .md-layout .md-layout-item img {
  width: 120px;
}

.premium {
  position: relative;
  background: #47474f;
  color: #f5f5fa;
  padding: 64px 0 320px;
  z-index: 1;
  background-position: center center;
  background-size: 100% auto;
  background-image: url("../../assets/img/bottom.png");
}

.premium .premium_title {
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  padding-bottom: 20px;
}

.premium_text {
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  padding-bottom: 15px;
}

.premium_text div {
  padding: 5px 0;
}

.premium_btn {
  margin-top: 20px;
  color: #fff !important;
  background-color: #263238;
}

.free-img img {
  max-width: 400px;
}

.btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 8px 20px;
  text-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 8px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -webkit-transition: all 0.1s linear;
  -o-transition: all 0.1s linear;
  transition: all 0.1s linear;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0;
  min-height: 42px;
  color: #fff;
}
.block__container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 91%;
}
.solution-header {
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
  margin-bottom: 25px;
}

.solution .md-layout-item {
  height: auto;
}
.md-layout-item-title {
  font-weight: 500;
  font-size: 28px;
  line-height: 30px;
  color: #33333b;
  margin-bottom: 12px;
}

.md-layout-item-content {
  color: #707078;
  line-height: 28px;
  font-size: 16px;
  font-weight: 400;
}

.md-card-media {
  padding: 15px;
}

.md-card-header {
  background-color: #fff !important;
  margin-bottom: 15px !important;
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
@media (max-width: 98.75em) {
  .tools__item {
    font-size: 36px;

    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(25% - 30px);
    flex-basis: calc(25% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 90em) {
  .tools {
    padding: 0 32px 32px;
  }
}
@media (max-width: 1280px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(25% - 30px);
    flex-basis: calc(25% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 960px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(33.333% - 30px);
    flex-basis: calc(33.333% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 640px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
  }

  .solution-header {
    margin-bottom: 25px;
  }
  .md-layout-item {
    margin-top: 30px;
  }
}

@media (max-width: 440px) {
  .tools__item {
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: calc(100% - 30px);
    flex-basis: calc(100% - 30px);
    margin-top: 30px;
  }
}
</style>
