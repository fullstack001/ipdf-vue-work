<template>
  <div class="download-page">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <div class="page-title">Download PDF File</div>
    <div class="page-description">{{ dis_text }}</div>
    <div class="download_btn">
      <a class="md-icon-button back-btn" @click="back_page">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16">
          <path
            d="M6.533 15.065L.438 8.968c-.116-.116-.208-.255-.27-.4a1.27 1.27 0 0 1 .009-.971c.066-.155.16-.296.277-.415l6.21-6.21A1.27 1.27 0 0 1 8.461.947c.49.49.485 1.295-.017 1.797l-4.02 4.02 10.47-.097a1.24 1.24 0 0 1 1.258 1.258 1.3 1.3 0 0 1-1.282 1.282L4.4 9.305l3.947 3.947c.49.492.485 1.295-.017 1.797s-1.306.508-1.797.017z"
            fill="#fff"
            fill-rule="nonzero"
          ></path>
        </svg>
      </a>
      <a id="link" class="download__btn md-raised md-danger">
        {{ button_title }}
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
            <md-tooltip md-direction="top">Delete it now</md-tooltip>
          </md-button>
          <md-button class="md-icon-button" @click="open_add_local">
            <md-icon>add_to_drive</md-icon>
            <md-tooltip md-direction="top">Save to Google Driver</md-tooltip>
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
          <md-button
            class="md-icon-button download-more"
            @click="showDialog = true"
          >
            <md-icon>link</md-icon>
            <md-tooltip md-direction="bottom"
              >Share file link or QRcode</md-tooltip
            >
          </md-button>
        </div>
      </div>
      <div class="extra-work">
        <button class="download-more" @click="go_merge">
          <img :src="require(`@/assets/feature_img/merge_pdf.svg`)" />
          <md-tooltip md-direction="bottom">Continue to Merge PDF</md-tooltip>
        </button>
        <button class="download-more" @click="go_split">
          <img :src="require(`@/assets/feature_img/split_pdf.svg`)" />
          <md-tooltip md-direction="bottom">Continue to Split PDF</md-tooltip>
        </button>
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
        <md-dialog-title>Copy & Send download link</md-dialog-title>
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
                ref="linkInput"
              />
            </div>
            <button class="btn" id="autoCopy" @click="copyLink">
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
          <div class="dialog_description">Instantly download to your phone</div>
          <qr-code :text="download_urls" :size="250" error-level="H"></qr-code>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-raised md-danger" @click="showDialog = false"
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
import CryptoJS from "crypto-js";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
import JSZip from "jszip";
import Dropbox from "dropbox";
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
    id: "",
    button_title: "",
    dis_text: "",
    down_name: "",
    file_type: "",
    downloadURL: "",
    before: "",
    url: null,
    files: [],
  }),
  computed: {
    result() {
      return store.state.result;
    },
  },
  async created() {
    console.log(234);
    this.download_urls = window.location.origin + this.$route.path;
    // Your secret key (should be kept private)
    const secretKey = "mySecretKey123";

    // Decrypt the encrypted message using the same secret key
    const decrypted = CryptoJS.AES.decrypt(
      this.$route.params.param,
      secretKey
    ).toString(CryptoJS.enc.Utf8);
    const paramObj = JSON.parse(decrypted);
    this.id = paramObj.id;
    this.button_title = paramObj.button_title;
    this.dis_text = paramObj.dis_text;
    this.down_name = paramObj.down_name;
    this.file_type = paramObj.file_type;
    this.before = paramObj.before;
    this.downloadURL = `/pdf/download/${this.id}`;
  },
  async mounted() {
    // Make a GET request to the server endpoint to download the file
    const response = await this.$axios.get(this.downloadURL, {
      responseType: "blob",
    });
    // Create a link and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    this.url = url;
    const link = document.getElementById("link");
    link.download = this.down_name;
    let binaryData = [];
    binaryData.push(this.result);
    link.href = url;
    if (this.file_type == "application/pdf") {
      this.files = [
        {
          name: "newPdf.pdf",
          link: this.url,
        },
      ];
    } else {
      const zipFile = response.data;
      const zip = new JSZip();

      zip
        .loadAsync(zipFile)
        .then((contents) => {
          const pdfFiles = [];
          contents.forEach((relativePath, zipEntry) => {
            if (!zipEntry.dir && zipEntry.name.toLowerCase().endsWith(".pdf")) {
              pdfFiles.push(zipEntry);
            }
          });

          const promises = pdfFiles.map((zipEntry) => {
            return zipEntry.async("blob").then((blob) => ({
              name: zipEntry.name,
              link: URL.createObjectURL(blob),
            }));
          });

          Promise.all(promises)
            .then((extractedPDFs) => {
              this.files = extractedPDFs;
            })
            .catch((error) => {
              console.error(
                "Error occurred while extracting PDF files:",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Error occurred while reading ZIP file:", error);
        });
    }
  },
  methods: {
    back_page() {
      console.log(this.before);
      this.$router.push(`/${this.before}`);
    },
    async onConfirm() {
      await this.$axios
        .post("/pdf/delete", {
          file: this.id,
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
    copyLink() {
      // Select the text in the input field
      const inputField = this.$refs.linkInput;
      inputField.select();

      try {
        // Attempt to copy the selected text to the clipboard
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (err) {
        // If unable to copy, handle the error
        alert("Failed to copy link to clipboard");
      }
    },
    go_merge() {
      this.$router.push({
        name: "pdfmerge",
        params: {
          file: this.files,
        },
      });
    },
    go_split() {
      if (this.file_type == "application/pdf") {
        this.$router.push({
          name: "pdfsplit",
          params: {
            file: this.files,
          },
        });
      }
    },
    generateFileUrl(content) {
      // Create a Blob from the file content
      const blob = new Blob([content], { type: "application/pdf" }); // Adjust type as needed

      // Generate a URL representing the file content
      return URL.createObjectURL(blob);
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

.page-title {
  margin-top: 50px;
  font-weight: 600;
  font-size: 42px;
  line-height: 52px;
  color: #33333b;
  text-align: center;
}

.page-description {
  max-width: 800px;
  margin: 8px auto 0;
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  color: #47474f;
}

.md-dialog-container {
  padding: 30px;
  border-radius: 5px;
}

.form__group {
  display: flex;
  margin-bottom: 10px;
}

#dlink {
  padding: 5px;
}

.dialog_description {
  font-size: 18x;
  font-weight: 500;
  text-align: center;
  margin: 20px 0px;
}
.downloader__extra__btn {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  -webkit-transition: all 0.1s linear;
  -o-transition: all 0.1s linear;
  transition: all 0.1s linear;
  cursor: pointer;
  background: #e5322d;
  margin: 6px 6px 8px;
  pointer-events: none;
}

.back-btn {
  background-color: #47474f;
  padding: 10px;
  cursor: pointer;
}

.extra-work {
  position: absolute;
  right: 0;
}

.download-more {
  background-color: #fff !important;
  color: #fff !important;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  border: none;
  padding: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  cursor: pointer;
}
</style>
