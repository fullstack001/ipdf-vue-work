function generateURL(file) {
  if (file.link) {
    return file.link;
  } else if (file.type == "application/pdf") {
    let fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
}

export default generateURL;
