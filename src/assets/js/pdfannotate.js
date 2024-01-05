import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
GlobalWorkerOptions.workerSrc = PDFJSWorker;
import $ from 'jquery';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import { Arrow } from './arrow.fabric';
import { DrawLine } from './line.fabric';

// const customScript2 = document.createElement('script');
// customScript2.src = '@/assets/annotations/arrow.fabric.js'; // Replace with your script file path
// customScript2.async = false;
// document.head.appendChild(customScript2);

export const PDFAnnotate = function (container_id, url, options = {}) {
  this.number_of_pages = 0;
  this.pages_rendered = 0;
  this.active_tool = 1; // 1 - Free hand, 2 - Text, 3 - Arrow, 4 - Rectangle, 5 - Circle, 6-Line
  this.fabricObjects = [];
  this.fabricObjectsData = [];
  this.color = '#212121';
  this.borderColor = '#000000';
  this.borderSize = 1;
  this.font_size = 16;
  this.font_family = 'Arial';
  this.font_weight = 'normal';
  this.font_style = 'normal';
  this.active_canvas = 0;
  this.container_id = container_id;
  this.url = url;
  this.pageImageCompression = options.pageImageCompression ? options.pageImageCompression.toUpperCase() : 'NONE';
  this.textBoxText = 'Double Click';
  this.format;
  this.orientation;
  var inst = this;

  var loadingTask = getDocument(this.url);
  loadingTask.promise.then(
    function (pdf) {
      var scale = options.scale ? options.scale : 1;
      inst.number_of_pages = pdf.numPages;

      for (var i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(function (page) {
          if (typeof inst.format === 'undefined' || typeof inst.orientation === 'undefined') {
            var originalViewport = page.getViewport({ scale: 1 });
            inst.format = [originalViewport.width, originalViewport.height];
            inst.orientation = originalViewport.width > originalViewport.height ? 'landscape' : 'portrait';
          }

          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement('canvas');
          document.getElementById(inst.container_id).appendChild(canvas);
          canvas.className = 'pdf-canvas';
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext('2d');

          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            $('.pdf-canvas').each(function (index, el) {
              $(el).attr('id', 'page-' + (index + 1) + '-canvas');
              $(el).attr('id', 'page-' + (index + 1) + '-canvas');
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
    let canvases = $('#' + inst.container_id + ' canvas');
    canvases.each(function (index, el) {
      var background = el.toDataURL('image/png');
      var fabricObj = new fabric.Canvas(el.id, {
        freeDrawingBrush: {
          width: 1,
          color: inst.color,
        },
      });
      inst.fabricObjects.push(fabricObj);
      if (typeof options.onPageUpdated == 'function') {
        fabricObj.on('object:added', function () {
          var oldValue = Object.assign({}, inst.fabricObjectsData[index]);
          inst.fabricObjectsData[index] = fabricObj.toJSON();
          options.onPageUpdated(index + 1, oldValue, inst.fabricObjectsData[index]);
        });
      }
      fabricObj.setBackgroundImage(background, fabricObj.renderAll.bind(fabricObj));
      $(fabricObj.upperCanvasEl).click(function (event) {
        inst.active_canvas = index;
        inst.fabricClickHandler(event, fabricObj);
      });
      fabricObj.on('after:render', function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
        fabricObj.off('after:render');
      });

      if (index === canvases.length - 1 && typeof options.ready === 'function') {
        options.ready();
      }
    });
  };

  this.fabricClickHandler = function (event, fabricObj) {
    var inst = this;
    var toolObj;
    if (inst.active_tool == 2) {
      toolObj = new fabric.IText(inst.textBoxText, {
        left: event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top: event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        fill: inst.color,
        fontSize: inst.font_size,
        fontFamily: inst.font_family,
        fontStyle: inst.font_style,
        fontWeight: inst.font_weight,
        selectable: true,
      });
    } else if (inst.active_tool == 4) {
      toolObj = new fabric.Rect({
        left: event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top: event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        width: 100,
        height: 100,
        fill: inst.color,
        stroke: inst.borderColor,
        strokeSize: inst.borderSize,
      });
    } else if (inst.active_tool == 5) {
      toolObj = new fabric.Circle({
        left: event.clientX - fabricObj.upperCanvasEl.getBoundingClientRect().left,
        top: event.clientY - fabricObj.upperCanvasEl.getBoundingClientRect().top,
        radius: 50,
        fill: inst.color,
        stroke: inst.borderColor,
        strokeSize: inst.borderSize,
      });
    }

    if (toolObj) {
      fabricObj.add(toolObj);
    }
    $('.tool-button').first().find('i').click();
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

PDFAnnotate.prototype.enablePencil = function () {
  var inst = this;
  inst.active_tool = 1;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = true;
    });
  }
};

PDFAnnotate.prototype.enableAddText = function (text) {
  var inst = this;
  inst.active_tool = 2;
  if (typeof text === 'string') {
    inst.textBoxText = text;
  }
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.enableRectangle = function () {
  var inst = this;
  // var fabricObj = inst.fabricObjects[inst.active_canvas];
  inst.active_tool = 4;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.enableCircle = function () {
  var inst = this;
  // var fabricObj = inst.fabricObjects[inst.active_canvas];
  inst.active_tool = 5;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
    });
  }
};

PDFAnnotate.prototype.enableAddArrow = function (onDrawnCallback = null) {
  var inst = this;
  inst.active_tool = 3;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
      new Arrow(fabricObj, inst.color, function () {
        inst.active_tool = 0;
        if (typeof onDrawnCallback === 'function') {
          onDrawnCallback();
        }
      });
    });
  }
};

