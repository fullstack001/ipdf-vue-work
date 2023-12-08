<template>
  <div>
    <radial-progress-bar
      :diameter="200"
      :completed-steps="completedSteps"
      :total-steps="originSize"
      :startColor="'red'"
      :stopColor="'red'"
      :innerStrokeColor="'white'"
      :stroke-width="20"
      :inner-stroke-width="20"
      style="margin: auto"
    >
      <h2>
        <b>{{ rate }}%</b>
      </h2>
    </radial-progress-bar>
    <p>Origin Size: {{ originSize }} KByte</p>
    <p>Result Size: {{ resultSize }} KByte</p>
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
    };
  },
  created() {
    this.setStep();
  },

  methods: {
    setStep() {
      let i = 0;
      let intervalId = setInterval(() => {
        this.completedSteps = this.completedSteps + 30;
        this.rate = ((this.completedSteps / this.originSize) * 100).toFixed(0);
        i = i + 15;
        if (this.completedSteps >= this.resultSize) {
          clearInterval(intervalId);
        }
      }, 3);
    },
  },
};
</script>
