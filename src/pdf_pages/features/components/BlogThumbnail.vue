<template>
  <div class="solution">
    <div class="block__container">
      <div class="solution-header">
        {{ $t("page_titles.landing.section1.title") }}
      </div>
      <div class="md-layout">
        <div
          class="md-layout-item"
          v-for="blog in blogs"
          :key="blog._id"
          @click="goBlogDetail(blog._id)"
        >
          <md-card>
            <md-card-media>
              <img :src="blog.img" alt="People" />
              <div class="card-tip">
                <div class="card-tip-date">
                  {{ setMonth(blog.uploadTime) }}
                </div>
                <div class="card-tip-month">
                  {{ setDate(blog.uploadTime) }}
                </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getMonth } from "../../services/getDateMonth";
export default {
  props: ["routing"],
  data() {
    return {
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
        })
        .catch((err) => console.log(err));
    },
    goBlogDetail(id) {
      if (this.routing) {
        this.$router.push({
          name: this.$route.params.locale == undefined ? "blog" : "en_blog",
          params: {
            id: id,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.solution {
  background-color: #fff;
  padding: 40px 0 30px;
  z-index: 1;
  position: relative;
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
.solution .md-layout-item:hover {
  border: solid 1px #ff7c03;
  cursor: pointer;
  border-radius: 5px;
}
/* .md-card-media {
  padding: 15px;
}

.md-card-header {
  background-color: #fff !important;
  margin-bottom: 15px !important;
} */

.card-tip {
  position: absolute;
  background-color: #ff7c03;
  border-radius: 0px 8px 8px 0px;
  bottom: 15px;
  color: #fff;
  padding: 5px 5px;
  font-weight: 500;
}

.card-tip-date {
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}

.md-card-header .md-title {
  font-weight: 600;
  color: #575757;
  font-size: 20px;
}
</style>
