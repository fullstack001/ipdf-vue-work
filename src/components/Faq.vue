<template>
  <div class="each-question">
    <div class="question" @click="faqItem.active = !faqItem.active">
      <div>
        {{ faqItem.q }}
      </div>
      <div class="indicator">
        {{ faqItem.active ? "-" : "+" }}
      </div>
    </div>
    <div class="answer" v-show="faqItem.active">
      {{ faqItem.a }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["faq"],
  data() {
    return {
      isOpen: false,
      faqItem: this.faq,
    };
  },
};
</script>

<style scoped>
::selection {
  user-select: none;
}

/* style the FAQ section */
.question {
  background: #fff;
  cursor: pointer;
  font-weight: bold;
  /* box-shadow: 0px 4px 0px 0 #88888855; */
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

.answer {
  transition: 0.25s; /* smooth slide-in */
  overflow: hidden;
  line-height: 1.5;
  margin-top: 22px;
  margin-bottom: 10px;
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
  /* line-height: 0.5;
  color: #666; */
}

.indicator {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #1b1a1a;
}
.each-question {
  padding-top: 32px;
  padding-bottom: 10px;
  font-size: 20px;
  border-bottom: solid 1px #88888855;
}
@media (max-width: 640px) {
  .description-title {
    font-size: 20px;
  }
  .each-question {
    padding-top: 5px;
    font-size: 15px;
  }
}
</style>
