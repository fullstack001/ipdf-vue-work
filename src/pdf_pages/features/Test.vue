<template>
  <div>
    <SwitchLanguage />
    <MultiLingual />
  </div>
</template>
<script>
import MultiLingual from "@/components/MultiLingual.vue";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
export default {
  components: {
    SwitchLanguage,
    MultiLingual,
  },
};
</script>
