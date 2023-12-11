<template>
  <div class="file-selector">
    <md-button class="md-icon-button" @click="driveIconClicked()">
      <md-icon>add_to_drive</md-icon>
      <md-tooltip md-direction="right" v-show="buttonStyle == 'download'">
        Download from Google Driver
      </md-tooltip>
      <md-tooltip md-direction="top" v-show="buttonStyle == 'upload'"
        >Upload to Google Driver</md-tooltip
      >
    </md-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Attachment",
  props: ["buttonStyle", "file"],
  data() {
    return {
      isSignedIn: false,
      googleUserProfile: {},
      pickerApiLoaded: false,
      developerKey: "Your-Develop-Key",
      clientId: "Your-Deveop-Key",
      // developerKey: "AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU",
      // clientId:
      //   "555210504768-28vlqb2lqnjnhq1ch9d1c5fo9f9smuun.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/drive",
      oauthToken: null,
      selectedFile: null,
    };
  },
  mounted() {
    let gDrive = document.createElement("script");
    gDrive.setAttribute("type", "text/javascript");
    gDrive.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gDrive);
  },
  methods: {
    async driveIconClicked() {
      await gapi.load("client:auth2", () => {
        gapi.auth2.authorize(
          {
            client_id: this.clientId,
            scope: this.scope,
            immediate: false,
            plugin_name: "GoogleAuth",
          },
          this.handleAuthResult
        );
      }),
        gapi.load("picker", () => {
          this.pickerApiLoaded = true;
        });
    },

    handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        this.buttonStyle == "download"
          ? this.createPicker()
          : this.processFiles(this.file);
      } else {
        console.log("error:", authResult);
      }
    },

    // Create and render a Picker object for picking user Photos.
    createPicker() {
      if (this.pickerApiLoaded && this.oauthToken) {
        const view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("application/pdf");
        var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setDeveloperKey(this.developerKey)
          .setOAuthToken(this.oauthToken)
          .addView(view)
          // .addView(new google.picker.DocsUploadView())
          .setCallback(this.pickerCallback)
          .build();

        picker.setVisible(true);
      } else {
        console.log("error !!!");
      }
    },

    async pickerCallback(data) {
      if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        let docs = data.docs;
        let attachments = [];
        for (let i = 0; i < docs.length; i++) {
          this.getFileContentFromGoogleDrive(docs[i].id).then((url) => {
            let attachment = {
              name: docs[i].name,
              size: docs[i].sizeBytes,
              link: url,
            };
            console.log(attachment);
            attachments.push(attachment);
            if (attachments.length == docs.length) {
              this.$emit("picked", attachments);
            }
          });
        }
      }
    },
    getFileContentFromGoogleDrive(id) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var getUrl =
          "https://www.googleapis.com/drive/v3/files/" + id + "?alt=media";
        xhr.open("GET", getUrl, true);
        xhr.setRequestHeader("Authorization", "Bearer " + this.oauthToken);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
          console.log(xhr.response);
          const blob = new Blob([xhr.response], {
            type: "application/pdf",
          });
          const blobURL = URL.createObjectURL(blob);
          resolve(blobURL);
        };
        xhr.send();
      });
    },
    processFiles(files) {
      console.log(files);
      const formData = new FormData();
      formData.append("file", files.file);
      formData.append(
        "metadata",
        new Blob(
          [
            JSON.stringify({
              name: files.name,
            }),
          ],
          { type: "application/pdf" }
        )
      );

      formData.append("name", files.name);
      // formData.append("parents", this.currentFolder.folderId);

      axios
        .post("https://www.googleapis.com/upload/drive/v3/files", formData, {
          headers: {
            Authorization: `Bearer ${this.oauthToken}`,
            "Content-Type": "multipart/related; boundary=my-custom-boundary",
            // Set the file name in the Content-Disposition header
            "Content-Disposition": `file; filename="${files.name}"`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
