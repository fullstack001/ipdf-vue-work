<template>
  <div class="download-page">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <div class="page-title">Download PDF File</div>
    <div class="page-description">{{ $route.params.dis_text }}</div>
    <div class="download_btn">
      <a
        id="link"
        class="download__btn md-raised md-danger"
        @click="complete_download"
      >
        {{ $route.params.button_title }}
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
          <md-button class="md-icon-button" @click="showDialog = true">
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

    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Preferences</md-dialog-title>
        <md-dialog-content>
          <div class="form__group form__group--btn form__group--btn-lg">
            <div class="input--icon input--world">
              <input
                id="dlink"
                type="text"
                class="input"
                :value="download_urls"
                onclick="this.select();"
                readonly="true"
              />
            </div>
            <button class="btn" id="autoCopy">
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                  class=""
                ></path>
              </svg>
              Copy
            </button>
          </div>
          <qr-code :text="download_urls" :size="250" error-level="H"></qr-code>
          <!-- <QrcodeVue :value="download_url" :size="600" level="H" /> -->
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Close</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import store from "@/store/index";
import axios from "axios";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import Dropbox from "dropbox";
import QrcodeVue from "qrcode.vue";
import VueQRCodeComponent from "vue-qrcode-component";
Vue.component("qr-code", VueQRCodeComponent);

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
    showDialog: false,
    download_urls: "",
  }),
  computed: {
    result() {
      return store.state.result;
    },
  },
  async created() {
    this.download_urls = `http://127.0.0.1${this.$route.path}`;
    if (!this.result) {
      try {
        const downloadURL = `http://127.0.0.1:5000/api/pdf/download/${this.$route.params.id}`;
        console.log(this.$route.params);
        const name = "pdfden." + this.$route.params.id.split(".")[1];

        // Make a GET request to the server endpoint to download the file
        const response = await axios.get(downloadURL, { responseType: "blob" });
        console.log(response);
        // Create a link and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.$router.push("/");
      } catch (error) {
        console.error("Error downloading file:", error);
        // Handle error
      }
    }
  },
  mounted() {
    const link = document.getElementById("link");
    link.download = this.$route.params.down_name;
    let binaryData = [];
    binaryData.push(this.result);
    link.href = URL.createObjectURL(
      new Blob(binaryData, { type: this.$route.params.file_type })
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
    complete_download() {
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
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
.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
}
</style>
