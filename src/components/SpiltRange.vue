<template>
  <div>
    <h5>Range mode:</h5>
    <md-button class="md-raised md-danger" @click="customRangeEdit"
      >Custom ranges</md-button
    >
    <md-button class="md-raised md-success" @click="fixedRangeEdit"
      >Fixed ranges</md-button
    >
    <div v-show="custom_show">
      <draggable
        :options="{ animation: 150 }"
        v-model="disArray"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <div v-for="range in disArray" :key="range.id">
          <div class="viewport">
            <md-toolbar :md-elevation="1">
              <span class="md-title">
                Range{{ range.id }}
                <a
                  class="file__btn remove tooltip--top tooltip"
                  @click="remove(disArray.indexOf(range))"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  >
                    <polygon
                      fill="#47474F"
                      fill-rule="evenodd"
                      points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
                    ></polygon>
                  </svg>
                </a>
              </span>
            </md-toolbar>
            <md-list class="md-double-line">
              <md-list-item>
                <div class="md-list-item-text" style="display: inline-block">
                  <md-field>
                    <label> From Page</label>
                    <md-input
                      type="number"
                      :max="range.range[1]"
                      :min="1"
                      v-model="range.range[0]"
                      @input="range_change"
                    ></md-input>
                  </md-field>

                  <md-field>
                    <label>To page</label>
                    <md-input
                      type="number"
                      :max="maxNumber"
                      :min="range.range[0]"
                      v-model="range.range[1]"
                      @input="range_change"
                    ></md-input>
                  </md-field>
                </div>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </draggable>
      <md-button class="md-dense md-primary" @click="addRange"
        >+ Add Range</md-button
      >
    </div>
    <div v-show="!custom_show">
      <div>
        Split into page ranges of
        <md-field>
          <md-input
            v-model="fixed_range"
            type="number"
            :max="maxNumber"
            :min="1"
            @input="setFixedRange"
          ></md-input>
        </md-field>
      </div>
      <div>
        This PDF will be split into files of {{ fixed_range }}.
        {{ disArray.length }}PDFs will be created
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
    };
  },
  watch: {
    rangeArray(newValue) {
      this.disArray = newValue;
    },
  },

  methods: {
    remove(i) {
      this.disArray.splice(i, 1);
      this.$emit("rangeChange", this.disArray);
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
      this.custom_show = true;
      this.disArray = [{ id: 1, range: [1, this.maxNumber * 1] }];
      this.$emit("rangeChange", this.disArray);
    },
    fixedRangeEdit() {
      this.custom_show = false;
      this.disArray = [];
      for (let i = 1; i <= this.maxNumber; i++) {
        this.disArray.push({ id: i, range: [i, i] });
      }
    },
    setFixedRange() {
      this.disArray = [];
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
