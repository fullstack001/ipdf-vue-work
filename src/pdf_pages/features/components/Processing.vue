<template>
  <div class="process">
    <img src="@/assets/img/vue-logo.png" class="progress-logo" width="200px" />
    <div class="process_title">{{ progress }} PDFs...</div>

    <!-- <img src="@/assets/img/Fidget-spinner.gif" class="spinner" width="150px" />
    <img src="@/assets/img/Skype loader.gif" class="spinner" width="150px" />
    <img src="@/assets/img/Spinner-3.gif" class="spinner" width="150px" /> -->
    <img src="@/assets/img/Spinner-5.gif" class="spinner" width="100px" />
    <div class="progress-des">
      Do not close your browser. Wait until your files are uploaded and
      processed! this might take a few minutes.
    </div>
  </div>
</template>
<script>
export default {
  props: ["progress"],
};
</script>
<style scoped>
.process {
  background: #fefefe;
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
}
.progress-logo {
  margin-top: 30px;
}
.process_title {
  font-size: 32px;
  font-weight: 600;
  margin: 20px;
  margin-top: 80px;
}
.spinner {
  margin-bottom: 30px;
}
.progress-des {
  font-size: 25px;
  font-weight: 500;
}
@media (max-width: 640px) {
  .progress-des {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
