<template>
  <div class="solution">
    <div class="block__container">
      <div class="solution-header">Blog</div>
      <div class="md-layout">
        <div
          class="blog-item md-layout-item"
          v-for="blog in blogs"
          :key="blog._id"
          @click="goBlogDetail(blog.title, blog._id)"
        >
          <div class="blog-body">
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
                v-html="blog.content.substring(0, 500)"
              ></div>
            </md-card-header>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getMonth } from "./services/getDateMonth";
export default {
  metaInfo: {
    title: "PDFden Blog: Explore Insights on PDF Tools, Tips, and More",
    meta: [
      {
        name: "Keywords",
        content:
          "PDFden Blog, PDF tools, PDF tips, PDF insights, document management, PDF conversion, PDF editing, PDF compression, online tools, technology blog",
      },
      {
        name: "description",
        content:
          "Discover the latest insights, tips, and news on PDF tools at our blog. Explore a variety of articles covering PDF merge, splitting, conversion, editing, compression, and other helpful topics. ",
      },
      {
        property: "og:description",
        content:
          "Discover the latest insights, tips, and news on PDF tools at our blog. Explore a variety of articles covering PDF merge, splitting, conversion, editing, compression, and other helpful topics.",
      },
      {
        property: "og:title",
        content: "PDFden Blog: Explore Insights on PDF Tools, Tips, and More",
      },
    ],
  },
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
        .get("/pdf/allBlogs")
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
  width: 100%;
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
.md-card-header {
  padding: 10px;
}

.md-card-header .md-title {
  font-weight: 600;
  color: #575757;
  font-size: 20px;
}
.blog-body {
  width: 100%;
  height: 600px;
  overflow: hidden;
}
img {
  /* width: 480px; */
  height: 280px;
}
/* @media only screen and (max-width: 1870px) {
  .blog-body {
    width: 400px;
    height: 600px;
    overflow: hidden;
  }
  .blog_img {
    width: 380px;
    height: 160px;
  }
  .md-title {
    font-size: 20px;
  }
} */
/* @media only screen and (max-width: 1470px) {
  .blog-body {
    width: 350px;
    height: 600px;
    overflow: hidden;
  }
  .blog_img {
    width: 330px;
    height: 140px;
  }
  .md-title {
    font-size: 15px;
  }
} */
@media only screen and (max-width: 640px) {
  .blog-item {
    width: 100%;
    margin: auto;
    margin-bottom: 10px;
  }
  .blog-body {
    width: 100%;
  }
  img {
    /* width: 480px; */
    height: 180px;
  }
}
</style>
