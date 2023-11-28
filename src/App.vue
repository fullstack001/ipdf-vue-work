<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>

<style>
  .tab-area .md-tabs-navigation{
    box-shadow: none;
  }

  .tab-area .md-button-content{
    display: grid !important;  
  }  

  .tab-area .md-button-content .md-tab-label{
    color: #333 !important;
    font-size: 18px;
  }

  .tab-area .md-button-content .md-tab-icon{
    color: #333 !important;
    font-size: 50px !important;
    width: 50px !important;
    height: 50px !important;
  }


</style>