<template>
  <md-content class="">
    <a href="" @click="redirect(item.item.name)">
      <div>
        <img :src="require(`@/assets/feature_img/${item.item.file}`)" />
      </div>
      <div>
        <h3>
          {{ item.item.title }}
        </h3>
        <p>
          {{ item.item.description }}
        </p>
      </div>
    </a>
  </md-content>
</template>

<script>
export default {
  name: "feature-title",
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    redirect(link) {
      this.$router.push({
        name: link,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");
html,
body {
  font-family: "Montserrat", sans-serif;
}
.md-content {
  padding: 24px;
  text-align: center;
}

a h3 {
  font-size: 20px;
  font-weight: 500;
  color: #33333b;
}

a p {
  color: #33333b;
}

img {
  width: 42px;
  height: 42px;
  margin: auto;
}
</style>
