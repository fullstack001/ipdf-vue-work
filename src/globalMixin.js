import { setTimeout } from "core-js/web";

export const fileHandlingMixin = {
  methods: {
    open_add_local() {
      this.$refs.file.click();
    },
    openFilePicker() {
      this.$refs.file.click();
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    },
    onChange() {
      const files = this.$refs.file.files;
      this.handleFiles(files);
    },
    onPickedDropbox(files) {
      this.handleFiles(files);
    },
    onPickedGoogleDriver(files) {
      this.handleFiles(files);
    },
  },
};

export const metaTagMixin = {
  mounted() {
    this.moveMetaTagToTop();
  },
  onUpdated() {
    this.moveMetaTagToTop();
  },
  methods: {
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
