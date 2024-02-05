import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import $ from "jquery";
import { fabric } from "fabric";

export const PDFAnnotate = function (container_id, url, options = {}) {
  this.toolObj1 = null;
  this.number_of_pages = 0;
  this.pages_rendered = 0;
  this.active_tool = 1; // 1 - Free hand, 2 - Text, 3 - Arrow, 4 - Rectangle, 5 - Circle, 6-Line
  this.fabricObjects = [];
  this.fabricObjectsData = [];
  this.color = "#212121";
  this.borderColor = "#000000";
  this.borderSize = 1;
  this.font_size = 16;
  this.font_underline = false;
  this.font_background_color = "white";
  this.font_color = "#000000";
  this.font_family = "Arial";
  this.font_weight = "normal";
  this.font_style = "normal";
  this.active_canvas = 0;
  this.container_id = container_id;
  this.url = url;
  this.pageImageCompression = options.pageImageCompression
    ? options.pageImageCompression.toUpperCase()
    : "NONE";
  this.textBoxText = "Double Click";
  this.format;
  this.orientation;
  var inst = this;

  var loadingTask = getDocument(this.url);
  this.originDoc = loadingTask;
  loadingTask.promise.then(
    function (pdf) {
      var scale = options.scale ? options.scale : 1;
      inst.number_of_pages = pdf.numPages;

      for (var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          if (
            typeof inst.format === "undefined" ||
            typeof inst.orientation === "undefined"
          ) {
            var originalViewport = page.getViewport({ scale: 1 });
            inst.format = [originalViewport.width, originalViewport.height];
            inst.orientation =
              originalViewport.width > originalViewport.height
                ? "landscape"
                : "portrait";
          }

          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement("canvas");
          document.getElementById(inst.container_id).appendChild(canvas);
          canvas.className = "pdf-canvas";
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext("2d");

          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            $(".pdf-canvas").each(function (index, el) {
              $(el).attr("id", "page-" + (index + 1) + "-canvas");
              $(el).attr("id", "page-" + (index + 1) + "-canvas");
            });
            inst.pages_rendered++;
            if (inst.pages_rendered == inst.number_of_pages) inst.initFabric();
          });
        });
      }
    },
    function (reason) {
      console.error(reason);
    }
  );

  this.initFabric = function () {
    var inst = this;
    let canvases = $("#" + inst.container_id + " canvas");
    // console.log(canvases);
    canvases.each(function (index, el) {
      var canvasContainer = $(el).parent()[0];
      var canvasObject = el;
      var background = el.toDataURL("image/png");
      var fabricObj = new fabric.Canvas(el.id, {
        freeDrawingBrush: {
          width: 1,
          color: inst.color,
        },
      });
      inst.fabricObjects.push(fabricObj);

      fabricObj.setBackgroundImage(
        background,
        fabricObj.renderAll.bind(fabricObj)
      );
      $(fabricObj.upperCanvasEl).click(function (event) {
        inst.active_canvas = index;
        inst.fabricClickHandler(event, fabricObj);
      });

      var imageOffsetX, imageOffsetY;

      function handleDragStart(e) {
        [].forEach.call(images, function (img) {
          img.classList.remove("img_dragging");
        });
        this.classList.add("img_dragging");

        var imageOffset = $(this).offset();
        imageOffsetX = e.clientX - imageOffset.left;
        imageOffsetY = e.clientY - imageOffset.top;
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.dataTransfer.dropEffect = "copy";
        return false;
      }

      function handleDragEnter(e) {
        this.classList.add("over");
      }

      function handleDragLeave(e) {
        this.classList.remove("over");
      }

      function handleDrop(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        var img = document.querySelector(".furniture img.img_dragging");

        var offset = $(canvasObject).offset();
        var y = e.clientY - (offset.top + imageOffsetY);
        var x = e.clientX - (offset.left + imageOffsetX);

        var newImage = new fabric.Image(img, {
          width: img.width,
          height: img.height,
          left: x,
          top: y,
        });
        fabricObj.add(newImage);
        return false;
      }

      function handleDragEnd(e) {
        [].forEach.call(images, function (img) {
          img.classList.remove("img_dragging");
        });
      }

      var images = document.querySelectorAll(".furniture img");
      [].forEach.call(images, function (img) {
        img.addEventListener("dragstart", handleDragStart, false);
        img.addEventListener("dragend", handleDragEnd, false);
      });
      canvasContainer.addEventListener("dragenter", handleDragEnter, false);
      canvasContainer.addEventListener("dragover", handleDragOver, false);
      canvasContainer.addEventListener("dragleave", handleDragLeave, false);
      canvasContainer.addEventListener("drop", handleDrop, false);

      fabricObj.on("after:render", function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
        fabricObj.off("after:render");
      });

      if (
        index === canvases.length - 1 &&
        typeof options.ready === "function"
      ) {
        options.ready();
      }
    });
  };

  this.fabricClickHandler = function (event, fabricObj) {
    var inst = this;
    var toolObj;
    if (inst.active_tool == 2) {
      toolObj = new fabric.IText(inst.textBoxText, {
        left:
          event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top:
          event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        fill: inst.color,
        fontSize: inst.font_size,
        fontFamily: inst.font_family,
        underline: inst.font_underline,
        fontStyle: inst.font_style,
        fontWeight: inst.font_weight,
        backgroundColor: inst.font_background_color,
        selectable: true,
        fill: inst.font_color,
      });
    }

    if (toolObj) {
      fabricObj.add(toolObj);
    }
    $(".tool-button").first().find("i").click();
  };
};

