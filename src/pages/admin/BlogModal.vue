<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <!-- header -->
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
        </div>
        <!-- body -->
        <div class="modal-body">
          <div class="blog-title blog-item">
            <span>Title:</span>
            <input type="text" v-model="blogTitle" />
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
                <div
                  class="blog-remove-btn"
                  @click="remove"
                  title="Remove file"
                >
                  <i class="fa fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="blog-content blog-item">
            <span>Content:</span>
            <ckeditor :editor="editor" v-model="editorData"></ckeditor>
          </div>
        </div>
        <div class="modal-footer">
          <button class="apply-btn" @click="saveBlog">Save</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.css";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    oldBlog: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isDragging: false,
      img: null,
      imgURL: null,
      fileName: "",
      blogTitle: "",
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
    };
  },
  watch: {
    oldBlog: {
      immediate: true, // Execute the handler immediately after component creation
      handler(newValue, oldValue) {
        console.log(newValue);
        if (newValue) {
          this.imgURL = newValue.img;
          this.blogTitle = newValue.title;
          this.editorData = newValue.content;
        }
      },
    },
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Escape") this.$emit("close");
    });
  },
  computed: {},
  methods: {
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

    saveBlog() {
      const blog = {
        title: this.blogTitle,
        img: this.imgURL,
        content: this.editorData,
      };
      if (this.title === "New Blog") {
        this.$emit("saveBlog", blog);
      } else {
        this.$emit("updateBlog", blog);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//animations
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}
// .modal-content {
//   width: 100vh;
//   overflow-y: auto;
// }
.apply-btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 8px 20px;
  text-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 8px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -webkit-transition: all 0.1s linear;
  -o-transition: all 0.1s linear;
  transition: all 0.1s linear;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0;
  min-height: 42px;
  color: #fff;
  background-color: #e5322d;
}
.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  position: relative;
  max-width: 800px !important;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;

  @media screen and (min-width: 900px) {
    min-width: 900px;
    min-height: 600px;
  }
}

.modal-header {
  display: flex;
  align-self: left;
  justify-content: space-between;
  padding-top: 0px !important;

  span {
    font-size: 24px;
  }
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
  margin: 10px;
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

.blog-preview-img {
  position: absolute;
  top: 15px;
  right: 328px;
  max-height: 100px;
}
.input-click {
  margin-top: 50px;
}
</style>