PDFAnnotate.prototype.enableAddLine = function (onDrawnCallback = null) {
  var inst = this;
  inst.active_tool = 6;
  if (inst.fabricObjects.length > 0) {
    $.each(inst.fabricObjects, function (index, fabricObj) {
      fabricObj.isDrawingMode = false;
      new DrawLine(fabricObj, inst.color, function () {
        inst.active_tool = 0;
        if (typeof onDrawnCallback === 'function') {
          onDrawnCallback();
        }
      });
    });
  }
};

PDFAnnotate.prototype.addImageToCanvas = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];

  if (fabricObj) {
    var inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.jpg,.jpeg,.png,.PNG,.JPG,.JPEG';
    inputElement.onchange = function () {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          inputElement.remove();
          var image = new Image();
          image.onload = function () {
            fabricObj.add(new fabric.Image(image));
          };
          image.src = this.result;
        },
        false
      );
      reader.readAsDataURL(inputElement.files[0]);
    };
    document.getElementsByTagName('body')[0].appendChild(inputElement);
    inputElement.click();
  }
};

PDFAnnotate.prototype.deleteSelectedObject = function () {
  var inst = this;
  var activeObject = inst.fabricObjects[inst.active_canvas].getActiveObject();
  if (activeObject) {
    if (confirm('Are you sure ?')) {
      inst.fabricObjects[inst.active_canvas].remove(activeObject);
    }
  }
};

PDFAnnotate.prototype.savePdf = async function (fileName) {
  var inst = this;
  var format = inst.format || 'a4';
  var orientation = inst.orientation || 'portrait';
  if (!inst.fabricObjects.length) return;
  var doc = new jsPDF({ format, orientation });
  if (typeof fileName === 'undefined') {
    fileName = `${new Date().getTime()}.pdf`;
  }
  let url = '';

  await inst.fabricObjects.forEach(function (fabricObj, index) {
    if (index != 0) {
      doc.addPage(format, orientation);
      doc.setPage(index + 1);
    }
    doc.addImage(
      fabricObj.toDataURL({
        format: 'png',
      }),
      inst.pageImageCompression == 'NONE' ? 'PNG' : 'JPEG',
      0,
      0,
      doc.internal.pageSize.getWidth(),
      doc.internal.pageSize.getHeight(),
      `page-${index + 1}`,
      ['FAST', 'MEDIUM', 'SLOW'].indexOf(inst.pageImageCompression) >= 0 ? inst.pageImageCompression : undefined
    );
    if (index === inst.fabricObjects.length - 1) {
      // Get Blob from the document
      var blob = doc.output('blob');

      // You can use this Blob object as needed, for example, you can create a URL for it
      // var blobURL = URL.createObjectURL(blob);
      // doc.save(fileName);
      url = blob;
    }
  });
  await console.log(url);
  return url;
};

PDFAnnotate.prototype.setBrushSize = function (size) {
  var inst = this;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.width = parseInt(size, 10) || 1;
  });
};

PDFAnnotate.prototype.setColor = function (color) {
  var inst = this;
  inst.color = color;
  $.each(inst.fabricObjects, function (index, fabricObj) {
    fabricObj.freeDrawingBrush.color = color;
  });
};

PDFAnnotate.prototype.setBorderColor = function (color) {
  var inst = this;
  inst.borderColor = color;
};

PDFAnnotate.prototype.setFontSize = function (size) {
  this.font_size = size;
};
PDFAnnotate.prototype.setFontFamily = function (family) {
  this.font_family = family;
};

PDFAnnotate.prototype.setFontStyle = function (style) {
  this.font_style = style;
};

PDFAnnotate.prototype.setFontWeight = function (weight) {
  this.font_weight = weight;
};

PDFAnnotate.prototype.setBorderSize = function (size) {
  this.borderSize = size;
};

PDFAnnotate.prototype.clearActivePage = function () {
  var inst = this;
  var fabricObj = inst.fabricObjects[inst.active_canvas];
  var bg = fabricObj.backgroundImage;
  if (confirm('Are you sure?')) {
    fabricObj.clear();
    fabricObj.setBackgroundImage(bg, fabricObj.renderAll.bind(fabricObj));
  }
};

PDFAnnotate.prototype.serializePdf = function (callback) {
  var inst = this;
  var pageAnnotations = [];
  inst.fabricObjects.forEach(function (fabricObject) {
    fabricObject.clone(function (fabricObjectCopy) {
      fabricObjectCopy.setBackgroundImage(null);
      fabricObjectCopy.setBackgroundColor('');
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
  if (typeof pages === 'undefined') {
    pages = jsonData;
  }
  if (
    typeof page_setup === 'object' &&
    typeof page_setup.format === 'string' &&
    typeof page_setup.orientation === 'string'
  ) {
    inst.format = page_setup.format;
    inst.orientation = page_setup.orientation;
  }
  $.each(inst.fabricObjects, function (index, fabricObj) {
    if (pages.length > index) {
      console.log(index, fabricObj);
      fabricObj.loadFromJSON(pages[index], function () {
        inst.fabricObjectsData[index] = fabricObj.toJSON();
      });
    }
  });
};

PDFAnnotate.prototype.setDefaultTextForTextBox = function (text) {
  var inst = this;
  if (typeof text === 'string') {
    inst.textBoxText = text;
  }
};
