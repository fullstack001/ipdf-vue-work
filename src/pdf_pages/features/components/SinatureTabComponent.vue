<template>
  <div>
    <div>
      <div class="tab">
        <button
          ref="textTab"
          class="tablinks"
          @click="openCity('text')"
          :class="active_btn == 'text' && 'active'"
        >
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#4A7AAB" fill-rule="nonzero">
              <path
                d="M7.289 7.909a.894.894 0 0 1-1.789 0V6.707c0-.494.4-.894.894-.894h7.212c.494 0 .894.4.894.894v1.202a.894.894 0 0 1-1.789 0V7.6h-1.818l.001 6.317a.894.894 0 0 1-1.788 0l-.001-6.317H7.289v.308Z"
              ></path>
              <path
                d="M17.18 0H2.82A2.82 2.82 0 0 0 0 2.82v14.36A2.82 2.82 0 0 0 2.82 20h14.36A2.82 2.82 0 0 0 20 17.18V2.82A2.82 2.82 0 0 0 17.18 0ZM2.82 1.538h14.36c.708 0 1.282.574 1.282 1.283v14.358c0 .709-.574 1.283-1.283 1.283H2.821a1.282 1.282 0 0 1-1.283-1.283V2.821c0-.709.574-1.283 1.283-1.283Z"
              ></path>
            </g>
          </svg>
        </button>
        <button
          class="tablinks"
          @click="openCity('draw')"
          :class="active_btn == 'draw' && 'active'"
        >
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.605 0C5.61 0 6.52.242 7.33.726c.806.481 1.496 1.147 2.07 1.995.572.845 1.01 1.826 1.316 2.942.14.51.247 1.036.323 1.58l.05.41.047.522.013.273.027-.005c.376-.06.759-.103 1.148-.127l.392-.019.396-.006c.659 0 1.189.14 1.587.42.405.285.61.673.61 1.154 0 .25-.038.494-.114.734l-.072.226-.074.213-.073.196a1.268 1.268 0 0 0-.102.412c0 .049.005.054.044.054.108 0 .3-.094.563-.286l.353-.265.396-.315.213-.176c.367-.304.755-.608 1.164-.911.42-.312.717-.497 1.233-.769a.906.906 0 0 1 .543-.093c.156.025.334.12.419.216.1.115.173.243.19.365a.558.558 0 0 1-.046.326c-.05.127-.28.372-.471.506l-.494.372-.348.274-.387.321-.208.18c-.357.31-.74.621-1.15.934-.413.316-.831.58-1.255.793a2.833 2.833 0 0 1-1.278.326c-.385 0-.712-.105-.975-.315-.267-.215-.402-.51-.402-.88 0-.268.04-.524.118-.767.076-.235.154-.468.233-.699.075-.22.113-.458.113-.711 0-.183-.128-.27-.439-.27-.388 0-.769.02-1.14.06l-.369.047-.338.055-.022.487c-.044.687-.124 1.35-.24 1.991l-.094.476-.108.468c-.12.486-.26.95-.42 1.392-.104.294-.24.617-.408.97-.168.352-.352.703-.556 1.055-.602.984-1.325 1.753-2.167 2.307A5.044 5.044 0 0 1 4.308 20c-.954 0-1.673-.242-2.148-.729-.473-.483-.71-1.102-.71-1.852l.006-.2.016-.206.025-.199c.03-.33.098-.652.207-.964.066-.186.151-.388.258-.604l.114-.222.125-.226c.366-.699.848-1.393 1.445-2.082l.237-.266.248-.261.258-.256.259-.24-.296-.195a13.654 13.654 0 0 1-.713-.523l-.342-.277-.333-.289a10.584 10.584 0 0 1-1.54-1.707 8.137 8.137 0 0 1-1.043-1.96A6.25 6.25 0 0 1 0 4.576c0-.856.203-1.63.61-2.319A4.584 4.584 0 0 1 2.26.613C2.955.204 3.737 0 4.605 0Zm4.89 10.27-.252.093-.39.16c-.256.111-.505.23-.746.356l-.358.195-.346.206-.272.178.01.169.418.197.09.047a.55.55 0 0 1 .184.165.457.457 0 0 1 .082.257.464.464 0 0 1-.166.348.588.588 0 0 1-.42.156.791.791 0 0 1-.224-.032l-.106-.04-.262-.115-.258-.12-.374-.187-.117.013-.153.128-.346.313a10.64 10.64 0 0 0-1.468 1.71l-.173.264-.195.328-.128.237a5.48 5.48 0 0 0-.426 1.048l-.045.183-.039.208-.02.17-.005.132v.122l.008.18c.03.349.149.642.358.877.248.279.628.417 1.13.417a3.26 3.26 0 0 0 1.887-.605l.193-.141.15-.122.186-.166.197-.194a7.058 7.058 0 0 0 1.264-1.839l.136-.292.12-.28.157-.395c.203-.538.375-1.117.515-1.737.102-.45.183-.915.244-1.39l.055-.481.04-.488.007-.135-.141-.097Zm-4.89-8.903a2.97 2.97 0 0 0-1.582.43c-.465.284-.834.669-1.106 1.151a3.265 3.265 0 0 0-.407 1.63c0 .92.204 1.77.613 2.548a8.18 8.18 0 0 0 1.563 2.085c.507.49 1.032.925 1.575 1.304l.409.272.166.104.12-.003.305-.22.353-.235a12.841 12.841 0 0 1 2.317-1.168l.493-.18.172-.055.071-.095-.004-.22-.022-.436c-.05-.72-.155-1.408-.316-2.065-.233-.947-.569-1.782-1.008-2.505-.442-.725-.975-1.296-1.6-1.713a3.729 3.729 0 0 0-2.112-.63Z"
              fill="#4A7AAB"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          class="tablinks"
          @click="openCity('upload')"
          :class="active_btn == 'upload' && 'active'"
        >
          <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.513 12.019a.82.82 0 0 0 .825-.815V3.358l-.07-1.227.487.622 1.103 1.184a.723.723 0 0 0 .539.245c.4 0 .73-.29.73-.71a.694.694 0 0 0-.227-.517L9.147.28C8.94.07 8.73 0 8.513 0c-.217 0-.417.07-.634.28L5.134 2.956a.702.702 0 0 0 .486 1.227.76.76 0 0 0 .557-.245L7.27 2.753l.495-.622-.07 1.227v7.846c0 .447.365.815.817.815ZM14.238 17C16.053 17 17 16.044 17 14.238V8.885a.886.886 0 1 0-1.772 0v5.17c0 .77-.408 1.148-1.129 1.148H2.909c-.729 0-1.128-.377-1.128-1.149V8.89a.89.89 0 0 0-1.78 0L0 14.24C0 16.043.964 17 2.762 17h11.476Z"
              fill="#161616"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div id="text" class="tabcontent">
        <div class="name-initial">
          <div
            style="display: inline-flex"
            v-for="family in font_families"
            :key="family"
            class="sign-option"
          >
            <input type="radio" :value="family" v-model="sign_picked_family" />
            <label
              :id="family"
              for="one"
              style="font-size: xx-large; margin-left: 15px"
              :style="`font-family:${family} !important; color:${fontColor};`"
              >{{ name.length > 0 ? name : "Signature" }}</label
            >
          </div>
        </div>
        <div class="color-panel">
          <span>color</span>
          <div
            class="color-tool active"
            style="background-color: #000"
            @click="fontColor = '#000'"
          ></div>
          <div
            class="color-tool"
            style="background-color: red"
            @click="fontColor = 'red'"
          ></div>
          <div
            class="color-tool"
            style="background-color: blue"
            @click="fontColor = 'blue'"
          ></div>
          <div
            class="color-tool"
            style="background-color: green"
            @click="fontColor = 'green'"
          ></div>
          <div
            class="color-tool"
            style="background-color: yellow"
            @click="fontColor = 'yellow'"
          ></div>
        </div>
      </div>

      <div id="draw" class="tabcontent">
        <div
          class="reset-draw"
          @click.prevent="
            () => {
              $refs.VueCanvasDrawing.reset();
              $refs.VueCanvasDrawing.redraw();
            }
          "
        >
          <i class="fa-solid fa-trash-can"></i>
        </div>
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          :width="640"
          :height="240"
          :lineWidth="2"
          :backgroundColor="'#f5f5fa'"
          :color="color"
          :saveAs="'png'"
        />
        <canvas
          ref="myCanvas"
          width="320"
          height="120"
          style="display: none"
        ></canvas>
        <div class="color-panel">
          <span>color</span>
          <div
            class="color-tool active"
            style="background-color: #000"
            @click="color = '#000'"
          ></div>
          <div
            class="color-tool"
            style="background-color: red"
            @click="color = 'red'"
          ></div>
          <div
            class="color-tool"
            style="background-color: blue"
            @click="color = 'blue'"
          ></div>
          <div
            class="color-tool"
            style="background-color: green"
            @click="color = 'green'"
          ></div>
          <div
            class="color-tool"
            style="background-color: yellow"
            @click="color = 'yellow'"
          ></div>
        </div>
      </div>

      <div id="upload" class="tabcontent">
        <DropFile
          v-if="active_btn == 'upload'"
          :data="'sign_img'"
          @set_stamp="set_stamp"
        />
      </div>
    </div>
  </div>
