<template>
  <div class="pagination">
    <div class="arrow" @click="prev">prev</div>
    <div class="info">
      <input
        type="number"
        :max="max"
        :min="1"
        style="width: 40px; height: 24px; margin-right: 3px"
        v-model="page"
      />
    </div>
    <div class="arrow" @click="next">next</div>
  </div>
</template>

<script>
export default {
  props: ["max"],
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    next() {
      if (this.page < this.max) {
        this.page = this.page + 1;
        this.$emit("setPage", this.page);
      }
    },
    prev() {
      if (this.page > 1) {
        this.page = this.page - 1;
        this.$emit("setPage", this.page);
      }
    },
  },
};
</script>
<style scoped>
.arrow {
  background-color: white;
  padding: 3px 4px;
  color: black;
  margin-left: 5px;
  border: solid 1px #ff7c03;
  border-radius: 5px;
  font-weight: 400;
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
  color: #fff;
  cursor: pointer;
  background-color: #ff7c03;
}

.pagination .info {
  padding: 3px 10px;
  display: flex;
}
</style>
