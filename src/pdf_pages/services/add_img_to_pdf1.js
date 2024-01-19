const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
import getArrayBuffer from "./getArrayBuffer";

async function addImagesToPDF1(pdfPath, imagePaths, matched) {
  const pdfBytes = await getArrayBuffer(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  for (let i = 0; i < Math.min(pdfDoc.getPageCount(), imagePaths.length); i++) {
    if (imagePaths[i].length == 0) continue;
    const add_page = imagePaths[i];
    for (let j = 0; j < add_page.length; j++) {
      const item = add_page[j];
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      switch (item.url) {
        case matched.img[0]:
          page.drawText(matched.text[0], {
            x: item.left, // X-coordinate of the text position
            y: height - item.top - item.height, // Y-coordinate of the text position
            font: timesRomanFont, // Specify the font
            size: 16, // Specify the font size
            color: rgb(0, 0, 0), // Specify the text color (black in this case)
          });
          break;
        case matched.img[1]:
          page.drawText(matched.text[1], {
            x: item.left, // X-coordinate of the text position
            y: height - item.top - item.height, // Y-coordinate of the text position
            font: timesRomanFont, // Specify the font
            size: 16, // Specify the font size
            color: rgb(0, 0, 0), // Specify the text color (black in this case)
          });
          break;
        case matched.img[2]:
          page.drawText(matched.text[2], {
            x: item.left, // X-coordinate of the text position
            y: height - item.top - item.height, // Y-coordinate of the text position
            font: timesRomanFont, // Specify the font
            size: 16, // Specify the font size
            color: rgb(0, 0, 0), // Specify the text color (black in this case)
          });
          break;
        default:
          const pngDataURL = item.url; // Your actual PNG Data URL

          // Extract base64 data
          const base64Data = pngDataURL.split(",")[1];

          // Decode base64 to binary
          const binaryData = atob(base64Data);

          // Convert binary data to Uint8Array
          const uint8Array = new Uint8Array(binaryData.length);
          for (let k = 0; k < binaryData.length; k++) {
            uint8Array[k] = binaryData.charCodeAt(k);
          }

          const image = await pdfDoc.embedPng(uint8Array);

          page.drawImage(image, {
            x: item.left,
            y: height - item.top - item.height,
            width: item.width * item.scaleX,
            height: item.height * item.scaleY,
          });
          break;
      }
    }
    // const imageBytes = await getArrayBuffer(imagePaths[i]);
  }
  const modifiedPdfBytes = await pdfDoc.save();
  //   console.log(modifiedPdfBytes);
  const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
  // Create a download link
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(blob);
  // link.download = "fileName.pdf";

  // // Append the link to the document and trigger the download
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  return blob;
}

export default addImagesToPDF1;

// // Example usage
// const pdfPath = "input.pdf";
// const imagePaths = ["img1.png", "img2.png"]; // Add more image paths as needed
// const outputPath = "output.pdf";

// addImagesToPDF(pdfPath, imagePaths, outputPath);
