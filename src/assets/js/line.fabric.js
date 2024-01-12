import { fabric } from "fabric";
fabric.Line1 = fabric.util.createClass(fabric.Line, {
  type: "Line1",

  initialize: function (element, options) {
    options || (options = {});
    this.callSuper("initialize", element, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"));
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);

    // do not render if width/height are zeros or object is not visible
    // if (this.width == 0 || this.height == 0 || !this.visible) return;

    // ctx.save();

    // var xDiff = this.x2 - this.x1;
    // var yDiff = this.y2 - this.y1;
    // var angle = Math.atan2(yDiff, xDiff);
    // ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    // ctx.rotate(angle);
    // ctx.beginPath();
    // //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    // ctx.moveTo(10, 0);
    // ctx.lineTo(-20, 15);
    // ctx.lineTo(-20, -15);
    // ctx.closePath();
    // ctx.fillStyle = this.stroke;
    // ctx.fill();

    // ctx.restore();
  },
});

fabric.Line1.fromObject = function (object, callback) {
  callback &&
    callback(
      new fabric.Line1([object.x1, object.y1, object.x2, object.y2], object)
    );
};

fabric.Line1.async = true;

export const DrawLine = (function () {
  function DrawLine(canvas, color, callback) {
    this.canvas = canvas;
    this.className = "DrawLine";
    this.isDrawing = false;
    this.color = color;
    this.callback = callback;
    this.bindEvents();
  }

  DrawLine.prototype.bindEvents = function () {
    var inst = this;
    inst.canvas.on("mouse:down", function (o) {
      inst.onMouseDown(o);
    });
    inst.canvas.on("mouse:move", function (o) {
      inst.onMouseMove(o);
    });
    inst.canvas.on("mouse:up", function (o) {
      inst.onMouseUp(o);
    });
    inst.canvas.on("object:moving", function (o) {
      inst.disable();
    });
  };

  DrawLine.prototype.unBindEventes = function () {
    var inst = this;
    inst.canvas.off("mouse:down");
    inst.canvas.off("mouse:up");
    inst.canvas.off("mouse:move");
    inst.canvas.off("object:moving");
  };

  DrawLine.prototype.onMouseUp = function (o) {
    var inst = this;
    inst.disable();
    inst.unBindEventes();
    if (inst.callback) inst.callback();
  };

  DrawLine.prototype.onMouseMove = function (o) {
    var inst = this;
    if (!inst.isEnable()) {
      return;
    }

    var pointer = inst.canvas.getPointer(o.e);
    var activeObj = inst.canvas.getActiveObject();
    activeObj.set({
      x2: pointer.x,
      y2: pointer.y,
    });
    activeObj.setCoords();
    inst.canvas.renderAll();
  };

  DrawLine.prototype.onMouseDown = function (o) {
    var inst = this;
    inst.enable();
    var pointer = inst.canvas.getPointer(o.e);

    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    var line = new fabric.Line1(points, {
      strokeWidth: 5,
      fill: inst.color ? inst.color : "red",
      stroke: inst.color ? inst.color : "red",
      originX: "center",
      originY: "center",
      hasBorders: false,
      hasControls: true,
      selectable: true,
    });

    inst.canvas.add(line).setActiveObject(line);
  };

  DrawLine.prototype.isEnable = function () {
    return this.isDrawing;
  };

  DrawLine.prototype.enable = function () {
    this.isDrawing = true;
  };

  DrawLine.prototype.disable = function () {
    this.isDrawing = false;
  };

  return DrawLine;
})();
