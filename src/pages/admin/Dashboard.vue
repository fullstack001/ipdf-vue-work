<template>
  <div class="admin-dashboard">
    <nav>
      <div class="nav-title">Dashboard</div>
      <router-link
        to="/admin/liveview"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin/liveview') }"
      >
        Live View
      </router-link>
      <router-link
        to="/admin/files"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin/files') }"
      >
        Files
      </router-link>
      <router-link
        to="/admin/blogcontent"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin/blogcontent') }"
      >
        Blog Content
      </router-link>
      <router-link
        to="/admin/serverstatus"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin/serverstatus') }"
      >
        Server Status
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    isActive(path) {
      return this.$route.path == path;
    },
  },
};
</script>

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
.active-nav {
  color: #ff7c03;
}
.admin-nav:hover {
  cursor: pointer;
}
</style>
