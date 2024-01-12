<template>
  <div class="main">
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      :style="
        () => {
          isDragging && 'border-color: green;';
          !img && 'padding:4rem';
        }
      "
    >
      <input
        type="file"
        name="file"
        id="fileInput1"
        class="hidden-input"
        @change="onChange"
        ref="file1"
        accept=".jpg,.jpeg,.png"
      />

      <label for="fileInput1" class="file-label" v-if="!img">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
      <div class="preview-container mt-4" v-if="img">
        <div class="preview-card">
          <div><img class="preview-img" :src="generateURL(img)" /></div>
          <div>
            <button
              class="ml-2"
              type="button"
              @click="remove"
              title="Remove file"
            >
              <b>×</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      img: null,
    };
  },
  methods: {
    onChange() {
      this.img = this.$refs.file1.files[0];
      console.log(this.img);
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
      this.$refs.file1.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove() {
      this.img = null;
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  },
};
</script>
<style scoped src="@/assets/dropfile.css"></style>
