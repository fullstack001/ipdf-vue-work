function uploadPdf(data) {
  const formData = new FormData();
  const blob = new Blob(data, { type: "application/pdf" });

  formData.append("pdf", blob);

  this.$axios
    .post("/pdf/pdf_upload", formData)
    .then((res) => {
      ruturn(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default uploadPdf;
