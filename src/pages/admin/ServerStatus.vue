<template>
  <div class="status-container">
    <h3>Server Status</h3>
    <div class="server-status" v-if="serverStatus">
      <h4>Server Load</h4>
      <h6>The core usage : {{ serverStatus.cpu }}</h6>
      <h6>RAM usage : {{ serverStatus.memory }}</h6>
      <h4>Server bandwidth</h4>
      <h6>{{ serverStatus.bandWidth }}</h6>
      <h4>Server Storage</h4>
      <h6>{{ serverStatus.disk }}</h6>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serverStatus: null,
    };
  },
  created() {
    this.$axios
      .get("/admin/serverstatus")
      .then((res) => {
        console.log(res.data);
        this.serverStatus = res.data;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push("/");
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>

<style scoped>
.status-container {
  margin: auto;
  width: 80%;
  margin-top: 50px;
}
h4 {
  margin: 20px 30px;
}
h6 {
  margin: 10px 50px;
}
</style>
