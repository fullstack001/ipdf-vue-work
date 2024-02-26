<template>
  <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
    <div class="upload_btn_area">
      <div class="upload-buttons">
        <div class="page-title">
          {{ title }}
        </div>
        <div class="page-description">
          {{ description }}
        </div>
        <div class="drop-area">
          <div class="drop-img">
            <img :src="featureImgUrl" alt="img" />
          </div>
          <div class="upload_btn">
            <div class="uploader__btn md-raised" @click="open_add_local">
              {{ $t("page_titles.merge_page.selectBtn") }}
            </div>
            <div class="cloud-upload">
              <GDriveSelector
                @picked="onPickedGoogleDriver"
                :buttonStyle="'download'"
              />

              <VueDropboxPicker
                class="cloud-dropBox"
                link-type="direct"
                :buttonType="'chooser'"
                :multiselect="true"
                :extensions="['.pdf', '.doc']"
                :folderselect="false"
                style="margin-top: 5px"
                @picked="onPickedDropbox"
              />
            </div>
          </div>
          <div>
            {{ $t("page_titles.merge_page.dropFiles") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GDriveSelector from "@/components/GDriveSelector.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
export default {
  components: {
    GDriveSelector,
    VueDropboxPicker,
  },
  props: ["title", "description", "featureImgUrl"],
  data() {
    return {
      isDragging: false,
    };
  },
  methods: {
    open_add_local() {
      this.$emit("open_add_local");
    },
    onPickedGoogleDriver(data) {
      this.$emit("onPickedGoogleDriver", data);
    },
    onPickedDropbox(data) {
      this.$emit("onPickedDropbox", data);
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.$emit("handleFile", files);
    },
  },
};
</script>
<style scoped>
.dropzone-container {
  width: 100%;
  min-height: 100vh;
  padding: 1rem 0rem;
  text-align: center;
}
.upload_btn_area {
  position: relative;
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
  margin: 8px auto 0;
  line-height: 32px;
  font-size: 22px;
  font-weight: 400;
  color: #47474f;
}

.uploader__btn {
  cursor: pointer;
  align-items: center;
  padding: 24px 48px;
  font-weight: 500;
  font-size: 24px;
  background: #ff7c03;
  line-height: 28px;
  color: #fff !important;
  margin-bottom: 12px;
  border-radius: 12px;
  cursor: pointer;
}
.drop-area {
  border-radius: 8px;
  border: 1px dotted #ff7c03;
  width: 50%;
  margin: auto;
  padding: 50px 0;
  margin-top: 20px;
  background-color: #fffbf8;
}

.drop-img {
  width: 96px;
  margin: auto;
  margin-bottom: 30px;
}

.upload_btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  margin: auto;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  padding-left: 50px;
}
.cloud-dropBox {
  margin-top: -5px !important;
}

@media only screen and (max-width: 991px) {
  .dropzone-container {
    min-height: 55vh;
  }

  .page-title {
    font-size: 25px;
    margin-top: 0px;
  }
  .page-description {
    font-size: 15px;
    line-height: 1.5;
    width: 95%;
    margin: auto;
  }
  .drop-area {
    width: 95%;
    margin-left: 8px !important;
    margin-right: 8px !important;
    padding: 20px;
  }
  .upload_btn {
    display: contents;
  }
  .drop-img {
    width: 60px;
    margin: auto;
    margin-bottom: 12px;
  }
  .cloud-upload {
    display: inline-flex;
    text-align: center;
  }
  .cloud-dropBox {
    margin-top: 8px !important;
  }
}
</style>
