<template>
  <div class="row">
    <div class="col-md-7 sign_panel">
      <h1 class="text-center">PDFDEN</h1>
      <h4 class="card-title mt-3 text-center">Login to your account</h4>
      <form @submit.prevent="handleSubmit">
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
              'is-invalid': (isSubmitted && $v.userForm.email.$error) || errMsg,
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
          <div v-if="emailErr" class="invalid-feedback">
            <span>{{ errMsg }}</span>
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
              'is-invalid':
                (isSubmitted && $v.userForm.password.$error) || passErr,
            }"
          />
          <div
            v-if="(isSubmitted && $v.userForm.password.$error) || passErr"
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.password.required"
              >Password field is required</span
            >
            <span v-if="!$v.userForm.password.minLength"
              >Password should be at least 5 characters long</span
            >
          </div>
          <div v-if="passErr" class="invalid-feedback">
            <span>{{ errMsg }}</span>
          </div>
        </div>

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Log in
          </button>
        </div>
        <!-- form-group// -->
        <p class="text-center">Have an account? <a href="">Log In</a></p>
      </form>
    </div>
    <div class="sign-right col-md-5 padding-auto" p-5>
      <img src="@/assets/img/pdfden.png" class="m-5" width="400px" />
      <div class="title mt-2 mb-2">Log in to your workspace</div>
      <div style="font-size: 20px; margin-top: 40px">
        Enter your email and password to access your iLovePDF account. You are
        one step closer to boosting your document productivity.
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
        email: "",
        password: "",
      },
      isSubmitted: false,
      emailErr: false,
      passErr: false,
      errMsg: "",
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
      this.$axios
        .post("/auth/", this.userForm)
        .then((res) => {
          // Decode the JWT

          localStorage.setItem("token", res.data.token);
          sessionStorage.setItem("token", res.data.token);

          const decoded = VueJwtDecode.decode(res.data.token);
          const user = decoded.user;
          this.setUser(user);
          if (user.isAdmin == 1) {
            this.$router.push("/admin_dashboard");
          } else {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          switch (err.response.data.msg) {
            case "Invalid Credentials":
              this.errMsg = err.response.data.msg;
              this.emailErr = true;
              break;
            case "Invalid Password":
              this.errMsg = err.response.data.msg;
              this.passErr = true;
              this.emailErr = false;
              break;
            default:
              break;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
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
