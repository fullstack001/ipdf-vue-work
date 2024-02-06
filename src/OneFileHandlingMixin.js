//click add from local button
    open_add_local() {
      this.$refs.file.click();
    },
    //click upload button
    openFilePicker() {
      // Trigger the file input click event when the custom button is clicked
      this.$refs.file.click();
    },
    //download from dropbox
    onPickedDropbox(data) {
      this.handleFile(data[0]);
    },
    onPickedGoogleDriver(data) {
      this.handleFile(data[0]);
    },

    onChange() {
      const data = this.$refs.file.files[0];
      this.handleFile(data);
    },

    handleDrop(event) {
      event.preventDefault();
      let files = event.dataTransfer.files;
      this.handleFile(files);
    },