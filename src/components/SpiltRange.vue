<template>
  <div>
    <h3>{{ $t("page_titles.split_page.rangeMode") }}</h3>
    <md-button
      class="md-raised range_btn"
      v-bind:class="custom_show ? 'active_btn' : ''"
      @click="customRangeEdit"
    >
      {{ $t("page_titles.split_page.customRange") }}
    </md-button>
    <md-button
      class="md-raised range_btn"
      @click="fixedRangeEdit"
      v-bind:class="custom_show ? '' : 'active_btn'"    
    >
      {{ $t("page_titles.split_page.fixedRange") }}
    </md-button>
    <div v-show="custom_show">
      <draggable
        :options="{ animation: 150 }"
        v-model="disArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div
          v-for="range in disArray"
          :key="range.id"
          @mouseover="delete_enable = range.id"
          @mouseleave="delete_enable = null"
        >
          <div class="viewport">
            <md-toolbar class="md-transparent" :md-elevation="1">
              <span class="md-title">
                <img
                  src="@/assets/img/drag-up-down.svg"
                  alt=""
                  style="margin-right: 10px; width: 15px"
                />
                {{ $t("page_titles.split_page.range") }} {{ range.id }}
                <div
                  class="file__btn remove tooltip--top tooltip"
                  @click="remove(disArray.indexOf(range))"
                  v-if="delete_enable == range.id"
                >
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </span>
            </md-toolbar>
            <md-list class="md-double-line">
              <md-list-item>
                <div class="md-list-item-text" style="display: contents">
                  <div class="range-area">
                    <label>{{ $t("page_titles.split_page.fromPage") }}</label>
                    <input
                      type="number"
                      :max="range.range[1]"
                      :min="1"
                      v-model="range.range[0]"
                      @input="range_change"
                    />
                  </div>

                  <div class="range-area">
                    <label>{{ $t("page_titles.split_page.to") }}</label>
                    <input
                      type="number"
                      :max="maxNumber"
                      :min="range.range[0]"
                      v-model="range.range[1]"
                      @input="range_change"
                    />
                  </div>
                </div>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </draggable>
      <md-button class="md-dense add_range_btn" @click="addRange">{{
        $t("page_titles.split_page.addRange")
      }}</md-button>
    </div>
    <div v-show="!custom_show">
      <div>
        Split into page ranges of
        <md-field style="padding: 0 20px">
          <md-input
            v-model="fixed_range"
            type="number"
            :max="maxNumber"
            :min="1"
            @input="setFixedRange"
          ></md-input>
        </md-field>
      </div>
      <div class="description">
        {{ $t("page_titles.split_page.split_des_b") }} {{ fixed_range }}.
        {{ disArray.length }} {{ $t("page_titles.split_page.split_des_a") }}
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  props: ["rangeArray", "maxNumber"],
  data() {
    return {
      fixed_range: 1,
      custom_show: true,
      number: 5,
      disArray: [],
      maxId: 1,
      active: true,
      delete_enable: null,
    };
  },
  watch: {
    rangeArray(newValue) {
      this.disArray = newValue;
    },
  },

  methods: {
    remove(i) {
      if (this.disArray.length > 1) {
        this.disArray.splice(i, 1);
        this.$emit("rangeChange", this.disArray);
      }
    },
    range_change() {
      this.$emit("rangeChange", this.disArray);
    },
    addRange() {
      this.disArray.push({
        id: this.maxId + 1,
        range: [this.maxNumber * 1, this.maxNumber * 1],
      });
      this.maxId++;
      this.$emit("rangeChange", this.disArray);
    },
    customRangeEdit() {
      this.$emit("set_check", true);
      this.active = true;
      this.custom_show = true;
      this.disArray = [{ id: 1, range: [1, this.maxNumber * 1] }];
      this.$emit("rangeChange", this.disArray);
    },
    fixedRangeEdit() {
      this.$emit("set_check", false);
      this.custom_show = false;
      this.disArray = [];
      for (let i = 1; i <= this.maxNumber; i++) {
        this.disArray.push({ id: i, range: [i, i] });
      }
    },
    setFixedRange() {
      this.disArray = [];
      if (!this.fixed_range || this.fixed_range < 1) {
        this.fixed_range = 1;
      }
      this.fixed_range = this.fixed_range * 1;
      let i;
      let j = 1;
      for (i = 1; i <= this.maxNumber; i = i + this.fixed_range * 1) {
        let from = i;
        let to =
          i + this.fixed_range * 1 - 1 < this.maxNumber
            ? i + this.fixed_range * 1 - 1
            : this.maxNumber;
        this.disArray.push({ id: j, range: [from, to] });
        j++;
      }
      this.$emit("rangeChange", this.disArray);
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


.range_btn:hover,
.range_btn:focus{
  padding: 5px 0px;
  font-size: 14px;
  margin: 10px 10px;  
  border-radius: 10px;
  color: #85858e !important;
  font-weight: 500;
  background-color: #ff7c03 !important;
}


.file__btn {
  background: #fefefe;
  padding-left: 6px;
  color: black;
  padding-right: 6px;
  border-radius: 100%;
  font-size: 17px;
  font-weight: bold;
  margin-top: -33px;
}
.remove {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.md-button-content {
  padding: 5px 3px 15px 3px !important;
}

.md-toolbar:hover {
  background-color: #d2d2dd !important;
  cursor: move;
}
.viewport:hover {
  background-color: #d2d2dd !important;
}
.md-toolbar {
  font-size: 15px !important;
}

.md-field label {
  font-size: 14px !important;
}
.ml-list {
  padding: 0px !important;
}

.add_range_btn {
  background-color: #f5f5fa !important;
  border: solid 2px #ff7c03;
  border-radius: 5px;
  padding: 10px !important;
  height: 48px !important;
  /* color: #ff7c03 !important; */
}

.add_range_btn:hover,
.add_range_btn:focus,
.add_range_btn:active {
  background-color: #d2d2dd !important;
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

.range-area {
  display: flex;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 4px;
  padding-left: 8px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #707078;
}

.range-area label {
  padding: 10px 0px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87) !important;
}

.range-area input {
  border: 1px solid #707078;
  border-top: none;
  border-right: none;
  border-bottom: none;
  padding-left: 5px;
}
</style>
