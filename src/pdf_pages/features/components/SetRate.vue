<template>
  <div id="rateSection" class="section section-4 even tc">
    <h2 class="title">Please rate this app</h2>
    <div class="content container">
      <div class="stars">
        <star-rating
          :increment="0.5"
          :border-width="4"
          :star-size="30"
          :rating="rating"
          border-color="#d8d8d8"
          :rounded-corners="true"
          :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19,
            31, 17,
          ]"
          :show-rating="false"
          @rating-selected="setRating"
        ></star-rating>
      </div>
      <div>
        <textarea
          name="reviewText"
          placeholder="Your impressions and thoughts. Please rate fairly."
          autocomplete="off"
          aria-label="Review"
          v-model="comment"
        ></textarea>
      </div>
      <div>
        <button
          class="submitBtn"
          data-msg="Thank you!"
          @click="submitRate"
          v-if="rating > 0 && !submitedRate"
        >
          Submit
        </button>
        <div v-if="submitedRate" style="font-size: 20px; padding-bottom: 20px">
          Thank you!
        </div>
      </div>
      <!-- <div class="mt3">
        <a class="rightArrow" href="/en/contact">Please report problems here</a>
      </div> -->
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  data: function () {
    return {
      rating: 0,
      comment: "",
      submitedRate: false,
    };
  },
  methods: {
    setRating: function (rating) {
      this.rating = rating;
    },
    submitRate() {
      const data = { rate: this.rating, comment: this.comment };
      this.$axios
        .post("/comment/rate", data)
        .then((res) => {
          this.rating = 0;
          this.comment = "";
          this.submitedRate = true;
        })
        .catch((err) => {
          this.rating = 0;
          this.comment = "";
          this.submitedRate = true;
        });
    },
  },
};
</script>
<style scoped>
#rateSection {
  padding-top: 20px;
  background: #fefefe;
}
.container {
  width: 1270px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  max-width: 100%;
  display: inherit;
}
#rateSection .stars {
  user-select: none;
  display: flex;
  justify-content: center;
}

#rateSection textarea {
  height: 90px;
  width: 88%;
  max-width: 800px;
  font-size: 15px;
  font-family: inherit;
  margin: 10px 0 15px;
  padding: 10px;
  box-sizing: border-box;
}
#rateSection button {
  font-size: 15px;
  padding: 3px 10px;
  margin: 15px;
  border-radius: 3px;
  background-color: #e7711b;
  border: solid 1px rgb(231, 113, 27);
  color: #fefefe;
  cursor: pointer;
}
#rateSection button:hover {
  color: #900000;
}
a,
a:visited,
.link {
  padding-top: 20px;
  text-decoration: none;
  cursor: pointer !important;
  color: #900000;
  color: var(--theme-link-color, #900000);
}

h2 {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.5em;
}
</style>
