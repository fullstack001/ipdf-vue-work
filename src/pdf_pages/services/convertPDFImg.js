// Function to convert PDF page to image with original size
async function convertPDFImg(pdf, i) {
  const page = await pdf.getPage(i);
  var viewport = page.getViewport({ scale: 1.5 });
  var canvas = document.createElement("canvas");
  document.getElementById("temp_canvas").appendChild(canvas);
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const context = canvas.getContext("2d");

  var renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  var renderTask = await page.render(renderContext);
  const imageUrl = await renderTask.promise.then(function () {
    var pngDataUrl = canvas.toDataURL("image/png");
    const base64Data = pngDataUrl.split(",")[1];
    const binaryString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return { img: imageUrl, imgData: pngDataUrl };
  });

  const pdfImg = {
    img: imageUrl.img,
    imaData: imageUrl.pngDataUrl,
    width: canvas.width,
    height: viewport.height,
  };

  return pdfImg;
}

export default convertPDFImg;
