<template>
  <div class="faq">
    <p class="question" @click="toggleAnswer">
      {{ faq.q }}
    </p>
    <p class="answer" ref="answer">
      {{ faq.a }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  props: ["faq"],
  methods: {
    toggleAnswer() {
      // collapse if open, expand if not.
      if (this.isOpen) {
        this.collapse();
      } else {
        this.expand();
      }
      this.isOpen = !this.isOpen;
    },
    collapse() {
      // select the answer element
      const answer = this.$refs.answer;
      answer.style.height = 0; // set its height to 0
    },
    expand() {
      // select answer element
      const answer = this.$refs.answer;

      // set its height to its normal scroll height to expand it fully
      answer.style.height = answer.scrollHeight + "px";
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

::selection {
  user-select: none;
}

/* style the FAQ section */
.question {
  background: #fff;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0px 4px 0px 0 #88888855;
  padding: 10px 0;
  transition: transform 0.2s;
  position: relative;
  color: #ff7c03;
}

.question:hover {
  background: #f1eeee;
}

.question::before {
  content: "";
  margin: 10px;
}

/* styles when the question is clicked */
.question:active {
  transform: translateY(4px);
  box-shadow: none;
}

.answer {
  transition: 0.25s; /* smooth slide-in */
  height: 0; /* starts collapsed */
  overflow: hidden;
  line-height: 1.5;
}

.answer::before {
  content: "";
  margin-right: 10px;
}

/* style the toggleIcon */
.toggleIcon {
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  right: 20px;
  display: inline-block;
  line-height: 0.5;
  color: #666;
}
</style>
