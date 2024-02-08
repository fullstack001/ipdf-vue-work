import html2canvas from "html2canvas";

const convert = async (text) => {
  // Create a hidden div to contain the text
  const div = document.createElement("div");
  div.textContent = text;
  //   div.style.visibility = "hidden";
  div.style.maxWidth = "max-content";
  div.style.fontSize = "20px";
  div.style.fontWeight = 500;
  div.style.color = "#000";
  document.body.appendChild(div);

  // Use html2canvas to capture the div as a canvas
  const canvas = await html2canvas(div, { backgroundColor: null });
  document.body.removeChild(div);

  // Convert the canvas to a data URL representing a PNG image
  const dataURL = canvas.toDataURL("image/png");

  return dataURL;
};

export default convert;
