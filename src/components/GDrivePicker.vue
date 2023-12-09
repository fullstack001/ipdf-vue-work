<template>
  <md-button class="md-icon-button" @click="driveIconClicked()">
    <md-icon>add_to_drive</md-icon>
  </md-button>
</template>
<script>
export default {
  data() {
    return {
      pickerApiLoaded: false,
      developerKey: "AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU",
      clientId:
        "555210504768-28vlqb2lqnjnhq1ch9d1c5fo9f9smuun.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/drive.readonly",
      oauthToken: null,
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
      await gapi.load("auth2", () => {
        gapi.auth2.authorize(
          {
            client_id: this.clientId,
            scope: this.scope,
            immediate: false,
          },
          this.handleAuthResult
        );
      });
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
    createPicker() {
      console.log("Create Picker", google.picker);
      if (this.pickerApiLoaded && this.oauthToken) {
        var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .addView(google.picker.ViewId.DOCS)
          .setOAuthToken(this.oauthToken)
          .setDeveloperKey("AIzaSyDNmRpOk4dHkpk2c8TZLC5ZGOCWxVUfZbU")
          .setCallback(this.pickerCallback)
          .build();
        picker.setVisible(true);
      }
    },
    async pickerCallback(data) {
      console.log("PickerCallback", data);
      var url = "nothing";
      var name = "nothing";
      if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        var docs = data.docs;
        console.log(docs);
      }
    },
  },
};
</script>
