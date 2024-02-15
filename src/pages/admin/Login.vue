<template>
  <div class="admin_sign text-center">
    <img
      class="mt-3 mb-4"
      src="@/assets/img/vue-logo.png"
      width="240"
      srcset=""
    />
    <h2 class="my-3">Login as Admin</h2>

    <form @submit.prevent="handleSubmit">
      <div>
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
            <span>email fail</span>
          </div>
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
          LogIn
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import store from "@/store/index.js";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      userForm: {
        email: "",
        password: "",
      },
      isSubmitted: false,
      userExit: false,
    };
  },
  computed: {
    user() {
      return store.state.user;
    },
  },
  validations: {
    userForm: {
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
      console.log(this.userForm);
      this.$axios
        .post("/admin/login", this.userForm)
        .then((res) => {
          // console.log(res.data);
          localStorage.setItem("token", res.data.token);
          this.$emit("authen");
          //   this.$router.push("/admin/liveview");
        })
        .catch((err) => {
          const errorMessage = err.response.data.errors[0].msg;
          console.log(errorMessage);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>

<style scoped>
.admin_sign {
  width: 30%;
  margin: auto;
}
</style>
