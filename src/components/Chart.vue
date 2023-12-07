<template>
  <div>
    <radial-progress-bar
      :diameter="200"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      :startColor="'red'"
      :stopColor="'red'"
      :innerStrokeColor="'white'"
      :stroke-width="20"
      :inner-stroke-width="20"
    >
      <h2>
        <b>{{ ((resultSize / originSize) * 100).toFixed(0) }}%</b>
      </h2>
    </radial-progress-bar>
    <p>Origin Size: {{ originSize }}KByte</p>
    <p>Result Size: {{ resultSize }}Byte</p>
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
      totalSteps: 10000,
    };
  },
  created() {
    this.setStep();
  },

  methods: {
    setStep() {
      console.log(234234);
      let i = 0;
      const intervalId = setInterval(() => {
        i = i + 50;
        this.completedSteps = i;
        if (i >= 5000) {
          clearInterval(intervalId);
        }
      }, 2);
    },
  },
};
</script>
