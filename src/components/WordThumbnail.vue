<!-- WordDocumentViewer.vue -->
<template>
  <div>
    <div class="thumbnail" ref="thumbnail"></div>
    <div class="content" v-html="0"></div>
  </div>
</template>

<script>
import mammoth from "mammoth";
import html2canvas from "html2canvas";

export default {
  props: {
    fileUrl: {
      required: true,
    },
  },
  data() {
    return {
      url: this.fileUrl,
      pages: [],
    };
  },
  mount() {
    console.log(url);
    this.getWordDocument();
  },
  methods: {
    async getWordDocument() {
      const file = this.url;
      console.log(file);

      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const result = await mammoth.extractRawText({
              arrayBuffer: e.target.result,
            });
            this.pages = result.value.split("\n");
            console.log(this.pages);

            this.captureThumbnail();
          } catch (error) {
            console.error("Error loading Word document:", error);
          }
        };

        reader.readAsArrayBuffer(file);
      }
    },

    async captureThumbnail() {
      const content = this.$refs.thumbnail;

      await html2canvas(content, { scale: 0.2 }).then((canvas) => {
        content.appendChild(canvas);
      });
    },
  },
};
</script>

<style scoped>
.page {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin-right: 10px;
}

.thumbnail canvas {
  width: 100%;
  height: auto;
}
</style>
