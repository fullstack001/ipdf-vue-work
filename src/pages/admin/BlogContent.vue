<template>
  <div class="text-center blog-container">
    <h2>Blog Contents</h2>
    <div class="btn btn-success" @click="newBlog">New Blog</div>
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
    <BlogModal
      :title="title"
      :oldBlog="editBlog"
      v-if="modalValidate"
      @close="modalValidate = false"
      @saveBlog="createBlog"
      @updateBlog="updateBlog"
    />
  </div>
</template>
<script>
import Vue from "vue";
import BlogModal from "./BlogModal.vue";
export default {
  components: {
    BlogModal,
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
  created() {
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
          this.$router.replace("/admin");
        });
    },
    newBlog() {
      this.title = "New Blog";
      this.modalValidate = true;
      this.saveType = "new";
    },
    editItem(blog) {
      this.title = "Edit Blog";
      this.editBlog = blog;
      this.saveType = "update";
      this.modalValidate = true;
    },
    createBlog(data) {
      console.log(data);
      this.$axios
        .post("/admin/blog", data)
        .then((res) => {
          this.blogs = res.data;
          this.pagination();
        })
        .catch((err) => this.$router.replace("/admin"));
      this.modalValidate = false;
    },
    updateBlog(data) {
      console.log(data);
      data.uploadTime = Date.now();
      this.$axios
        .put(`admin/blog/${this.editBlog._id}`, data)
        .then((res) => {
          const index = this.blogs.indexOf(this.editBlog);
          Vue.set(this.blogs, index, res.data);
          this.pagination();
        })
        .catch((err) => console.log(err));
      this.modalValidate = false;
    },
    pagination() {
      const start = (this.page - 1) * 5;
      const length =
        this.blogs.lenght > this.page * 5
          ? 5
          : this.blogs.length - (this.page - 1) * 5 + 1;
      this.disBlogs =
        this.blogs.length > 5 ? this.blogs.slice(start, length) : this.blogs;
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
  width: 80%;
}
.blog-item {
  display: flex;
  width: 70%;
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
  margin-top: 40px;
}
.blog-btn {
  font-size: 25px;
  margin-top: 35px;
  margin-right: 15px;
}
.blog-btn:hover {
  color: #f00;
}
</style>
