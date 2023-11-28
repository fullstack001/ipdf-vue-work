<template>
  <div>
    <h3>Extract Mode</h3>
    <div>
      <md-button
        class="md-raised add_range_btn"
        @click="selAll"
        v-bind:class="disAll ? 'active_btn' : ''"
        >Extract all pages</md-button
      >
      <md-button
        class="md-raised add_range_btn"
        @click="selPage"
        v-bind:class="disAll ? '' : 'active_btn'"
        >Select pages</md-button
      >
    </div>
    <div>
      <div v-if="disAll" class="description">
        Seleceted pages will be converted into separate PDF files.
        {{ maxNum }}PDF will be created
      </div>
      <div v-else>
        <md-field style="padding: 0 20px">
          <label>Select Pages</label>
          <md-input
            v-model="selectPages"
            placeholder="example:1,5-8"
            @input="setExtract"
          ></md-input>
        </md-field>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ["maxNum"],
  data() {
    return {
      selectPages: "",
      disAll: true,
    };
  },
  watch: {
    maxNum(newValue) {
      console.log(newValue);
    },
  },
  methods: {
    selPage() {
      this.disAll = false;
      this.$emit("extractChange", []);
    },
    selAll() {
      this.disAll = true;
      let extractArray = [];
      for (let i = 1; i <= this.maxNum; i++) {
        extractArray.push([i, i]);
      }
      this.$emit("extractChange", extractArray);
    },
    setExtract() {
      const string = this.selectPages.replace(/\s/g, "");
      const originArray = string.split(",");
      let temp = [];
      for (let i = 0; i < originArray.length; i++) {
        if (Number(originArray[i])) {
          if (Number(originArray[i]) > this.maxNum) continue;
          temp.push([Number(originArray[i]), Number(originArray[i])]);
        } else {
          let item = originArray[i].split("-");
          let from = Number(item[0]);
          let to = Number(item[1]);
          if (
            from &&
            to &&
            to > from &&
            from < this.maxNum &&
            to < this.maxNum
          ) {
            temp.push([from, to]);
          }
        }
      }
      this.$emit("extractChange", temp);
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  padding-left: 20px;
  font-weight: 400;
}
.add_range_btn {
  background-color: #f5f5fa !important;
  margin: 0 10px 20px 10px;
  border-radius: 5px;
  padding: 5px 0px;
  color: #85858e !important;
}

.add_range_btn:hover,
.add_range_btn:focus,
.add_range_btn:active {
  background-color: #d2d2dd !important;
  /* color: #e75651 !important; */
}
.active_btn {
  background-color: #f5f5fa !important;
  border: solid 2px #e75651;
  color: #e75651 !important;
}

.description {
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3px;
  background-position: 16px;
  background-repeat: no-repeat;
  border-radius: 6px;
  text-align: left;
  color: #161616;
  padding: 24px;
  background-color: #def2ff;
  margin: 10px 20px;
}
</style>
