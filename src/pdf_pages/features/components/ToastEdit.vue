<template>
  <div v-if="useDefaultUI">
    <tui-image-editor
      :includeUi="useDefaultUI"
      :options="options"
      @objectAdded="onAddObject"
      @objectMoved="onObjectMoved"
      @objectRotated="onObjectRotated"
      @toDataURL="getURL"
    ></tui-image-editor>
  </div>
</template>
<script>
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-image-editor/dist/tui-image-editor.css";
import { ImageEditor } from "@toast-ui/vue-image-editor";
export default {
  components: {
    "tui-image-editor": ImageEditor,
  },
  data() {
    return {
      useDefaultUI: false,
      options: null,
    };
  },
  props: ["image", "page"],
  watch: {
    image(newValue) {
      this.clearEdit().then(() => {
        console.log(123);
        this.options = {
          includeUI: {
            loadImage: {
              path: newValue,
              name: `example${this.page}`,
            },
            menuBarPosition: "top",
          },
        };
        this.useDefaultUI = true;
        console.log(this.options);
      });
    },
  },
  methods: {
    clearEdit() {
      return new Promise((resolve, reject) => {
        this.useDefaultUI = false;
        resolve(true);
      });
    },
    onAddObject(pos) {
      console.log(pos);
    },
    onObjectMoved(props) {
      console.log(props);
    },
    onObjectRotated(props) {
      console.log(props);
      console.log(props.type);
      const result = ImageEditor.toDataURL();
      console.log(result);
    },
    getURL(url) {
      console.log(url);
    },
  },
};
</script>

<style scoped>
.tui-image-editor-container {
  min-height: 100vh !important;
}
</style>
