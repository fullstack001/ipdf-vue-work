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
    <BlogThumbnail :routing="true" />

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
import { getDate, getMonth } from "../services/getDateMonth";
import BlogThumbnail from "./components/BlogThumbnail.vue";

export default {
  metaInfo: {
    title:
      "PDFden.com - Free Online PDF Tools - Merge, Split, Compress, and More!",

    meta: [
      {
        vmid: "all_keys",
        name: "Keywords",
        content:
          "PDF tools, online PDF editor, PDF converter, merge PDF, split PDF, compress PDF, edit PDF, convert to PDF, PDF merge, PDF split, PDF compression, editable PDF, online PDF suite, PDF utility",
      },
      {
        vmid: "all_description",
        name: "description",
        content:
          "Unlock the full potential of your PDFs with PDFden. Merge, split, convert, and edit your PDF files online with ease. Your go-to solution for all PDF-related tasks.",
      },
      {
        vmid: "all_facebook_description",
        property: "og:description",
        content:
          "Unlock the full potential of your PDFs with PDFden. Merge, split, convert, and edit your PDF files online with ease. Your go-to solution for all PDF-related tasks.",
      },
      {
        vmid: "all_title",
        property: "title",
        content:
          "PDFden.com - Free Online PDF Tools - Merge, Split, Compress, and More!",
      },
      {
        vmid: "all_facebook_title",
        property: "og:title",
        content:
          "PDFden.com - Free Online PDF Tools - Merge, Split, Compress, and More!",
      },
    ],
  },
  components: {
    FeatureTitle,
    BlogThumbnail,
  },
  data() {
    return {
      features: feature_names,
      blogs: null,
    };
  },
  created() {
    this.fetchBlog();
  },
  methods: {
    setMonth(data) {
      return getMonth(data);
    },
    setDate(data) {
      return getDate(data);
    },
    fetchBlog() {
      this.$axios
        .get("/pdf/latestBlogs")
        .then((res) => {
          this.blogs = res.data;
          console.log(this.blogs);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/landing.css";
</style>
