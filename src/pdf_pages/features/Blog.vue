<template>
  <div class="blog-detail" v-if="blog">
    <div class="blog-title-area">
      <div class="blog-address">
        <span class="ad-span">Home </span>
        <span> > </span>
        <span class="ad-span">Blog</span>
        <span> ></span>
        <span>&nbsp;&nbsp;&nbsp;{{ blog.title }}</span>
      </div>
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
  components: {
    BlogThumbnail,
  },
  created() {
    this.fetchBlogs(this.$route.params.id);
  },
  data() {
    return {
      blog: null,
    };
  },
  methods: {
    fetchBlogs(id) {
      this.$axios
        .get(`/pdf/blog/${id}`)
        .then((res) => {
          console.log(res.data);
          this.blog = res.data;
        })
        .catch((err) => console.log(err));
    },
    getPrevBlog(id) {
      console.log(id);
      this.$axios
        .get(`/pdf/prevBlog/${id}`)
        .then((res) => {
          console.log(res.data);
          this.blog = res.data;
        })
        .catch((err) => console.log(err));
    },
    getNextBlog(id) {
      console.log(id);
      this.$axios
        .get(`/pdf/nextBlog/${id}`)
        .then((res) => {
          console.log(res.data);
          this.blog = res.data;
        })
        .catch((err) => console.log(err));
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getUTCFullYear();

      const daySuffix = getDaySuffix(day);

      return `${day}${daySuffix} ${month}, ${year}`;
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
  min-width: 600px;
  max-width: 600px;
}
.blog-content-area {
  background-color: #fff;
  padding: 55px 100px;
  line-height: 35px;
}
.blog-img-wrapper {
  position: relative;
  min-height: 345px;
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
</style>
