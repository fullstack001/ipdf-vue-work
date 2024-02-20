<template>
  <div class="row">
    <div class="col-md-7 sign_panel text-center">
      <img class="mb-4" src="@/assets/img/vue-logo.png" width="240" srcset="" />
      <h2 class="my-3">{{ $t("page_titles.signUp.create") }}</h2>
      <!-- <div class="social-btns">
        <div href="" class="btn btn-block btn-twitter text-white mx-2">
          <i class="fab fa-twitter"></i>   Login via Twitter
        </div>
        <div href="" class="btn btn-block btn-facebook text-white mx-2">
          <i class="fab fa-google"></i>   Login via Google
        </div>
      </div> -->
      <form @submit.prevent="handleSubmit">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            class="form-control py-4"
            :placeholder="$t('page_titles.signUp.fullName')"
            type="text"
            v-model="userForm.name"
            id="name"
            name="name"
            :class="{ 'is-invalid': isSubmitted && $v.userForm.name.$error }"
          />
          <div
            v-if="isSubmitted && !$v.userForm.name.required"
            class="invalid-feedback"
          >
            {{ $t("page_titles.signUp.name_req") }}
          </div>
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name="email"
            id="email"
            v-model="userForm.email"
            class="form-control py-4"
            :placeholder="$t('page_titles.signUp.email')"
            type="text"
            :class="{
              'is-invalid':
                (isSubmitted && $v.userForm.email.$error) || userExit,
            }"
          />
          <div
            v-if="isSubmitted && $v.userForm.email.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.email.required">
              {{ $t("page_titles.signUp.email_req") }}
            </span>
            <span v-if="!$v.userForm.email.email">
              {{ $t("page_titles.signUp.email_type") }}
            </span>
          </div>
          <div v-if="userExit" class="invalid-feedback">
            <span>{{ $t("page_titles.signUp.email_exi") }}</span>
          </div>
        </div>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control pt-4 pb-4"
            :placeholder="$t('page_titles.signUp.pass')"
            type="password"
            v-model="userForm.password"
            id="password"
            name="password"
            :class="{
              'is-invalid': isSubmitted && $v.userForm.password.$error,
            }"
          />
          <div
            v-if="isSubmitted && $v.userForm.password.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.password.required">
              {{ $t("page_titles.signUp.pass_req") }}
            </span>
            <span v-if="!$v.userForm.password.minLength">
              {{ $t("page_titles.signUp.pass_length") }}
            </span>
          </div>
        </div>

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-danger btn-block signup-btn">
            {{ $t("page_titles.signUp.signUp") }}
          </button>
        </div>
        <!-- form-group// -->
        <p class="text-center">
          {{ $t("page_titles.signUp.have_acc") }}
          <LocalizedLink to="login">
            {{ $t("nav-links.login") }}
          </LocalizedLink>
        </p>
      </form>
    </div>
    <div class="sign-right col-md-5 padding-auto" p-5>
      <img src="@/assets/img/pdfden.png" class="m-5" width="400px" />
      <div class="title mt-2 mb-2">
        {{ $t("page_titles.signUp.tool_title") }}
      </div>
      <div style="font-size: 20px; margin-top: 40px">
        {{ $t("page_titles.signUp.tool_des") }}
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import { required, email, minLength } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";
import LocalizedLink from "@/components/LocalizedLink";

export default {
  data() {
    return {
      userForm: {
        name: "",
        email: "",
        password: "",
      },
      isSubmitted: false,
      userExit: false,
    };
  },
  components: {
    LocalizedLink,
  },
  computed: {
    user() {
      return store.state.user;
    },
  },
  validations: {
    userForm: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    setUser(user) {
      store.commit("setUser", user);
    },
    handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$axios
        .post("/users/", this.userForm)
        .then((res) => {
          // Decode the JWT

          localStorage.setItem("token", res.data.token);
          sessionStorage.setItem("token", res.data.token);

          const decoded = VueJwtDecode.decode(res.data.token);
          const user = decoded.user;

          // console.log(user);
          this.setUser(user);
          this.$router.push("/");
        })
        .catch((err) => {
          this.userExit = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
<style scoped>
.social-btns {
  display: flex;
}
.form-group {
  margin-top: 30px;
}
.sign_panel {
  background-color: #fffdfd;
  padding: 270px;
  padding-top: 100px;
}
input {
  padding-left: 20px;
}
.signup-btn {
  display: block;
  width: 30%;
  padding: 10px;
  border-radius: 20px;
  margin: auto;
}

.btn-facebook {
  background-color: #405d9d;
  color: #fff;
}
.btn-twitter {
  background-color: #42aeec;
  color: #fff;
}
.sign-right {
  padding: 136px;
  background-color: #f2f3f8;
}
.title {
  font-size: 30px;
  font-weight: bold;
}

@media (max-width: 960px) {
  .sign-right[data-v-a3068648] {
    padding: 40px;
    background-color: #f2f3f8;
  }

  .sign_panel[data-v-a3068648] {
    background-color: #fffdfd;
    padding: 30px;
    padding-top: 30px;
  }
  img {
    margin: 0rem !important;
    width: 235px;
  }
}
</style>
