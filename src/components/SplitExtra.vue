<template>
  <div>
    <div>
      <md-button class="md-raised md-danger" @click="selAll"
        >Extract all pages</md-button
      >
      <md-button class="md-raised md-success" @click="selPage"
        >Select pages</md-button
      >
    </div>
    <div>
      <div v-if="disAll">
        Seleceted pages will be converted into separate PDF files.
        {{ maxNum }}PDF will be created
      </div>
      <div v-else>
        <md-field>
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
import G from "glob";

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
