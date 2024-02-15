<template>
  <div class="liveview-container">
    <h3>Live View</h3>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ip Address</th>
          <th scope="col">URL</th>
          <th scope="col">Browser</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in disData" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.ip }}</td>
          <td>{{ item.workUrl }}</td>
          <td>{{ item.browser }}</td>
          <td>{{ item.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <div class="arrow">prev</div>
      <div class="info">
        <input
          type="number"
          :max="(data.length / 10).toFixed(0) + 1"
          :min="1"
          style="width: 40px; height: 24px; margin-right: 3px"
          v-model="page"
        />
      </div>
      <div class="arrow">next</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      disData: [],
      page: 1,
    };
  },
  created() {
    this.fetchDatas();
  },
  methods: {
    fetchDatas() {
      this.$axios
        .get("/admin/liveviews")
        .then((res) => {
          this.data = res.data.data;
          this.disData =
            this.data.length > 10 ? this.data.slice(0, 10) : this.data;
          console.log(this.data);
        })
        .catch((err) => {
          this.$router.replace("/admin");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
<style scoped>
.liveview-container {
  margin: auto;
  min-width: 1000px;
  margin-top: 50px;
}
.arrow {
  background-color: white;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 3px;
  color: black;
  margin-left: 5px;
}

.pagination {
  display: flex;
  align-items: right;
  justify-content: right;
  top: 0px;
  height: 50px;
  color: rgb(50, 54, 57);
  padding: 10px 0px;
  margin-right: 100px;
  margin-left: 50px;
}
.arrow:hover {
  color: red;
  cursor: pointer;
}

.pagination .info {
  padding: 3px 10px;
  display: flex;
}
</style>
