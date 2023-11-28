import http from "@/http-common";

class PdfService {
  uploadMerged(data) {
    return http.post("/pdf", data);
  } 

  deleteAll() {
    return http.delete("/tutorials");
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new PdfService();
