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
    console.log("Gdrive:", gDrive);
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

    async pickerCallback(data) {
      var url = "nothing";
      var name = "nothing";
      if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        console.log(data);
        url = doc[google.picker.Document.URL];
        name = doc.name;
        let docs = data.docs;
        var param = { fileId: doc.id, oAuthToken: this.oauthToken, name: name };
        let attachments = [];
        for (let i = 0; i < docs.length; i++) {
          console.log(docs[i]);
          let attachment = {};
          attachment.name = docs[i].name;
          attachment.size = docs[i].sizeBytes;
          attachment.link = docs[i].url;
          attachments.push(attachment);
        }
        this.tempAttachments = [...attachments];
        console.log(this.tempAttachments);
        this.$emit("picked", this.tempAttachments);
      }
    },
  },
};
</script>
