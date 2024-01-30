<template>
  <div class="deleted-page">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <div class="delete-page-title">This task has already been deleted.</div>
    <div class="deleted_btn">
      <a id="link" class="deleted__btn md-raised md-danger" @click="go_home">
        <div class="md-icon-button back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="16"
            style="margin-top: 13px"
          >
            <path
              d="M6.533 15.065L.438 8.968c-.116-.116-.208-.255-.27-.4a1.27 1.27 0 0 1 .009-.971c.066-.155.16-.296.277-.415l6.21-6.21A1.27 1.27 0 0 1 8.461.947c.49.49.485 1.295-.017 1.797l-4.02 4.02 10.47-.097a1.24 1.24 0 0 1 1.258 1.258 1.3 1.3 0 0 1-1.282 1.282L4.4 9.305l3.947 3.947c.49.492.485 1.295-.017 1.797s-1.306.508-1.797.017z"
              fill="#fff"
              fill-rule="nonzero"
            ></path>
          </svg>
        </div>
        Back to homepage
      </a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    back_page() {
      this.$router.push(`/`);
    },
    go_home() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.deleted-page {
  text-align: center;
  padding-top: 50px;
}
.delete-page-title {
  font-size: 26px;
  font-weight: 500;
}

.deleted__btn {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 80px;
  min-width: 330px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 24px 48px;
  font-weight: 500;
  font-size: 24px;
  background: #ff7c03;
  line-height: 28px;
  vertical-align: middle;
  color: #fff !important;
  text-decoration: none;
  margin-bottom: 12px;
  -webkit-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  border: 0;
  border-radius: 12px;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14);
  -ms-flex-order: 1;
  order: 1;
  max-width: 60vw;
  margin-top: 50px;
}

.deleted__btn:hover {
  color: #fff !important;
  background: #ff7c03;
  cursor: pointer;
}
.deleted__btn:focus {
  color: #fff !important;
  background: #ff7c03;
}

.deleted_btn {
  color: #fff !important;
  position: relative;
  width: fit-content;
  margin: auto;
}
</style>
