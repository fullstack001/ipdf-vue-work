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
                <div class="card-tip">
                  <div class="card-tip-date">10</div>
                  <div class="card-tip-month">NOV</div>
                </div>
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
                <div class="card-tip">
                  <div class="card-tip-date">10</div>
                  <div class="card-tip-month">NOV</div>
                </div>
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
                <div class="card-tip">
                  <div class="card-tip-date">10</div>
                  <div class="card-tip-month">NOV</div>
                </div>
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

<style scoped>
@import "../../assets/css/landing.css";
</style>
