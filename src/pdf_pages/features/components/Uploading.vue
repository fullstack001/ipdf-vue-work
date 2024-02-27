<template>
  <div class="uploading">
    <img src="@/assets/img/vue-logo.png" class="progress-logo" width="200px" />
    <div class="process_title">Uploading file {{ number }} of {{ total }}</div>
    <div class="file-name">
      {{ file_name }} (
      {{
        size > 1000000
          ? (size / 1024000).toFixed(2) + "MB"
          : (size / 1024).toFixed(2) + "KB"
      }}
      )
    </div>

    <div class="shell">
      <div class="bar" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="progress-des">{{ progress }} %</div>
    <div class="uploaded">uploaded</div>
  </div>
</template>
<script>
export default {
  props: ["progress", "number", "total", "size", "file_name"],
};
</script>
<style scoped>
.uploading {
  background: #fefefe;
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
}
.progress-logo {
  margin-top: 30px;
}
.shell {
  height: 20px;
  width: 500px;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 0px;
  margin: auto;
  margin-top: 10px;
}

.bar {
  background: linear-gradient(to right, #ff7c03, #ff7c03);
  height: 20px;
  width: 15px;
  border-radius: 9px;
}
.process_title {
  font-size: 32px;
  font-weight: 600;
  margin: 20px;
  margin-top: 80px;
}

.file_name {
  font-size: 20px;
  font-weight: 500;
}
.progress-des {
  font-size: 43px;
  font-weight: 600;
  margin: 20px 0;
}
.uploaded {
  font-size: 25px;
  font-weight: 500;
}
@media (max-width: 640px) {
  .shell {
    width: 90%;
    margin: auto;
  }
}
</style>
