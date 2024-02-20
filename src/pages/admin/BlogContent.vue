<template>
  <div class="blog-container">
    <h3>Blog Contents</h3>
    <div class="new-blog-wrapper" style="width: 100%">
      <div class="btn btn-success new-blog" @click="newBlog">New Blog</div>
    </div>
    <div class="blog-wrapper" v-if="disBlogs.length > 0">
      <div v-for="blog in disBlogs" :key="blog._id" class="blog-item">
        <img :src="blog.img" alt="" class="blog-img" />
        <div class="blog-title">{{ blog.title }}</div>
        <div class="blog-edit blog-btn" @click="editItem(blog)">
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <div class="blog-remove blog-btn" @click="removeItem(blog)">
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>

    <Pagination
      :max="(blogs.length / 5).toFixed(0) + 1"
      @setPage="(data) => (page = data)"
    />
  </div>
</template>
<script>
import Vue from "vue";
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      modalValidate: false,
      title: "New Blog",
      saveType: "new",
      blogs: [],
      disBlogs: [],
      page: 1,
      editBlog: null,
    };
  },
  watch: {
    page(newValue) {
      this.pagination();
    },
  },
  created() {
    console.log(this.$route.path);
    this.fetchDatas();
  },
  methods: {
    fetchDatas() {
      this.$axios
        .get("/admin/blogs")
        .then((res) => {
          this.blogs = res.data;
          this.disBlogs =
            this.blogs.length > 5 ? this.blogs.slice(0, 5) : this.blogs;
        })
        .catch((err) => {
          console.log(err);
          this.$router.replace("/");
        });
    },
    newBlog() {
      this.$router.push({
        name: "blogediter",
        params: {
          title: "New Blog",
          saveType: "new",
        },
      });
    },
    editItem(blog) {
      this.$router.push({
        name: "blogediter",
        params: {
          title: "Edit Blog",
          saveType: "update",
          id: blog._id,
        },
      });
      this.title = "Edit Blog";
      this.editBlog = blog;
      this.saveType = "update";
      this.modalValidate = true;
    },
    pagination() {
      const start = (this.page - 1) * 5;
      const length =
        this.blogs.length > this.page * 5 ? this.page * 5 : this.blogs.length;
      this.disBlogs = this.blog.slice(start, length);
    },
    removeItem(blog) {
      this.$axios
        .delete(`admin/blog/${blog._id}`)
        .then((res) => {
          this.blogs = this.blogs.filter((item) => item !== blog);
          this.pagination();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>

<style scoped>
.blog-container {
  margin: auto;
  width: 80%;
  margin-top: 50px;
}
.new-blog-wrapper {
  width: 100%;
  text-align: right;
}
.blog-item {
  display: flex;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  background-color: #fff;
  position: relative;
}
.blog-img {
  height: 100px;
}
.blog-title {
  font-size: 25px;
  font-weight: 400;
  margin: auto;
}
.blog-btn {
  font-size: 20px;
  margin-top: 35px;
  margin-right: 15px;
}
.blog-btn:hover {
  color: #f00;
}
</style>
