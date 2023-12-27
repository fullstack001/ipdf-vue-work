<template>
  <div id="app">
    <div class="editor-tools">
      <div class="tool-undo">
        <rotate-ccw-icon :size="size_icon" @click="undo()"></rotate-ccw-icon>
      </div>
      <div class="tool-redo">
        <rotate-cw-icon :size="size_icon" @click="redo()"></rotate-cw-icon>
      </div>
      <div class="tool-trash">
        <trash-2-icon
          :size="size_icon"
          @click="deleteEditable()"
        ></trash-2-icon>
      </div>
      <div class="tool-freeDrawing">
        <edit-2-icon :size="size_icon" @click="freeDrawing()"></edit-2-icon>
      </div>
      <div class="tool-addText">
        <italic-icon :size="size_icon" @click="addText()"></italic-icon>
      </div>
      <div class="tool-addCircle">
        <circle-icon :size="size_icon" @click="addCicle()"></circle-icon>
      </div>
      <div class="tool-addSquare">
        <square-icon :size="size_icon" @click="addSquare()"></square-icon>
      </div>
      <div class="tool-arrow">
        <arrow-up-right-icon
          :size="size_icon"
          @click="addArrow()"
        ></arrow-up-right-icon>
      </div>
      <div class="tool-drag">
        <move-icon :size="size_icon" @click="drag()"></move-icon>
      </div>
      <div class="tool-crop">
        <maximize-icon
          v-if="stateCrop"
          :size="size_icon"
          @click="crop()"
        ></maximize-icon>
        <check-icon v-else :size="size_icon" @click="applyCrop()"></check-icon>
      </div>
      <div class="tool-upload">
        <label for="file">
          <upload-icon :size="size_icon"></upload-icon>
        </label>
        <input
          type="file"
          id="file"
          ref="file"
          :v-model="file"
          accept="image/*"
          @change="uploadImg"
        />
      </div>
      <div class="save-upload">
        <save-icon :size="size_icon" @click="saveImg()"></save-icon>
      </div>
    </div>
    <Editor
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
      ref="editor"
    />
  </div>
</template>

<script>
import axios from "axios";
import Editor from "vue-image-markup";
import {
  AirplayIcon,
  CircleIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Trash2Icon,
  Edit2Icon,
  ItalicIcon,
  SquareIcon,
  ArrowUpRightIcon,
  MoveIcon,
  MaximizeIcon,
  UploadIcon,
  SaveIcon,
  CheckIcon,
} from "vue-feather-icons"; // Icons
export default {
  name: "App",
  components: {
    Editor,
    CircleIcon,
    RotateCcwIcon,
    RotateCwIcon,
    Trash2Icon,
    Edit2Icon,
    ItalicIcon,
    SquareIcon,
    ArrowUpRightIcon,
    MoveIcon,
    MaximizeIcon,
    UploadIcon,
    CheckIcon,
    SaveIcon, // Icons end
  },
  data() {
    return {
      api_url:
        "http://admin.green_odesa.local.softpro.ua/api-user/save-edit-img",
      size_icon: "2x",
      canvasWidth: "1000",
      canvasHeight: "800",
      stateCrop: true,
      file: "",
      editor: {
        mode: "FreeDearaw",
      },
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvc9X_Eok1zBbswuTS3PPT1ct9RQev1BDyTg&usqp=CAU",
    };
  },
  methods: {
    undo() {
      this.$refs.editor.undo();
    },
    redo() {
      this.$refs.editor.redo();
    },
    deleteEditable() {
      this.$refs.editor.clear();
    },
    freeDrawing() {
      let customizeFreeDrawing = { stroke: "yellow", strokeWidth: "5" };
      this.$refs.editor.set("freeDrawing", customizeFreeDrawing);
    },
    // savePhoto() {
    //   console.log(this.$refs.editor);
    //   this.$refs.editor.saveImage();
    // },
    addText() {
      console.log(this.$refs.editor);
      let textModeOptions = {
        fill: "blue",
        // fontFamily: "Verdana",
        fontSize: 16,
        placeholder: "Type something",
      };
      this.$refs.editor.set("text", textModeOptions);
    },
    addCicle() {
      let circleModeParams = { fill: "blue", stroke: "white" };
      this.$refs.editor.set("circle");
    },
    sicleMode() {
      let circleModeParams = { fill: "blue", stroke: "white" };
      this.$refs.editor.set("circle");
    },
    addSquare() {
      let customizeRectangle = {
        fill: "blue",
        stroke: "white",
        strokeWidth: 1,
      };
      this.$refs.editor.set("rect", customizeRectangle);
    },
    addArrow() {
      let customizeArrow = { stroke: "red", strokeWidth: "3" };
      this.$refs.editor.set("arrow", customizeArrow);
    },
    drag() {
      this.$refs.editor.set("selectMode");
    },
    crop() {
      let cropModeOptions = {
        width: "50",
        height: "100",
        overlayOpacity: "0.9",
      };
      this.$refs.editor.set("crop", cropModeOptions);
      this.stateCrop = false;
    },
    applyCrop() {
      this.$refs.editor.applyCropping();
      this.stateCrop = true;
    },
    uploadImg: function (event) {
      this.$refs.editor.uploadImage(event);
    },
    saveImg() {
      // console.log(this.$refs.editor.saveImage());
      const url = this.api_url;
      const file = this.$refs.editor.saveImage();
      var bufferValue = Buffer.from(file, "base64");

      console.log(bufferValue);
      this.file = file;
      axios
        .post(url, { bufferValue })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  mounted() {
    // console.log("this.editor", this.editor.mode);

    let textModeOptions = {
      fill: "red",
      fontSize: 16,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.editor-tools {
  display: flex;
  width: 100%;
  justify-content: space-around;
  max-width: 600px;
}
#file {
  width: 1px;
  height: 1px;
  visibility: hidden;
}
.upper-canvas {
  border: 1px solid;
  margin: 0 auto;
}
</style>
