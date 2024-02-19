<template>
  <div class="repassword-container">
    <h3>Change Password</h3>
    <div class="repassword">
      <form @submit.prevent="handleSubmit">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control pt-4 pb-4"
            placeholder="Old Password"
            type="password"
            v-model="userForm.oldPassword"
            id="oldPassword"
            name="oldPassword"
            :class="{
              'is-invalid':
                (isSubmitted && $v.userForm.oldPassword.$error) || errMsg,
            }"
          />
          <div
            v-if="(isSubmitted && $v.userForm.oldPassword.$error) || errMsg"
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.oldPassword.required">
              This field is required
            </span>
            <span v-if="!$v.userForm.oldPassword.minLength">
              Password should be at least 6 characters long
            </span>
            <span v-if="errMsg == 'Invalid Password'">
              {{ errMsg }}
            </span>
          </div>
        </div>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control pt-4 pb-4"
            placeholder="New Password"
            type="password"
            v-model="userForm.newPassword"
            id="newPassword"
            name="newPassword"
            :class="{
              'is-invalid':
                (isSubmitted && $v.userForm.newPassword.$error) || errMsg,
            }"
          />
          <div
            v-if="(isSubmitted && $v.userForm.newPassword.$error) || errMsg"
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.newPassword.required">
              This field is required
            </span>
            <span v-if="!$v.userForm.newPassword.minLength">
              Password should be at least 6 characters long
            </span>
            <span v-if="errMsg == 'You are using this password now'">
              {{ errMsg }}
            </span>
          </div>
        </div>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control pt-4 pb-4"
            placeholder="Confirm Password         "
            type="password"
            v-model="userForm.confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            :class="{
              'is-invalid':
                (isSubmitted && $v.userForm.confirmPassword.$error) ||
                !isMatched,
            }"
          />
          <div
            v-if="
              (isSubmitted && $v.userForm.confirmPassword.$error) || !isMatched
            "
            class="invalid-feedback"
          >
            <span v-if="!$v.userForm.confirmPassword.required">
              This field is required
            </span>
            <span v-if="!$v.userForm.confirmPassword.minLength">
              Password should be at least 6 characters long
            </span>
            <span v-else-if="!isMatched"> Password should be matched </span>
          </div>
        </div>

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-danger btn-block signup-btn">
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      userForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      isSubmitted: false,
      isMatched: true,
      errMsg: null,
    };
  },

  computed: {
    user() {
      return store.state.user;
    },
  },
  validations: {
    userForm: {
      oldPassword: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
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
      this.errMsg = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.userForm.newPassword !== this.userForm.confirmPassword) {
        this.isMatched = false;
        return;
      }
      this.$axios
        .post("/auth/changePassword", this.userForm)
        .then((res) => {
          // Decode the JWT
          this.$swal(
            "Success!",
            "You can use new password from now",
            "success"
          );
          this.errMsg = null;
          this.isSubmitted = false;
          this.isMatched = true;
          this.userForm.oldPassword =
            this.userForm.newPassword =
            this.userForm.confirmPassword =
              "";
        })
        .catch((err) => {
          switch (err.response.data.msg) {
            case "Invalid Password":
              this.errMsg = "Invalid Password";
              break;
            case "You are using this password now":
              this.errMsg = "You are using this password now";
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
.repassword-container {
  margin: auto;
  padding: auto;
  width: 80%;
  margin-top: 50px;
}
h4 {
  margin: 20px 30px;
}
h6 {
  margin: 10px 50px;
}
</style>
