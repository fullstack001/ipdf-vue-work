<template>
  <div class="blog-editer-container">
    <h3>{{ title }}</h3>
    <!-- header -->

    <!-- body -->
    <div class="blog-editter-body">
      <div class="blog-title blog-item">
        <span>Title:</span>
        <div>
          <input type="text" v-model="blogTitle" />
          <button class="save-btn btn btn-success" @click="saveBlog">
            Save
          </button>
        </div>
      </div>
      <div class="blog-img blog-item">
        <span>Image:</span>
        <div
          class="blog-dropzone-container"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
        >
          <input
            type="file"
            hidden
            @change="onChange"
            name="file"
            id="file"
            ref="file"
            accept=".jpg,.jpeg,.png"
          />

          <label for="file" class="file-label text-center" v-if="!imgURL">
            <div v-if="isDragging">Release to drop files here.</div>
            <div v-else class="input-click">
              Drop files here or <u>click here</u> to upload.
            </div>
          </label>
          <div class="blog-preview-container" v-if="imgURL">
            <img class="blog-preview-img" :src="imgURL" height="100" />
            <div class="blog-remove-btn" @click="remove" title="Remove file">
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="blog-item">
        <span>Search Keys:</span>
        <div v-for="(meta, index) in metas" :key="index">
          <div class="ml-3 meta-item">
            <div class="meta-info">Meta Title{{ index + 1 }}</div>
            <input type="text" v-model="meta.title" />
          </div>
          <div class="ml-3 meta-item">
            <div class="meta-info">Meta Content{{ index + 1 }}</div>
            <input type="text" v-model="meta.content" />
          </div>
        </div>
      </div>

      <div class="blog-item">
        <span>Favorite:</span>
        <div style="margin-left: 30px">
          <md-switch v-model="blogAvail" class="md-primary"></md-switch>
          <!-- <button
            class="available-btn btn btn-warning ml-4 mt-2"
            @click="blogAvail = true"
            :class="{ 'active-avail': blogAvail }"
          >
            On
          </button>
          <button
            class="available-btn btn btn-danger ml-4 mt-2"
            @click="blogAvail = false"
            :class="{ 'active-avail': !blogAvail }"
          >
            Off
          </button> -->
        </div>
      </div>
      <div class="blog-content blog-item">
        <span>Content:</span>
        <ckeditor :editor="editor" v-model="editorData"></ckeditor>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      isDragging: false,
      imgURL: null,
      blogTitle: "",
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      title: "",
      metaTitle: "",
      metaContent: "",
      metas: [
        { title: "", content: "" },
        { title: "", content: "" },
        { title: "", content: "" },
      ],
      blogAvail: true,
    };
  },
  created() {
    if (this.$route.params.title == "New Blog") {
      this.title = this.$route.params.title;
    } else if (this.$route.params.title == "Edit Blog") {
      this.title = this.$route.params.title;
      this.fetchData(this.$route.params.id);
    } else {
      this.$router.push({ name: "blogcontent" });
    }
  },
  methods: {
    fetchData(id) {
      this.$axios
        .get(`/pdf/blog/${id}`)
        .then((res) => {
          const blog = res.data.blog;
          this.imgURL = blog.img;
          this.blogAvail = blog.available;
          this.blogTitle = blog.title;
          this.editorData = blog.content;
          this.metas = blog.metaData;
          switch (this.metas.length) {
            case 0:
              this.metas = [
                { title: "", content: "" },
                { title: "", content: "" },
                { title: "", content: "" },
              ];
              break;
            case 1:
              this.metas.push(
                { title: "", content: "" },
                { title: "", content: "" }
              );
              break;
            case 2:
              this.metas.push({ title: "", content: "" });
              break;

            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push({ name: "blogcontent" });
        });
    },
    async onChange() {
      this.img = document.getElementById("file").files[0];
      var blog = this;

      var reader = new FileReader();

      // Set up an event listener for when the file is loaded
      reader.onload = function (event) {
        // event.target.result contains the base64 encoded string
        var base64String = event.target.result;

        // Assign the base64 string to your image source or do whatever you need to do with it
        blog.imgURL = base64String;
      };

      // Read the file as a data URL (base64 encoded)
      reader.readAsDataURL(this.img);
      this.fileName = this.img.name;
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.isDragging = false;
    },
    remove() {
      this.imgURL = null;
    },

    removeMeta(data) {
      this.metas = this.metas.filter((item) => item != data);
    },

    saveBlog() {
      const blog = {
        title: this.blogTitle,
        img: this.imgURL,
        available: this.blogAvail,
        metaData: this.metas,
        content: this.editorData,
        uploadTime: Date.now(),
      };
      const data = JSON.stringify(blog);
      if (this.$route.params.saveType === "new") {
        this.$axios
          .post("admin/blog", { data: data })
          .then((res) => {
            console.log(res.data);
            this.$swal("Success!", "New Blog have added", "success");
            this.$nextTick().then(() => {
              // Now, the DOM has been updated, and you can safely execute the next statement
              this.$router.push({ name: "blogcontent" });
            });
          })
          .catch((err) => {
            console.log(err);
            this.$router.push({ name: "blogcontent" });
          });
      } else {
        this.$axios
          .put(`admin/blog/${this.$route.params.id}`, { data: data })
          .then((res) => {
            console.log(res.data);
            this.$swal("Success!", "Blog have updated", "success");
            this.$nextTick().then(() => {
              // Now, the DOM has been updated, and you can safely execute the next statement
              this.$router.push({ name: "blogcontent" });
            });
          })
          .catch((err) => {
            console.log(err);
            this.$router.push({ name: "blogcontent" });
          });
      }
    },
  },
};
</script>
<style>
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: var(--ck-color-base-border);
  height: 400px;
}
</style>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>

<style lang="scss" scoped>
.blog-editer-container {
  margin: 30px;
  margin-top: 50px;
}
.meta-info {
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0;
}

.blog-item {
  text-align: left;
  display: grid;
  margin: 20px 5px;

  span {
    font-size: 18px;
    font-weight: 600;
  }
  input {
    height: 41px;
    width: 85%;
    border-radius: 9px;
    font-size: 20px;
    padding: 0 10px;
  }
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.blog-dropzone-container {
  position: relative;
  margin: 10px 0px;
  background-color: #dfd060;
  height: 120px;
}
.blog-remove-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 18px;
  cursor: pointer;
}
.blog-remove-btn:hover {
  color: #f00;
}
.blog-content {
  min-height: 400px;
  max-height: 400px;
}
.ck-content {
  min-height: 300px !important;
}
.blog-preview-img {
  position: absolute;
  top: 15px;
  right: 50%;
  max-height: 100px;
}
.input-click {
  margin-top: 50px;
}
.save-btn {
  margin-left: 10%;
}
.meta-item {
  font-size: 18px;
  margin-left: 40px;
  font-weight: 500;
  display: flex;
}
.meta-btn {
  margin: 0 20px;
  cursor: pointer;
}
.meta-info {
  width: 115px;
  margin-right: 20px;
}
.meta-item {
  display: flex;
  margin-bottom: 5px;
}
.meta-btn:hover {
  color: #f00;
}
.active-avail {
  box-shadow: 0 0px 5px 4px rgba(8, 4, 230, 0.5);
}
</style>
