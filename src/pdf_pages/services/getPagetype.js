import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = PDFJSWorker;

const getPageType = async (file) => {
  let url = "";

  if (file.link) {
    url = file.link;
  } else {
    url = URL.createObjectURL(file);
  }

  try {
    const pdf = await getDocument(url).promise;
    const firstPage = await pdf.getPage(1); // Get the first page
    const viewport = firstPage.getViewport({ scale: 1 }); // Get the viewport
    const width = viewport.width;
    const height = viewport.height;
    const type = height > width ? "portrait" : "landscape";
    return type;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getPageType;
