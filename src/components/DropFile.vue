<template>
  <div class="stamp-area">
    <div
      class="stamp-dropzone-container"
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
        :name="data"
        :id="data"
        hidden
        @change="onChange"
        :ref="data"
        accept=".jpg,.jpeg,.png"
      />

      <label :for="data" class="file-label" v-if="!img">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
      <div class="stamp-preview-container" v-if="img">
        <img class="stamp-preview-img" width="100" :src="generateURL(img)" />

        <div class="stamp-remove-btn" @click="remove" title="Remove file">
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dataURItoBlob = (dataURI) => {
  const bytes =
    dataURI.split(",")[0].indexOf("base64") >= 0
      ? atob(dataURI.split(",")[1])
      : unescape(dataURI.split(",")[1]);
  const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};

const resizeImage = ({ file, maxSize }) => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");

  const resize = () => {
    let { width, height } = image;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/png");
    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }

    reader.onload = (readerEvent) => {
      image.onload = () => ok(resize());
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
};

export default {
  data() {
    return {
      isDragging: false,
      img: null,
      originalImg: null,
      resizeImage: null,
    };
  },
  props: ["data"],
  methods: {
    async onChange() {
      this.img = document.getElementById(this.data).files[0];
      this.fileName = this.img.name;

      const reader = new FileReader();
      reader.onload = (e) => (this.originalImg = e.target.result);
      reader.readAsDataURL(this.img); // convert to base64 string
      // END: preview original

      // START: preview resized
      await resizeImage({ file: this.img, maxSize: 150 })
        .then((resizedImage) => {
          this.resizedImg = URL.createObjectURL(resizedImage);
          this.$emit("set_stamp", this.resizeImage);
        })
        .catch((err) => {
          console.error(err);
        });
      // END: preview resized
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
      this.isDragging = false;
    },
    remove() {
      this.img = null;
      this.$emit("set_stamp", null);
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
<style>
.stamp-area {
  background-color: #e2d5d5;
  margin: 25px;
  text-align: center;
  height: 230px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
  margin-top: 80px;
}
.stamp-dropzone-container {
  padding: 30px;
  position: relative;
}
.stamp-remove-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 18px;
  cursor: pointer;
}
.stamp-remove-btn:hover {
  color: #f00;
}
.stamp-preview-container {
  height: 200px;
}
.stamp-preview-img {
  position: absolute;
  bottom: 90px;
  right: 300px;
}
</style>
