<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
.tab-area .md-tabs-navigation {
  box-shadow: none;
  padding: 10px;
}

.tab-area .md-button-content {
  display: grid !important;
}

.tab-area .md-button-content .md-tab-label {
  color: #333 !important;
  font-size: 18px;
}

.tab-area .md-button-content .md-tab-icon {
  color: #333 !important;
  font-size: 50px !important;
  width: 50px !important;
  height: 50px !important;
}

.md-tabs-navigation .md-active {
  border: solid 1px #e5322d;
}

.md-button.md-primary {
  background-color: #e5322d !important;
}

.picker-dialog-frame {
  min-height: 600px;
}
</style>
