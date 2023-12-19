import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;

const getPageNumber = async (file) => {
  let url = "";
  var num = 0;

  if (file.link) {
    url = file.link;
  } else {
    url = URL.createObjectURL(file);
  }
  await getDocument(url).promise.then(
    (pdf) => {
      num = pdf.numPages;
    },
    (reason) => {
      console.error(reason);
    }
  );
  console.log(num);
  return num;
};

export default getPageNumber;
