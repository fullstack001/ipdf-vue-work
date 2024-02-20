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
        </tr>
      </thead>
      <tbody v-if="disData.length > 0">
        <tr v-for="(item, index) in disData" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.ipAddress }}</td>
          <td class="address_td">{{ item.currentURL }}</td>
          <td>{{ item.browserName }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :max="(data.length / 10).toFixed(0) + 1"
      @setPage="(data) => (page = data)"
    />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      data: [],
      disData: [],
      page: 1,
      intervalId: null,
    };
  },
  watch: {
    page(newValue) {
      this.pagination();
    },
  },
  created() {
    this.fetchDatas();
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    fetchDatas() {
      this.intervalId = setInterval(() => {
        this.$axios
          .get("/client_data")
          .then((res) => {
            const data = res.data;
            const temp = data.map((item) => {
              return item.data;
            });
            this.data = temp;
            this.disData =
              this.data.length > 10 ? this.data.slice(0, 10) : this.data;
          })
          .catch((err) => console.log(err));
      }, 1000);
    },
    pagination() {
      const start = (this.page - 1) * 10;
      const length =
        this.data.length > this.page * 10 ? this.page * 10 : this.data.length;
      this.disData = this.data.slice(start, length);
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
  width: 80%;
  margin-top: 50px;
}
.address_td {
  word-wrap: break-word;
  max-width: 500px;
}
</style>
