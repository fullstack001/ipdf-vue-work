<template>
  <div>
    <radial-progress-bar
      :diameter="200"
      :completed-steps="completedSteps"
      :total-steps="100"
      :startColor="'#ff7c03'"
      :stopColor="'#ff7c03'"
      :innerStrokeColor="'white'"
      :stroke-width="20"
      :inner-stroke-width="20"
      style="margin: auto"
    >
      <h2>
        <b>{{ disRate }} %</b>
      </h2>
      <h2 style="margin-top: -93px !important; margin-bottom: 70px">
        <b>Saved</b>
      </h2>
    </radial-progress-bar>
    <p>
      Origin Size:
      {{
        originSize > 1024
          ? (originSize / 1024).toFixed(2) + " MB"
          : originSize + "KB"
      }}
    </p>
    <p>
      Result Size:
      {{
        resultSize > 1024
          ? (resultSize / 1024).toFixed(2) + " MB"
          : resultSize + "KB"
      }}
    </p>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  components: {
    RadialProgressBar,
  },
  props: ["resultSize", "originSize"],
  data() {
    return {
      completedSteps: 0,
      rate: 0,
      disRate: 0,
    };
  },
  created() {
    this.rate = (
      ((this.originSize - this.resultSize) / this.originSize) *
      100
    ).toFixed(0);
    this.setStep();
  },

  methods: {
    setStep() {
      let intervalId = setInterval(() => {
        this.completedSteps = this.completedSteps + 1;
        this.disRate = this.completedSteps.toFixed(0);
        if (this.completedSteps >= this.rate) {
          clearInterval(intervalId);
        }
      }, 10);
    },
  },
};
</script>
