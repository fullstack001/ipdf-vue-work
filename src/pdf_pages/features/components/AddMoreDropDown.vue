<template>
  <div class="example">
    <md-speed-dial :class="topPosition" md-direction="bottom">
      <div
        class="badge-container md-primary"
        md-content="4"
        v-if="pdfCounts > 0"
      >
        <md-speed-dial-target class="add_button">
          <md-icon>add</md-icon>
        </md-speed-dial-target>
        <div class="badge">
          {{ pdfCounts }}
        </div>
      </div>

      <md-speed-dial-content>
        <!-- <md-button class="md-icon-button"> -->
        <!-- <div
            class="badge-container md-primary"
            md-content="4"
            v-if="file_objs.length"
          > -->
        <md-button class="md-icon-button" @click="open_add_local">
          <md-icon>computer</md-icon>
          <md-tooltip md-direction="right"
            >{{ $t("toolTip.upload_local") }}
          </md-tooltip>
        </md-button>
        <!-- <div class="badge">
              {{ file_objs.length }}
            </div>
          </div> -->
        <!-- </md-button> -->

        <md-button class="md-icon-button">
          <GDriveSelector
            @picked="onPickedGoogleDriver"
            :buttonStyle="'download'"
          >
            <md-tooltip md-direction="top"> </md-tooltip>
          </GDriveSelector>
        </md-button>
        <md-button>
          <VueDropboxPicker
            class="cloud dropbox"
            link-type="direct"
            :buttonType="'chooser'"
            :multiselect="true"
            :extensions="['.pdf', '.doc']"
            :folderselect="false"
            @picked="onPickedDropbox"
          />
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>
import GDriveSelector from "@/components/GDriveSelector.vue";
import VueDropboxPicker from "@/components/DropboxPicker.vue";
export default {
  props: {
    pdfCounts: {
      type: Number,
      default: 0,
    },
  },
  components: {
    GDriveSelector,
    VueDropboxPicker,
  },
  name: "PositionDirection",
  data: () => ({
    topPosition: "md-top-left",
    bottomPosition: "md-bottom-left",
  }),
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
  },
};
</script>

<style scoped>
.badge-container {
  position: relative;
}
h3 {
  font-weight: 500;
  margin-bottom: 10px;
}
.badge[data-v-43894eff] {
  position: absolute;
  top: -10px;
  right: 30px;
  background-color: rgb(10, 10, 10);
  color: white;
  border-radius: 100%;
  padding: 0px 8px;
  font-size: 10px;
  z-index: 1000;
  border: solid 2px #ff7c03;
}
.add-more .md-icon-button {
  display: block;
  background-color: #ff7c03 !important;
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
}
.add_button {
  background-color: #ff7c03 !important;
}

.add-more .md-icon-button:hover {
  background-color: #ff7c03 !important;
}
</style>
