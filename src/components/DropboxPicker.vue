<template>
  <div>
    <div
      v-if="
        scriptLoaded && dropboxChooserIsSupported && buttonType == 'chooser'
      "
      @click="dropboxIconClicked"
    >
      <a class="dropbox-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="#FFF"
            d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
          ></path>
        </svg>
      </a>
    </div>
    <div
      v-if="scriptLoaded && dropboxChooserIsSupported && buttonType == 'saver'"
      @click="dropboxSaverIconClicked"
    >
      <a class="dropbox-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="#FFF"
            d="M5.3475,0.7035 L0.096,4.125 L3.708,7.03725 L9.018,3.765 L5.3475,0.7035 Z M17.904,4.14 L12.66525,0.7275 L9.01875,3.7725 L14.29875,7.03875 L17.904,4.14 Z M9.01875,10.305 L12.66525,13.35975 L17.904,9.945 L14.2995,7.0395 L9.01875,10.305 Z M0.096,9.9585 L5.3475,13.35975 L9.01875,10.305 L3.70875,7.0455 L0.096,9.9585 Z M9.01875,10.9635 L5.35575,14.0385 L3.786,13.02 L3.786,14.16 L9.01875,17.30475 L14.271,14.15175 L14.271,13.0125 L12.693,14.031 L9.01875,10.9635 Z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    linkType: {
      type: String,
      default: "preview",
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    extensions: {
      type: Array,
      default: function () {
        return [];
      },
    },
    folderselect: {
      type: Boolean,
      default: false,
    },
    sizeLimit: {
      type: Number,
      default: 0,
    },
    buttonType: {
      type: String,
      default: "chooser",
    },
    uploadFiles: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data: () => ({
    scriptLoaded: true,
    dropboxChooserIsSupported: true,
  }),
  mounted() {
    if (window.Dropbox) {
      this.scriptLoaded = true;
    } else {
      const dropBoxScript = document.createElement("script");
      dropBoxScript.onload = () => {
        this.scriptLoaded = true;
        this.dropboxChooserIsSupported = window.Dropbox.isBrowserSupported();

        if (!this.dropboxChooserIsSupported) {
          console.warn("VueDropboxPicker: This browser is not supported");
        }
      };
      dropBoxScript.setAttribute(
        "src",
        "https://www.dropbox.com/static/api/2/dropins.js"
      );
      dropBoxScript.setAttribute("id", "dropboxjs");
      dropBoxScript.setAttribute("data-app-key", this.apiKey);
      document.head.appendChild(dropBoxScript);
    }
  },
  methods: {
    dropboxIconClicked() {
      let options = {
        success: async (files) => {
          console.log(files);
          let attachments = [];
          for (let i = 0; i < files.length; i++) {
            let attachment = {};
            attachment._id = files[i].id;
            attachment.name = files[i].name;
            attachment.size = files[i].bytes;
            attachment.iconURL = files[i].icon;
            attachment.link = files[i].link;
            attachment.extension = `. ${files[i].name.split(".")[1]}`;
            attachments.push(attachment);
          }
          this.tempAttachments = attachments;
          this.$emit("picked", this.tempAttachments);
        },

        cancel: function () {
          console.log("dropbox_canceled");
        },

        linkType: this.linkType,
        multiselect: this.multiselect,
        folderselect: this.folderselect,
      };
      if (this.extensions.length) {
        options.extensions = this.extensions;
      }

      if (this.sizeLimit) {
        options.sizeLimit = this.sizeLimit;
      }
      window.Dropbox.choose(options);
    },
    dropboxSaverIconClicked() {
      console.log(this.uploadFiles);
      let options = {
        files: [
          {
            url: this.uploadFiles[0],
            filename: "merged_pdf.pdf",
          },
        ],
        // success: function () {
        //   this.$emit("saved");
        // },
        // cancel: function () {
        //   this.$emit("cancel");
        // },
        // progress: function (progress) {
        //   this.$emit("progress", { progress: progress });
        // },
        // error: function (errorMessage) {
        //   this.$emit("error", { errorMessage: errorMessage });
        // },
        success: function () {
          // Handle successful save
          console.log("File saved to Dropbox successfully");
        },
        cancel: function () {
          // Handle cancelation of the save
          console.log("Save to Dropbox canceled");
        },
        error: function (errorMessage) {
          // Handle error during save
          console.error("Error saving to Dropbox:", errorMessage);
        },
      };
      // if (this.extensions.length) {
      //   options.extensions = this.extensions;
      // }

      // if (this.sizeLimit) {
      //   options.sizeLimit = this.sizeLimit;
      // }
      window.Dropbox.save(options);
    },
  },
};
</script>

<style scoped>
.dropbox-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5322d;
  padding: 11px;
  cursor: pointer;
}
</style>
