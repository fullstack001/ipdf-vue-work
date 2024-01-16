<template>
  <modal title="Set your signature details" @apply_sign="apply_date">
    <div slot="body">
      <h1 class="mb-2">Date format</h1>
      <div class="radio-wraper ml-5 mt-2">
        <div
          style="display: inline-flex"
          v-for="format in dateFormats"
          :key="format"
          class="date_option"
        >
          <input type="radio" :value="format" v-model="dateFormat" />
          <label for="one" style="font-size: xx-large; margin-left: 15px">
            {{ format }}
          </label>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from "@/components/Modal.vue";
const today = new Date();

// Get the components of the date (year, month, day)
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
const day = today.getDate().toString().padStart(2, "0");
const dateFormats = [
  `${day}-${month}-${year}`,
  `${day}/${month}/${year}`,
  `${year}-${month}-${day}`,
  `${year}/${month}/${day}`,
  `${month}-${day}-${year}`,
  `${month}/${day}/${year}`,
];

export default {
  components: {
    modal,
  },
  data() {
    return {
      dateFormats: dateFormats,
      dateFormat: dateFormats[3],
    };
  },

  methods: {
    apply_date() {
      console.log(this.dateFormat);
      this.$emit("close", this.dateFormat);
    },
  },
};
</script>
<style scoped>
.modal-header {
  display: none;
}
.modal-content {
  min-width: 700px;
  min-height: 570px;
}
input[type="radio"] {
  width: 20px;
}
.radio-wraper {
  display: grid;
}
</style>
