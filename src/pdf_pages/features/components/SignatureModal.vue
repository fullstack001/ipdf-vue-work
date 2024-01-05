<template>
  <modal title="Set your signature details" @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <div class="name-initial">
          <!-- Name -->
          <div
            class="form-item name-input"
            :class="{ errorInput: $v.name.$error }"
          >
            <label>Full name:</label>
            <p class="errorText" v-if="!$v.name.required">Field is required!</p>
            <input
              v-model="name"
              :class="{ error: $v.name.$error }"
              @change="$v.name.$touch()"
            />
          </div>
          <!-- Email -->
          <div class="form-item" :class="{ errorInput: $v.email.$error }">
            <label>Initials:</label>
            <p class="errorText" v-if="!$v.email.required">
              Field is required!
            </p>
            <input
              v-model="email"
              :class="{ error: $v.email.$error }"
              @change="$v.email.$touch()"
            />
          </div>
        </div>
      </form>
      <div class="tab-container tabs">
        <div class="tab">
          <input
            type="radio"
            name="css-tabs"
            id="tab-1"
            checked
            class="tab-switch"
          />
          <label for="tab-1" class="tab-label"
            ><i class="fa-solid fa-pencil"></i> Signature</label
          >
          <div class="tab-content">
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
            <br />
            <div style="display: inline-flex">
              <input type="radio" id="one" value="One" v-model="sign_picked" />
              <label for="one">One</label>
            </div>
          </div>
        </div>
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" />
          <label for="tab-2" class="tab-label"
            ><i class="fa-solid fa-spell-check"></i> Initial</label
          >
          <div class="tab-content">Content Two</div>
        </div>
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-3" class="tab-switch" />
          <label for="tab-3" class="tab-label"
            ><i class="fa-solid fa-stamp"></i> Company Stamp</label
          >
          <div class="tab-content">Content Three</div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import modal from "@/components/Modal.vue";

export default {
  components: {
    modal,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      sign_picked: false,
      init_picked: false,
      font_styles: [],
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          repeatPassword: this.repeatPassword,
        };
        console.log(user);

        //DONE
        this.name = "";
        this.email = "";
        this.password = "";
        this.repeatPassword = "";
        this.$v.$reset();
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="scss">
.name-initial {
  display: inline-flex;
}
.name-input {
  width: 400px;
}
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: red;
}

.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
.form-item {
  margin: 20px;
  text-align: left;
}

input.error {
  border-color: red;
}

.tabs {
  position: relative;
  background: #1abc9c;
  height: 14.75rem;
  align-content: center;
  border: solid 1px;
}
.tabs::before,
.tabs::after {
  content: "";
  display: table;
}
.tabs::after {
  clear: both;
}
.tab {
  float: left;
}
.tab-switch {
  display: none;
}
.tab-label {
  position: relative;
  display: block;
  line-height: 2.75em;
  height: 3em;
  padding: 0 1.618em;
  background: #1abc9c;
  border-right: 0.125rem solid #16a085;
  color: #fff;
  cursor: pointer;
  top: 0;
  transition: all 0.25s;
}
.tab-label:hover {
  top: -0.25rem;
  transition: all 0.25s;
}
.tab-content {
  padding: 1.618rem;
  background: #fff;
  color: #2c3e50;
  border-bottom: 0.25rem solid #bdc3c7;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 2.75em;
  left: 0;
  opacity: 0;
  transition: all 0.35s;
  text-align: left;
}
.tab-switch:checked + .tab-label {
  background: #fff;
  color: #2c3e50;
  border-bottom: 0;
  border-top: 0.25rem solid #d60a0a;
  transition: all 0.35s;
  z-index: 2;
  top: -0.0625rem;
}
.tab-switch:checked + .tab-label:hover {
  top: -0.0625rem;
}
.tab-switch:checked + .tab-label + .tab-content {
  opacity: 1;
  transition: all 0.35s;
  z-index: 3;
}
</style>
