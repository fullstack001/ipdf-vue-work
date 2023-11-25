<template>
  <div>
    <h5>Range mode:</h5>
    <md-button class="md-raised md-danger" @click="custom_show = true"
      >Custom ranges</md-button
    >
    <md-button class="md-raised md-success" @click="custom_show = false"
      >Fixed ranges</md-button
    >
    <draggable
      :options="{ animation: 150 }"
      v-model="disArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
      v-show="custom_show"
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
                    @change="first_page_change"
                  ></md-input>
                </md-field>

                <md-field>
                  <label>To page</label>
                  <md-input type="number" @change="last_page_change"></md-input>
                </md-field>
              </div>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </draggable>

    <div v-show="!custom_show">
      <div>
        Split into page ranges of
        <md-field>
          <md-input v-model="default_fixed" type="number"></md-input>
        </md-field>
      </div>
      <div>
        This PDF will be split into files of {{ default_fixed }}.
        {{ default_fixed }}PDFs will be created
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
  props: {
    rangeArray: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      default_fixed: 1,
      custom_show: true,
      number: 5,
      disArray: [],
    };
  },
  created() {
    this.disArray = this.rangeArray;
    console.log(this.disArray, this.rangeArray);
  },
  methods: {
    remove(i) {
      console.log("remove");
    },
    first_page_change(e) {
      console.log(e.target.value());
    },

    last_page_change(e) {
      console.log(e.target.value());
    },
  },
};
</script>
