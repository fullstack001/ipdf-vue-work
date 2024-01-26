<template>
  <div>
    <h3>{{ $t("page_titles.split_page.extractMode") }}</h3>
    <div>
      <md-button
        class="md-raised add_range_btn"
        @click="selAll"
        v-bind:class="disAll ? 'active_btn' : ''"
        >{{ $t("page_titles.split_page.extractAll") }}</md-button
      >
      <md-button
        class="md-raised add_range_btn"
        @click="selPage"
        v-bind:class="disAll ? '' : 'active_btn'"
        >{{ $t("page_titles.split_page.selectPage") }}</md-button
      >
    </div>
    <div>
      <div v-if="disAll" class="description">
        {{ $t("page_titles.split_page.extract_des_b") }}
        {{ maxNum }}{{ $t("page_titles.split_page.extract_des_a") }}
      </div>
      <div v-else>
        <md-field style="padding: 0 20px">
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
  props: ["maxNum", "extractpage"],
  data() {
    return {
      selectPages: "",
      disAll: true,
    };
  },
  watch: {
    extractpage(newValue) {
      if (newValue.length == this.maxNum) {
        this.disAll = true;
        this.$emit("set_check", false);
      } else {
        this.disAll = false;
        this.$emit("set_check", true);
      }
      let temp = "";
      for (let i = 0; i < newValue.length; i++) {
        if (temp.length > 0) {
          temp = temp + ",";
        }
        let item = newValue[i];
        if (item[0] == item[1]) {
          temp = temp + item[0];
        } else {
          temp = temp + item[0] + "-" + item[1];
        }
      }
      this.selectPages = temp;
    },
  },
  methods: {
    selPage() {
      this.disAll = false;
      this.$emit("extractChange", []);
      this.$emit("set_check", true);
    },
    selAll() {
      this.disAll = true;
      let extractArray = [];
      for (let i = 1; i <= this.maxNum; i++) {
        extractArray.push([i, i]);
      }
      this.$emit("extractChange", extractArray);
      this.$emit("set_check", false);
    },
    setExtract() {
      let last_letter = this.selectPages[this.selectPages.length - 1];
      if (last_letter != "-" && last_letter != ",") {
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
              to <= this.maxNum
            ) {
              temp.push([from, to]);
            }
          }
        }
        this.$emit("extractChange", temp);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
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
  border: solid 2px #ff7c03;
  color: #ff7c03 !important;
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
