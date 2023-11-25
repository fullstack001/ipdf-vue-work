<template>
  <div class="download-page">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <div class="page-title">Download PDF File</div>
    <div class="page-description">PDFs have been merged!</div>
    <div class="download_btn">
      <a id="link" class="download__btn md-raised md-danger">
        Download merged PDF
      </a>
      <div class="add-more">
        <div>
          <md-dialog-confirm
            :md-active.sync="active"
            md-title="Use Google's location service?"
            md-content="Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running."
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-cancel="onCancel"
            @md-confirm="onConfirm"
          />

          <md-button class="md-icon-button" @click="active = true">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="open_add_local">
            <md-icon>add_to_drive</md-icon>
          </md-button>
        </div>
        <div>
          <VueDropboxPicker
            class="cloud dropbox"
            :api-key="'w7vvdh8a5g5av1p'"
            link-type="direct"
            :multiselect="true"
            :extensions="['.pdf', '.doc']"
            :folderselect="false"
            :uploadFiles="uploadToDropboxFiles"
            :buttonType="'saver'"
          />
          <md-button class="md-icon-button" @click="open_add_local">
            <md-icon>link</md-icon>
          </md-button>
        </div>
      </div>
    </div>

    <!-- delete notification -->
    <md-dialog-alert
      :md-active.sync="show_noti"
      md-content="PDF file  has been deleted!"
      md-confirm-text="Cool!"
    />
  </div>
</template>
<script>
import store from "@/store/index";
import axios from "axios";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import Dropbox from "dropbox";
export default {
  components: {
    VueDropboxPicker,
  },
  props: {
    message: String,
    icon: String,
    verticalAlign: {
      type: String,
      default: "top",
    },
    horizontalAlign: {
      type: String,
      default: "center",
    },
    type: {
      type: String,
      default: "info",
    },
    timeout: {
      type: Number,
      default: 1200,
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
    },
  },
  data: () => ({
    uploadToDropboxFiles: [],
    active: false,
    show_noti: false,
  }),
  computed: {
    result() {
      return store.state.result;
    },
  },
  created() {
    console.log(this.$route.params.id);
    const fileUrl = `http://127.0.0.1:5000/uploads/${this.$route.params.id}`; // Replace with your server file URL

    const response = axios.get(fileUrl, {
      responseType: "blob", // Set response type as Blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    this.uploadToDropboxFiles = [url];
  },
  mounted() {
    const link = document.getElementById("link");
    link.download = "merged_pdf.pdf";
    let binaryData = [];
    binaryData.push(this.result);
    link.href = URL.createObjectURL(
      new Blob(binaryData, { type: "application/pdf" })
    );
  },
  methods: {
    async onConfirm() {
      await axios
        .post("http://127.0.0.1:5000/api/pdf/delete", {
          file: this.$route.params.id,
        })
        .then((res) => {
          this.show_noti = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch((err) => console.log(err));
    },
    onCancel() {
      console.log("Cancel");
    },
    open_add_local() {},
  },
};
</script>

<style>
.download-page {
  text-align: center;
}

.download__btn {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 80px;
  min-width: 330px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 24px 48px;
  font-weight: 500;
  font-size: 24px;
  background: #e5322d;
  line-height: 28px;
  vertical-align: middle;
  color: #fff !important;
  text-decoration: none;
  margin-bottom: 12px;
  -webkit-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  border: 0;
  border-radius: 12px;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  -ms-flex-order: 1;
  order: 1;
  max-width: 60vw;
}

.download__btn:hover {
  color: #fff !important;
  background: #e90b03;
}
.download__btn:focus {
  color: #fff !important;
  background: #e90b03;
}

.download_btn {
  color: #fff !important;
  position: relative;
  width: fit-content;
  margin: auto;
}

.add-more {
  width: fit-content;
  position: absolute;
  top: -5px;
  right: -100px;
}

.add-more div {
  display: flex;
}

.add-more div .md-icon-button {
  display: block;
  background-color: #e5322d !important;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 5px;
  margin-right: 5px;
}

.add-more .md-icon-button:hover {
  background-color: #e75651 !important;
}

.dropbox-icon {
  height: 40px;
  margin-right: 5px;
}
</style>
