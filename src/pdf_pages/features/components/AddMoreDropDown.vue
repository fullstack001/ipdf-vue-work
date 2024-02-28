<template>
  <div class="example">
    <md-speed-dial
      class="dropdown-tooltip"
      :class="topPosition"
      md-direction="bottom"
    >
      <div
        class="badge-container md-primary"
        md-content="4"
        v-if="pdfCounts > 0"
      >
        <md-speed-dial-target class="add_button">
          <md-icon color="#000">add</md-icon>
          <md-tooltip md-direction="left"
            >{{ $t("toolTip.add_more") }}
          </md-tooltip>
        </md-speed-dial-target>
        <div class="add_badge">
          {{ pdfCounts }}
        </div>
      </div>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="open_add_local">
          <md-icon>computer</md-icon>
          <md-tooltip md-direction="right"
            >{{ $t("toolTip.upload_local") }}
          </md-tooltip>
        </md-button>

        <md-button class="md-icon-button1">
          <GDriveSelector
            @picked="onPickedGoogleDriver"
            :buttonStyle="'download'"
          >
            <md-tooltip md-direction="top"> </md-tooltip>
          </GDriveSelector>
        </md-button>
        <md-button class="dropbox-btn md-icon-button1">
          <VueDropboxPicker
            class="cloud dropbox"
            link-type="direct"
            :buttonType="'chooser'"
            :position="'addMore'"
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
.add_badge {
  position: absolute;
  top: -10px;
  right: 60px;
  background-color: rgb(10, 10, 10);
  color: white;
  border-radius: 100%;
  padding: 0px 8px;
  font-size: 10px;
  z-index: 9;
  border: solid 2px #ff7c03;
}

.md-ripple {
  padding: 0 !important;
}
.add-more .md-icon-button {
  display: block;
  width: 40px;
  height: 40px;
  margin-bottom: 0px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 0px;
  border: solid 2px #ff7c03;
  background-color: transparent !important;
  color: #000 !important;
}

.add-more .md-icon-button:hover {
  background-color: #ff7c03 !important;
}

.add_button {
  background-color: #ff7c03 !important;
  padding: 0;
}

.dropbox-btn {
  margin-top: -20px !important;
}

.dropbox-btn,
.md-icon-button1,
.md-icon-button2,
.md-icon-button3 {
  background-color: transparent !important;
  box-shadow: none !important;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0;
}

.md-icon-font {
  color: #000 !important;
}
</style>
