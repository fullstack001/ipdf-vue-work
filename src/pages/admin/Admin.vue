<template>
  <div class="admin">
    <nav>
      <div class="nav-title">Dashboard</div>
      <router-link
        to="/admin_dashboard/liveview"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin_dashboard/liveview') }"
      >
        Live View
      </router-link>
      <router-link
        to="/admin_dashboard/files"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin_dashboard/files') }"
      >
        Files
      </router-link>
      <router-link
        to="/admin_dashboard/blogcontent"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin_dashboard/blogcontent') }"
      >
        Blog Content
      </router-link>
      <router-link
        to="/admin_dashboard/serverstatus"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin_dashboard/serverstatus') }"
      >
        Server Status
      </router-link>
      <router-link
        to="/admin_dashboard/changepassword"
        tag="div"
        class="admin-nav"
        :class="{ 'active-nav': isActive('/admin_dashboard/changepassword') }"
      >
        Change Password
      </router-link>
    </nav>
    <div class="router-view-div">
      <router-view></router-view>
    </div>
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
.admin {
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
  margin: 20px 5px;
}
.active-nav {
  color: #ff7c03;
}
.admin-nav:hover {
  cursor: pointer;
}
.router-view-div {
  max-height: 100vh;
  overflow-y: auto;
  width: 100%;
}
</style>
