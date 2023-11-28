<template>
  <div>
    <md-toolbar md-elevation="0" class="md-transparent nav-par">
      <div class="md-toolbar-row nav-top">
        <router-link to="/">
          <img src="@/assets/img/vue-logo.png" width="160" srcset="" />
        </router-link>
        <router-link to="/pdfmerge">
          <p class="nav-btn active-link">
            <b>MERGE PDF</b>
          </p>
        </router-link>
        <router-link to="/pdfspilt">
          <p class="nav-btn">
            <b>SPLIT PDF</b>
          </p>
        </router-link>
        <p class="nav-btn"><b>COMPRESS PDF</b></p>
        <p class="nav-btn"><b>CONVERT PDF</b></p>
        <p class="nav-btn"><b>ALL PDF TOOLS</b></p>

        <div class="md-toolbar-section-end">
          <div class="md-collapse">
            <md-list>
              <md-list-item>
                <i md-size="big" class="material-icons">dashboard</i>
                <p class="hidden-lg hidden-md">Dashboard</p>
              </md-list-item>
              <li class="md-list-item">
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon dm-size="large">person</md-icon>
                      <p class="hidden-lg hidden-md">Profile</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </li>
              <li class="md-list-item">
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon dm-size="large">menu</md-icon>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </li>
            </md-list>
          </div>
        </div>
      </div>
    </md-toolbar>
    <edit-content></edit-content>
  </div>
</template>

<script>
import EditContent from "./EditContent.vue";
export default {
  components: {
    EditContent,
  },

  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
};
</script>

<style lang="css">
.nav-top {
  background: #fff;
  width: 100%;
  height: 60px;
  z-index: 1041;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  -webkit-box-shadow: 0 3px 6px 0 rgba(50, 50, 50, 0.3);
  box-shadow: 0 3px 6px 0 rgba(50, 50, 50, 0.3);
  padding: 10px 24px 0;
}
.nav-btn {
  margin-left: 50px;
  font-size: 12px;
  cursor: pointer;
  color: #495057;
}

.nav-btn:hover {
  color: #e5322d;
}

.download_btn {
  color: #fff !important;
}

.md-theme-default a:not(.md-button) {
  color: #e5322d;
}

.active-link {
  color: #e5322d;
}
</style>