</template>
<script>
import VueDrawingCanvas from "vue-drawing-canvas";
import html2canvas from "html2canvas";
import DropFile from "@/components/DropFile.vue";

export default {
  components: {
    VueDrawingCanvas,
    DropFile,
  },
  mounted() {
    this.$refs.textTab.click();
  },
  props: ["name", "get_sign"],
  watch: {
    async get_sign(newValue) {
      let temp = await this.convertToPNG();
      if (newValue) {
        switch (this.active_btn) {
          case "text":
            this.sign_png = temp;
            break;
          case "draw":
            this.sign_png = this.saveImage() ? this.saveImage() : temp;
            break;
          case "upload":
            this.sign_png = this.upload_img ? this.upload_img : temp;
        }
      }

      this.$emit("set_sign", this.sign_png);
    },
  },
  data() {
    return {
      font_families: [
        "Satisfy",
        "Shadows Into Light",
        "Alex Brush",
        "Allura",
        "Handlee",
        "Kristi",
        "La Belle Aurore",
        "Marck Script",
        "Reenie Beanie",
        "Zeyada",
      ],
      active_btn: "text",
      color: "#000",
      fontColor: "#000",
      sign_picked_family: "Satisfy",
      sign_png: null,
      upload_img: null,
    };
  },
  methods: {
    set_stamp(data) {
      this.upload_img = data;
    },
    openCity(item) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      this.active_btn = item;
      document.getElementById(item).style.display = "block";
    },
    saveImage() {
      var dataURL1 = this.$refs.VueCanvasDrawing.getAllStrokes();
      if (dataURL1.length == 0) {
        return null;
      }
      const canvas = this.$refs.myCanvas;
      let ctx = canvas.getContext("2d");
      for (var j = 0; j < dataURL1.length; j++) {
        let obj = dataURL1[j];
        // Apply properties to the context
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = obj.width;
        ctx.lineCap = obj.lineCap;
        ctx.lineJoin = obj.lineJoin;
        // ctx.setLineDash(obj.type === "dash" ? [5, 5] : []); // Example dash pattern

        // Move to the starting point
        ctx.moveTo(obj.from.x, obj.from.y);

        // Draw a path based on coordinates
        for (var i = 0; i < obj.coordinates.length - 1; i++) {
          ctx.lineTo(obj.coordinates[i].x / 2, obj.coordinates[i].y / 2);
          ctx.lineTo(
            obj.coordinates[i + 1].x / 2,
            obj.coordinates[i + 1].y / 2
          );
        }
        if (obj.fill) {
          ctx.fillStyle = obj.color;
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }

      // Convert canvas content to PNG data URL
      const dataURL = this.$refs.myCanvas.toDataURL("image/png");

      return dataURL;
    },
    async convertToPNG() {
      const textContainer = await document.getElementById(
        this.sign_picked_family
      );
      textContainer.style.fontSize = "25px";

      // Use html2canvas to capture the content of the text container
      const canvas = await html2canvas(textContainer, {
        backgroundColor: null, // Remove the default white background
      });

      // Convert the canvas content to a data URL (PNG format)
      const dataURL = await canvas.toDataURL("image/png");

      return await dataURL;
    },
  },
};
</script>

<style scoped>
.reset-draw {
  position: absolute;
  top: 20px;
  right: 65px;
  cursor: pointer;
}
.reset-draw:hover {
  color: red;
}
canvas {
  margin-bottom: 0;
  background-color: #f5f5fa;
  border: none;
  box-shadow: none;
}
.sign-option {
  border: 1px solid;
  border-color: #9e9e9e;
  padding: 15px 0px 10px 10px;
}
.name-initial {
  display: grid;
  margin-top: 5px;
  max-height: 240px;
  overflow: auto;
  border-bottom: solid 2px black;
}

.tab {
  float: left;
  background-color: #e8f0fe;
  width: 6%;
  height: 300px;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  color: red;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: white;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 10px 12px;
  border: 1px solid #ccc;
  width: 94%;
  border-left: none;
  height: 300px;
  text-align: center;
}
.color-panel {
  display: flex;
  margin-top: 10px;
}
.color-tool {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
}
</style>
