<template>
  <div>
    <label for="file-upload" class="custom-file-upload">
      {{ buttonText }}
    </label>
    <input
      id="file-upload"
      type="file"
      style="display: none"
      @change="handleFileUpload"
      ref="fileInput"
    />
    <div v-if="selectedFile">
      <p>Selected file: {{ selectedFile.name }}</p>
      <!-- Add more logic here to handle file processing or display -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      buttonText: "Select a file",
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        // Perform additional actions with the selected file if needed
        // For example, you can emit an event or send it to the server
      }
    },
    openFilePicker() {
      // Trigger the file input click event when the custom button is clicked
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style>
/* Style your custom file upload button */
.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
}

/* Add additional styling as needed */
</style>
