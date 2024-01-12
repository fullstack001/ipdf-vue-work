<template>
  <div>
    <div @click="embedPdfPages">dfsadfasdfasdf</div>
  </div>
</template>
<script src="https://unpkg.com/downloadjs@1.4.7"></script>
<script>
import { PDFDocument, degrees } from "pdf-lib";
export default {
  methods: {
    async embedPdfPages() {
      // Fetch American flag PDF
      const flagUrl = "https://pdf-lib.js.org/assets/american_flag.pdf";

      const tempPDF = await PDFDocument.create();
      //create temp pdf that rotate the flag PDF
      const flagPdfBytes = await fetch(flagUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdf = await PDFDocument.load(flagPdfBytes);
      const copiedPages = await tempPDF.copyPages(pdf, pdf.getPageIndices());
      copiedPages[0].setRotation(degrees(90));
      tempPDF.addPage(copiedPages[0]);

      let rotatedFlagPdf = await tempPDF.save();

      let blob = new Blob([rotatedFlagPdf], { type: "application/pdf" });

      // // Create a data URL from the Blob
      // const dataUrl = URL.createObjectURL(pdfBlob);

      // // Now, `dataUrl` contains the data URL for the rotated PDF
      // console.log(dataUrl);

      rotatedFlagPdf = await fetch(blob).then((res) => res.arrayBuffer());
      console.log(rotatedFlagPdf);

      // Fetch U.S. constitution PDF
      const constitutionUrl =
        "https://pdf-lib.js.org/assets/us_constitution.pdf";
      const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
        res.arrayBuffer()
      );

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();

      // Load the rotated Flag PDF into a PDFDocument
      // const rotatedFlagPdfData = await PDFDocument.load(copiedPages[0]);

      // // Embed the second page of the constitution and clip the preamble
      // copiedPages[0].setRotation(degrees(270));
      // const americanFlag = await pdfDoc.embedPage(rotatedFlagPdfData);

      // Load the constitution PDF into a PDFDocument
      const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);

      // Embed the second page of the constitution and clip the preamble
      const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
        left: 55,
        bottom: 485,
        right: 300,
        top: 575,
      });

      // Get the width/height of the American flag PDF scaled down to 30% of its original size
      // const americanFlagDims = americanFlag.scale(0.3);

      // Get the width/height of the preamble clipping scaled up to 225% of its original size
      const preambleDims = preamble.scale(2.25);

      // Add a blank page to the document
      const page = pdfDoc.addPage();

      // Draw the American flag image in the center top of the page
      // page.drawPage(americanFlag, {
      //   ...americanFlagDims,
      //   x: page.getWidth() / 2 - americanFlagDims.width / 2,
      //   y: page.getHeight() - americanFlagDims.height - 150,
      // });

      // Draw the preamble clipping in the center bottom of the page
      page.drawPage(preamble, {
        ...preambleDims,
        x: page.getWidth() / 2 - preambleDims.width / 2,
        y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();
      blob = new Blob([pdfBytes], { type: "application/pdf" });

      const downloadLink = document.createElement("a");
      downloadLink.href = blob;
      downloadLink.download = "canvas_image.pdf"; // Set the desired file name and extension

      // Trigger a click on the link to start the download
      downloadLink.click();
      // Trigger the browser to download the PDF document
      // download(
      //   pdfBytes,
      //   "pdf-lib_pdf_page_embedding_example.pdf",
      //   "application/pdf"
      // );
    },
  },
};
</script>
