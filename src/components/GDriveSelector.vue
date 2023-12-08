<template>
  <div class="container">
    <div class="file-selector">
      <md-button class="md-icon-button" @click="driveIconClicked()">
        <md-icon>add_to_drive</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Attachment",
  data() {
    return {
      isSignedIn: false,
      googleUserProfile: {},
      tempAttachments: [],
      attachments: [],
      pickerApiLoaded: false,
      developerKey: "AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU",
      clientId:
        "555210504768-28vlqb2lqnjnhq1ch9d1c5fo9f9smuun.apps.googleusercontent.com",
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

    let gDrive1 = document.createElement("script");
    gDrive1.setAttribute("type", "text/javascript");
    gDrive1.setAttribute("src", "https://apis.google.com/js/platform.js");
    document.head.appendChild(gDrive1);
  },
  methods: {
    // function called on click of drive icon
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
          this.createPicker();
        });
      gapi.load("client:auth2", { callback: this.onAuthApiLoad });
    },

    handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        this.createPicker();
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
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setDeveloperKey("AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU")
          .setAppId("PDFden")
          .setOAuthToken(this.oauthToken)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setCallback(this.pickerCallback)
          .build();
        console.log("picker", picker);

        picker.setVisible(true);
      } else {
        console.log("error !!!");
      }
    },
    onAuthApiLoad() {
      // Initialize the Google API client
      gapi.client
        .init({
          apiKey: "AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
        })
        .then(() => {
          // Handle authentication and other setup if needed
        });
    },

    async pickerCallback(data) {
      var url = "nothing";
      var name = "nothing";
      if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
        name = doc.name;
        let docs = data.docs;
        var param = { fileId: doc.id, oAuthToken: this.oauthToken, name: name };
        let attachments = [];
        for (let i = 0; i < docs.length; i++) {
          let attachment = {};
          attachment.name = docs[i].name;
          attachment.size = docs[i].sizeBytes;
          attachment.id = docs[i].id;
          console.log(docs[0].id);
          this.getFileContentFromGoogleDrive(docs[i].id).then((url) => {
            attachment.link = url;
            console.log(attachment);
            attachments.push(attachment);
            if (attachments.length == docs.length) {
              this.tempAttachments = [...attachments];
              console.log(this.tempAttachments);
              this.$emit("picked", this.tempAttachments);
            }
          });
        }
      }
    },
    // getFileContentFromGoogleDrive(fileId) {
    //   return new Promise((resolve, reject) => {
    //     console.log(fileId);
    //     const apiKey = "AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU"; // Replace with your actual API key

    //     axios
    //       .get(
    //         `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`,
    //         { responseType: "arraybuffer" }
    //       )
    //       .then((response) => {
    //         const pdfArrayBuffer = response.data;
    //         console.log("PDF Array Buffer:", pdfArrayBuffer);
    //         resolve(pdfArrayBuffer);
    //       })
    //       .catch((error) => {
    //         reject("Error fetching PDF:", error);
    //       });

    //     // Now you can use pdfArrayBuffer as needed (e.g., display or save the PDF)
    //   });
    // },

    getFileContentFromGoogleDrive(fileId) {
      return new Promise((resolve, reject) => {
        const url = gapi.client.drive.files
          .get({
            fileId: fileId,
            alt: "media",
          })
          .then(
            (response) => {
              const fileContent = response.body;

              // Convert file content to Blob
              const blob = new Blob([fileContent], { type: "application/pdf" });

              // Use the Blob as needed
              console.log("Blob Object:", blob);

              // Example: Create a URL for the Blob and use it to open a new window
              const blobUrl = URL.createObjectURL(blob);
              window.open(blobUrl, "_blank");
              resolve(blobUrl);
            },
            (error) => {
              console.error("Error getting file content:", error);
            }
          );
      });
    },
    // Implement this function in your Vue.js component
    // async getFileContentFromGoogleDrive(fileId) {
    //   try {
    //     // Make a request to the Google Drive API to get file content
    //     const response = await gapi.client.drive.files.get({
    //       fileId: fileId,
    //       alt: "media",
    //     });

    //     const fileContent = response.body;

    //     // Convert file content to base64
    //     const base64String = await this.arrayBufferToBase64(fileContent);

    //     // Use the base64 string as needed
    //     console.log("Base64 Content:", base64String);
    //     const blob = base64ToBlob(base64String, "application/pdf");
    //     const url = URL.createObjectURL(blob);
    //     return url;
    //     // return `data:application/pdf;base64,${base64String}`;
    //   } catch (error) {
    //     console.error("Error getting file content from Google Drive:", error);
    //   }
    // },
    // arrayBufferToBase64(buffer) {
    //   return new Promise((resolve, reject) => {
    //     const blob = new Blob([buffer], { type: "application/pdf" });

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       const base64String = reader.result.split(",")[1];
    //       resolve(base64String);
    //     };

    //     reader.onerror = (error) => {
    //       reject(error);
    //     };

    //     reader.readAsDataURL(blob);
    //   });
    // },
  },
};
</script>
