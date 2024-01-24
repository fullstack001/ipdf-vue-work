<template>
  <div class="row">
    <div class="col-md-7 sign_panel">
      <h1 class="text-center">PDFDEN</h1>
      <h4 class="card-title mt-3 text-center">Create new account</h4>
      <p>
        <a href="" class="btn btn-block btn-twitter">
          <i class="fab fa-twitter"></i>   Login via Twitter</a
        >
        <a href="" class="btn btn-block btn-facebook text-white">
          <i class="fab fa-google"></i>   Login via Google</a
        >
      </p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Full name"
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
            Name field is required
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
            class="form-control"
            placeholder="Email address"
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
            <span v-if="!$v.userForm.email.required"
              >Email field is required</span
            >
            <span v-if="!$v.userForm.email.email"
              >Please provide valid email</span
            >
          </div>
          <div v-if="userExit" class="invalid-feedback">
            <span>User already Exist</span>
          </div>
        </div>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Create password"
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
            <span v-if="!$v.userForm.password.required"
              >Password field is required</span
            >
            <span v-if="!$v.userForm.password.minLength"
              >Password should be at least 5 characters long</span
            >
          </div>
        </div>

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Create New Account
          </button>
        </div>
        <!-- form-group// -->
        <p class="text-center">Have an account? <a href="">Log In</a></p>
      </form>
    </div>
    <div class="sign-right col-md-5 padding-auto" p-5>
      <img src="@/assets/img/pdfden.png" class="m-5" width="400px" />
      <div class="title mt-2 mb-2">PDF tools for productive people</div>
      <div style="font-size: 20px; margin-top: 40px">
        iLovePDF helps you convert, edit, e-sign, and protect PDF files quickly
        and easily. Enjoy a full suite of tools to effectively manage documents
        —no matter where you’re working.
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import { required, email, minLength } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";

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

          const decoded = VueJwtDecode.decode(res.data.token);
          const user = decoded.user;

          console.log(user);
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
<style scoped>
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
</style>
