<template>
  <div class="text-center blog-container">
    <h2>Blog Contents</h2>
    <div class="btn btn-success" @click="newBlog">New Blog</div>
    <BlogModal
      :title="'New Blog'"
      v-if="modalValidate"
      @close="modalValidate = false"
    />
  </div>
</template>
<script>
import BlogModal from "./BlogModal.vue";
export default {
  components: {
    BlogModal,
  },
  data() {
    return {
      modalValidate: false,
      title: "New Blog",
    };
  },
  methods: {
    newBlog() {
      this.title = "New Blog";
      this.modalValidate = true;
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
</style>
