<template>
  <div class="solution">
    <div class="block__container">
      <div class="solution-header">
        {{ $t("page_titles.landing.section1.title") }}
      </div>
      <div class="md-layout">
        <div
          class="md-layout-item blog-panel"
          v-for="blog in blogs"
          :key="blog._id"
          @click="goBlogDetail(blog.title, blog._id)"
        >
          <md-card class="blog-body">
            <md-card-media>
              <img class="blog_img" :src="blog.img" alt="People" />
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
                {{ blog.title }}
              </div>
              <div
                class="md-subhead"
                v-html="blog.content.substring(0, 120)"
              ></div>
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
    goBlogDetail(title, id) {
      const modifiedTitle = title.replace(/ /g, "-");
      this.$router.replace({
        name:
          this.$route.params.locale == undefined
            ? "blogDetail"
            : "en_blogDetail",
        params: {
          title: modifiedTitle,
          id: id,
        },
      });
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
  margin: auto;
  max-width: 90%;
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
.blog-body:hover {
  border: solid 1px #ff7c03;
  cursor: pointer;
  border-radius: 5px;
}

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
.md-card .md-card-header {
  margin: -20px 15px 0;
  border-radius: 3px;
  padding: 15px;
}
.md-card-header .md-title {
  font-weight: 600;
  color: #575757;
  font-size: 20px;
}
.blog-body {
  width: 510px;
  height: 500px;
}
img {
  width: 480px;
  height: 280px;
}
@media only screen and (max-width: 1870px) {
  .blog-body {
    width: 400px;
    height: 400px;
  }
  .blog_img {
    width: 380px;
    height: 160px;
  }
  .md-title {
    font-size: 20px;
  }
}
@media only screen and (max-width: 1470px) {
  .blog-body {
    width: 350px;
    height: 400px;
  }
  .blog_img {
    width: 330px;
    height: 140px;
  }
  .md-title {
    font-size: 15px;
  }
}
@media (max-width: 640px) {
  .solution {
    padding: 15px 0 15px;
  }
  .blog-panel {
    margin-top: 0px;
    padding: 0px;
    margin: auto;
    width: 100%;
    margin-bottom: 15px;
  }
  .solution-header {
    font-size: 20px;
  }
  .blog-body {
    height: 289px;
    overflow: hidden;
    width: 100%;
    margin: 0;
  }
  .md-card-header .md-title {
    line-height: 1.05;
  }
}
</style>
