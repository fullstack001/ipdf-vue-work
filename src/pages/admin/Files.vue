<template>
  <div class="liveview-container">
    <h3>Files</h3>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">File URL</th>
          <th scope="col">Delete</th>
          <th scope="col">Function</th>
          <th scope="col">IP</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in disData" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td class="down-cell">{{ item.downUrl }}</td>
          <td class="text-danger">{{ item.deleted ? "Deleted" : "" }}</td>
          <td>{{ item.workUrl }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :max="(data.length / 5).toFixed(0) + 1"
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
  methods: {
    fetchDatas() {
      this.$axios
        .get("/admin/files")
        .then((res) => {
          this.data = res.data.data;
          this.disData =
            this.data.length > 10 ? this.data.slice(0, 10) : this.data;
        })
        .catch((err) => {
          this.$router.replace("/admin");
        });
    },
    pagination() {
      const start = (this.page - 1) * 10;
      const length =
        this.data.length > this.page * 10
          ? 10
          : this.data.length - (this.page - 1) * 10 + 1;
      this.disData =
        this.data.length > 10 ? this.data.slice(start, length) : this.data;
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
.down-cell {
  word-wrap: break-word;
  max-width: 500px;
}
</style>