PDFAnnotate.prototype.enableSelector = function () {
  var inst = this;
  inst.active_tool = 0;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.enableAddText = function (text) {
  var inst = this;
  inst.active_tool = 2;
  if (typeof text === "string") {
    inst.textBoxText = text;
  }
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.deleteSelectedObject = function () {
  var inst = this;
  var activeObject = inst.fabricObjects[inst.active_canvas].getActiveObject();
  if (activeObject) {
    if (confirm("Are you sure ?")) {
      inst.fabricObjects[inst.active_canvas].remove(activeObject);
    }
  }
};

PDFAnnotate.prototype.savePdf = async function (fileName) {
  var inst = this;
  var objects = this.fabricObjects;
  var resultImages = [];
  var added_items = [];
  let url = "";
  // var fabricObj = inst.fabricObjects[inst.active_canvas];

  await this.originDoc.promise.then((pdf) => {
    for (var i = 1; i <= pdf.numPages; i++) {
      const index = i - 1;
      pdf.getPage(i).then(async (page) => {
        // Create a new Fabric.js canvas
        var originalViewport = page.getViewport({ scale: 1 });
        var pageWidth = originalViewport.width;
        var pageHeight = originalViewport.height;
        const canvas = new fabric.Canvas(null, {
          width: pageWidth,
          height: pageHeight,
        });
        let imgObjects = objects[index]._objects;
        var temp = [];
        for (var j = 0; j < imgObjects.length; j++) {
          var obj = imgObjects[j];
          if (obj.top >= 0 && obj.top < pageHeight) {
            temp.push({
              top: obj.top,
              left: obj.left,
              scaleX: obj.scaleX,
              scaleY: obj.scaleY,
              url: obj._originalElement.currentSrc,
              width: obj.width,
              height: obj.height,
            });
          }
          // console.log(index, imgObjects[j]);
          canvas.add(imgObjects[j]);
        }
        // Convert the Fabric.js canvas to an image data URL
        const imageDataUrl = canvas.toDataURL("image/png", 1.0);

        const byteString = atob(imageDataUrl.split(",")[1]);

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: "image/png" });
        resultImages.push(blob);
        added_items.push(temp);
        temp = [];
      });
    }
  });
  return added_items;
};

PDFAnnotate.prototype.defaultFontStyle = function () {
  this.font_size = 16;
  this.font_underline = false;
  this.font_family = "Arial";
  this.font_weight = "normal";
  this.font_style = "normal";
  this.font_background_color = null;
  this.font_color = "black";
};

PDFAnnotate.prototype.serializePdf = function (callback) {
  var inst = this;
  var pageAnnotations = [];
  inst.fabricObjects.forEach(function (fabricObject) {
    fabricObject.clone(function (fabricObjectCopy) {
      fabricObjectCopy.setBackgroundImage(null);
      fabricObjectCopy.setBackgroundColor("");
      pageAnnotations.push(fabricObjectCopy);
      if (pageAnnotations.length === inst.fabricObjects.length) {
        var data = {
          page_setup: {
            format: inst.format,
            orientation: inst.orientation,
          },
          pages: pageAnnotations,
        };
        callback(JSON.stringify(data));
      }
    });
  });
};

PDFAnnotate.prototype.loadFromJSON = function (jsonData) {
  var inst = this;
  var { page_setup, pages } = jsonData;
  if (typeof pages === "undefined") {
    pages = jsonData;
  }
  if (
    typeof page_setup === "object" &&
    typeof page_setup.format === "string" &&
    typeof page_setup.orientation === "string"
  ) {
    inst.format = page_setup.format;
    inst.orientation = page_setup.orientation;
  }
  $.each(inst.fabricObjects, function (index, fabricObj) {
    if (pages.length > index) {
      fabricObj.loadFromJSON(pages[index], function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
      });
    }
  });
};

PDFAnnotate.prototype.setDefaultTextForTextBox = function (text) {
  console.log(text);
  var inst = this;
  if (typeof text === "string") {
    inst.textBoxText = "text";
  }
};
PDFAnnotate.prototype.doubleClick = function (e) {
  console.log(e);
};
