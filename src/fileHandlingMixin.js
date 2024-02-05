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
