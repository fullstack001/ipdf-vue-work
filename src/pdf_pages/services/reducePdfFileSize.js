/**
 * Reduces the file size of a PDF file.
 *
 * @param {string} inputFilePath - The path of the input PDF file.
 * @param {string} outputFilePath - The path of the output PDF file.
 * @returns {Promise} A promise that resolves when the file size reduction is complete.
 */
function reducePdfFileSize(inputFilePath, outputFilePath) {
  return new Promise((resolve, reject) => {
    const fs = require("fs");
    const { exec } = require("child_process");

    // Check if the input file exists
    fs.access(inputFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(`Input file does not exist: ${inputFilePath}`);
        return;
      }

      // Execute the Ghostscript command to reduce the file size
      const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFilePath} ${inputFilePath}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Failed to reduce file size: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Error occurred while reducing file size: ${stderr}`);
          return;
        }
        resolve();
      });
    });
  });
}

export default reducePdfFileSize;

// // Usage Example

// const inputFilePath = "input.pdf";
// const outputFilePath = "output.pdf";

// reducePdfFileSize(inputFilePath, outputFilePath)
//   .then(() => {
//     console.log("File size reduction complete.");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
