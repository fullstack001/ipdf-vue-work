<template>
  <div class="blog-detail" v-if="blog">
    <div class="blog-title-area">
      <div class="blog-date">
        {{ formatDate(blog.uploadTime) }}
      </div>
      <div class="blog-title">
        {{ blog.title }}
      </div>
      <div class="blog-img-wrapper">
        <img :src="blog.img" alt="" class="blog-img" />
        <div class="blog-social">
          <div class="social">
            <i class="fa-brands fa-facebook-f"></i>
          </div>
          <div class="social face-social">
            <i class="fa-brands fa-twitter"></i>
          </div>
          <div class="social">
            <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="blog-content-area">
      <div v-html="blog.content"></div>
      <div class="blog-pagination">
        <div class="blog-prev blog-btn" @click="getPrevBlog(blog._id)">
          <i class="fa-solid fa-chevron-left"></i>
          PREVIOUS
        </div>
        <div class="blog-next blog-btn" @click="getNextBlog(blog._id)">
          NEXT
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
    <BlogThumbnail :routing="false" />
  </div>
</template>
<script>
import BlogThumbnail from "./components/BlogThumbnail.vue";
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default {
  // metaInfo: {
  //   meta: [
  //     {
  //       vmid: "description",
  //       name: "description",
  //       content: "Child description.",
  //     },
  //     {
  //       vmid: "description1",
  //       name: "description1",
  //       content: "Child description1.",
  //     },
  //   ],
  // },
  metaInfo() {
    return this.setMetaData();
  },
  // metaInfo() {
  //   return new Promise((resolve, reject) => {
  //     this.setMetaData()
  //       .then(() => {
  //         this.moveMetaTagToTop();
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  mounted() {
    this.moveMetaTagToTop();
  },
  onUpdated() {
    this.moveMetaTagToTop();
  },
  components: {
    BlogThumbnail,
  },
  created() {
    this.fetchBlogs(this.$route.params.title);
  },
  data() {
    return {
      metaTitle: "New description",
      blog: null,
      titles: [],
    };
  },
  watch: {
    "$route.params.title": function (newTitle, oldTitle) {
      // Handle the change of params.title here
      this.fetchBlogs(newTitle);
    },
  },
  methods: {
    fetchBlogs(title) {
      this.$axios
        .get(`/pdf/blog/${title}`)
        .then((res) => {
          this.blog = res.data.blog;
          this.titles = res.data.titles;
        })
        .catch((err) => console.log(err));
    },
    getPrevBlog(id) {
      const index = this.titles.findIndex((item) => item._id === id);
      if (index == 0) {
        return;
      }
      const newItem = this.titles[index - 1];
      const modifiedTitle = newItem.title.replace(/ /g, "-");
      this.$router.push({
        name:
          this.$route.params.locale == undefined
            ? "blogDetail"
            : "en_blogDetail",
        params: {
          title: modifiedTitle,
        },
      });
    },
    getNextBlog(id) {
      const index = this.titles.findIndex((item) => item._id === id);
      if (index == this.titles.length - 1) {
        return;
      }
      const newItem = this.titles[index + 1];
      const modifiedTitle = newItem.title.replace(/ /g, "-");
      this.$router.push({
        name:
          this.$route.params.locale == undefined
            ? "blogDetail"
            : "en_blogDetail",
        params: {
          title: modifiedTitle,
          id: newItem._id,
        },
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getUTCFullYear();

      const daySuffix = getDaySuffix(day);

      return `${day}${daySuffix} ${month}, ${year}`;
    },
    setMetaData() {
      if (this.blog) {
        let metaArray = [
          {
            property: "article:modified_time",
            content: this.blog.uploadTime,
          },
          {
            property: "og:type",
            content: "article",
          },
          {
            name: "Keywords",
            content:
              "PDF tools, online PDF editor, PDF converter, merge PDF, split PDF, compress PDF, edit PDF, convert to PDF, PDF merge, PDF split, PDF compression, editable PDF, online PDF suite, PDF utility",
          },
          {
            property: "og:title",
            content: this.blog.title,
          },
        ];
        if (this.blog.metaData.length > 0) {
          this.blog.metaData.forEach((data) => {
            if (data.title.length > 0 && data.content.length) {
              metaArray.push({
                vmid: data.title,
                name: data.title,
                content: data.content, // Bind meta content to the data property metaTitle
              });
            }
          });
        }
        return { title: this.blog.title, meta: metaArray };
      }
    },
    moveMetaTagToTop() {
      setTimeout(() => {
        const metaTags = document.querySelectorAll("meta");
        metaTags.forEach((tag) => {
          document.head.insertBefore(tag, document.head.firstElementChild);
        });
      }, 500);
    },
  },
};
</script>

<style scoped>
.ad-span {
  color: #ff7c03;
  margin: 0px 10px;
}
.blog-address span {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
}
.blog-title-area {
  background-color: #ffecdb;
  padding-top: 55px;
  padding-left: 100px;
}
.blog-date {
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 500;
  line-height: 46px;
  text-align: left;
  margin-top: 20px;
}
.blog-title {
  font-family: Montserrat;
  font-size: 45px;
  font-weight: 700;
  line-height: 61px;
  letter-spacing: -0.05em;
  margin-bottom: 30px;
}
.blog-img {
  width: 600px;
}
.blog-content-area {
  background-color: #fff;
  padding: 55px 100px;
  line-height: 35px;
}
.blog-img-wrapper {
  position: relative;
  height: 345px;
}
.blog-img-wrapper img {
  position: absolute;
}

.blog-social {
  display: inline-flex;
  position: absolute;
  left: 625px;
  display: flow;
}

.blog-social .social {
  background-color: #405594;
  border-radius: 50%;
  margin-right: 10px;
  width: 35px;
  height: 35px;
  padding: 7px 4px 6px 11px;
  color: #fff;
  margin-bottom: 5px;
}
.blog-pagination {
  margin-top: 80px;
  display: flex;
  width: 100%;
  position: relative;
}
.blog-btn {
  border: solid 1px #ff7c03;
  padding: 15px 10px;
  border-radius: 9px;
  position: absolute;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0.18em;
}
.blog-btn:hover {
  cursor: pointer;
  background-color: #ff7c03;
  color: #fff;
}
.blog-next {
  right: 0px;
}
.face-social {
  background-color: #6eabe7 !important;
}
@media (max-width: 640px) {
  .blog-title-area {
    padding: 20px;
  }
  .blog-img-wrapper {
    position: sticky;
    height: 250px;
  }
  .blog-date {
    font-size: 19px;
  }
  .blog-title {
    font-size: 25px;
    line-height: normal;
  }
  .blog-img {
    width: 89%;
  }
  .blog-social {
    left: 92%;
  }
  .blog-content-area {
    padding: 15px;
  }
  .blog-pagination {
    margin-top: 23px;
    margin-bottom: 70px;
  }
}
</style>
