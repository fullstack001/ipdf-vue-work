<template>
  <radial-progress-bar
    :diameter="250"
    :completed-steps="completedSteps"
    :total-steps="totalSteps"
    :startColor="'blue'"
    :stopColor="'red'"
    :innerStrokeColor="'white'"
    :stroke-width="20"
    :inner-stroke-width="20"
  >
    <p>Total steps: {{ totalSteps }}</p>
    <p>Completed steps: {{ completedSteps }}</p>
  </radial-progress-bar>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  components: {
    RadialProgressBar,
  },
  props: ["resultSize"],
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
