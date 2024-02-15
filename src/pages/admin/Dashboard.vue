<template>
  <div class="admin-dashboard">
    <nav>
      <div class="nav-title">Dashboard</div>
      <router-link to="/admin/liveview" tag="div" class="admin-nav">
        Live View
      </router-link>
      <router-link to="/admin/files" tag="div" class="admin-nav">
        Files
      </router-link>
      <router-link to="/admin/blogcontent" tag="div" class="admin-nav">
        Blog Content
      </router-link>
      <router-link to="/admin/serverstatus" tag="div" class="admin-nav">
        Server Status
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
}
nav {
  height: 100vh;
  width: 15%;
  text-align: center;
  background-color: #012;
  color: #fefefe;
  font-size: 21px;
}
.nav-title {
  padding: 26px 0;
  font-size: 34px;
  margin-bottom: 20px;
  background-color: #033;
}
.admin-nav {
  margin: 20px 0;
}
</style>
