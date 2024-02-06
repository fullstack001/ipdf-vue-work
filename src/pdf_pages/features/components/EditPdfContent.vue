<template>
  <div class="edit-container">
    <div class="main-edit">
      <EditToolBar />
    </div>
    <div id="sidebar">
      <div class="tool__sidebar" style="overflow-y: auto">
        <div class="edit-title">
          <h3 class="text-center">
            {{ $t("page_titles.edit_page.editPdf") }}
          </h3>
        </div>

        <div class="edit-description">
          <div class="edit-desc-title">
            {{ $t("page_titles.edit_page.elements") }}
          </div>
          <div class="edit-desc-detail">
            {{ $t("page_titles.edit_page.ele_des") }}
          </div>
        </div>

        <div class="option__panel option__panel--active" id="merge-options">
          <button class="option__panel__title">
            {{ $t("page_titles.edit_page.actionBtn") }}
          </button>
        </div>
      </div>
    </div>
    <div id="temp_canvas" style="display: none"></div>
  </div>
</template>
<script>
import RendingProgressVue from "./RendingProgress.vue";
import convertPDFImg from "../../services/convertPDFImg.js";
import EditToolBar from "./EditToolBar.vue";
export default {
  components: {
    EditToolBar,
  },
  props: ["pdfUrl"],
  async created() {
    console.log(Date.now());
    const images = await convertPDFImg(this.pdfUrl);

    console.log(images);
    console.log(Date.now());
  },
};
</script>

<style scoped>
.edit-container {
  display: flex;
}
.main-edit {
  width: 79%;
}
</style>
