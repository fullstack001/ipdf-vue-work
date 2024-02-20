const { PDFDocument, rgb } = require("pdf-lib");
import getArrayBuffer from "./getArrayBuffer";

async function addImagesToPDF(pdfPath, imagePaths) {
  const pdfBytes = await getArrayBuffer(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  for (let i = 0; i < Math.min(pdfDoc.getPageCount(), imagePaths.length); i++) {
    const response = await fetch(
      // `http://127.0.0.1:5000/uploads/${imagePaths[i].filename}`
      `https://api.pdfden.com/uploads/${imagePaths[i].filename}`
    );
    // const response = await fetch(imagePaths[i]);
    const arrayBuffer = await response.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);
    // const imageBytes = await getArrayBuffer(imagePaths[i]);
    const image = await pdfDoc.embedPng(imageBytes);

    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();

    page.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }
  const modifiedPdfBytes = await pdfDoc.save();
  //   console.log(modifiedPdfBytes);
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  //   // Create a download link
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "fileName.pdf";

  // Append the link to the document and trigger the download
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  return blob;
}

export default addImagesToPDF;

// // Example usage
// const pdfPath = "input.pdf";
// const imagePaths = ["img1.png", "img2.png"]; // Add more image paths as needed
// const outputPath = "output.pdf";

// addImagesToPDF(pdfPath, imagePaths, outputPath);
