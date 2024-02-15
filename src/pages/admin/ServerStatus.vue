<template>
  <div>
    <h2>Server Status</h2>
  </div>
</template>
<script>
export default {
  created() {
    this.$axios
      .get("/admin/serverstatus")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  },
};
</script>
