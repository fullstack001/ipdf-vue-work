<template>
  <div class="file-selector">
    <button class="md-icon-button gdrive_btn" @click="driveIconClicked()">
      <md-icon>add_to_drive</md-icon>
      <md-tooltip md-direction="right" v-show="buttonStyle == 'download'">
        {{ $t("toolTip.sel_google") }}
      </md-tooltip>
      <md-tooltip md-direction="top" v-show="buttonStyle == 'upload'">{{
        $t("toolTip.save_google")
      }}</md-tooltip>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { gDrive_clientId, gDrive_dev_key } from "./key_env";
export default {
  name: "Attachment",
  props: ["buttonStyle", "file"],
  data() {
    return {
      isSignedIn: false,
      googleUserProfile: {},
      pickerApiLoaded: false,
      developerKey: gDrive_dev_key,
      clientId: gDrive_clientId,
      scope: "https://www.googleapis.com/auth/drive",
      oauthToken: null,
      selectedFile: null,
    };
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
          : this.getOrCreatePdfDenFolder();
        // : this.processFiles(this.file);
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

    async authenticate() {
      await gapi.client.init({
        apiKey: this.developerKey,
        clientId: this.clientId,
        scope: "https://www.googleapis.com/auth/drive.file",
      });

      // await gapi.auth2.getAuthInstance().signIn();
    },

    async listFilesInRoot() {
      // const accessToken = gapi.auth.getToken().access_token;

      try {
        const response = await this.$axios.get(
          "https://www.googleapis.com/drive/v3/files",
          {
            headers: {
              Authorization: `Bearer ${this.oauthToken}`,
            },
            params: {
              q: "name='pdfDen' and mimeType='application/vnd.google-apps.folder'",
            },
          }
        );

        return response.data.files;
      } catch (error) {
        console.error("Error listing files:", error);
        throw error;
      }
    },

    async createPdfDenFolder() {
      const accessToken = gapi.auth.getToken().access_token;

      const folderData = {
        name: "pdfDen",
        mimeType: "application/vnd.google-apps.folder",
      };

      try {
        const response = await this.$axios.post(
          "https://www.googleapis.com/drive/v3/files",
          folderData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data.id;
      } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
      }
    },

    async getOrCreatePdfDenFolder() {
      try {
        // await this.authenticate();

        const pdfDenFolder = await this.listFilesInRoot();

        if (pdfDenFolder.length > 0) {
          const folderId = pdfDenFolder[0].id;
          console.log("pdfDen folder exists. ID:", folderId);
          this.processFiles(this.file, folderId);
        } else {
          const newFolderId = await this.createPdfDenFolder();
          console.log("pdfDen folder created. ID:", newFolderId);
          this.processFiles(this.file, newFolderId);
        }
      } catch (error) {
        console.error("Error getting or creating pdfDen folder:", error);
      }
    },

    processFiles(files, folderId) {
      console.log(files);
      console.log(folderId);
      const formData = new FormData();
      formData.append("file", files.file);
      formData.append(
        "metadata",
        new Blob([JSON.stringify({ name: files.name, parents: [folderId] })], {
          type: "application/json",
        })
      );

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
          this.$swal(
            "Success!",
            "Your file has saved in Google Drive.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.gdrive_btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 2px #ff7c03;
  margin-bottom: 15px;
  margin-top: 0px;
  cursor: pointer;
  background-color: transparent;
}

.gdrive_btn i {
  color: #000 !important;
}

.gdrive_btn:hover {
  background-color: #ff7c03;
}
</style>
