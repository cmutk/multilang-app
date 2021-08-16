<template>
  <form>
    <div class="title-container">
      <h3>{{ $t("formContent.titles.loginForm") }}</h3>
      <LocalePicker />
    </div>
    <label :class="[v$.name.$error ? 'error' : '']">
      <span class="input-title">{{ $t("formContent.name") }}</span>
      <input type="text" v-model="name" />
      <span v-if="v$.name.$error" class="validation-message">{{
        v$.name.$errors[0].$message
      }}</span>
    </label>
    <label :class="[v$.email.$error ? 'error' : '']">
      <span class="input-title">{{ $t("formContent.email") }}</span>
      <input type="email" name="email" id="email" v-model="email" />
      <span v-if="v$.email.$error" class="validation-message">{{
        v$.email.$errors[0].$message
      }}</span>
    </label>
    <label :class="[v$.password.$error ? 'error' : '']">
      <span class="input-title">{{ $t("formContent.password") }}</span>
      <input type="password" name="password" id="password" v-model="password" />
      <span v-if="v$.password.$error" class="validation-message">{{
        v$.password.$errors[0].$message
      }}</span>
    </label>
    <div class="row-container button-container">
      <div class="btn primary" @click="closeModal">Cancel</div>
      <div class="btn primary" @click.stop="submitForm">
        {{ $t("formContent.loginButton") }}
      </div>
    </div>
  </form>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import useUserState from "@/store/useUserState.js";
import LocalePicker from "./LocalePicker.vue";
const { logUserIn } = useUserState();
export default {
  name: "LoginForm",
  emits: ["closeModal"],
  components: {
    LocalePicker,
  },
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      email: "",
      password: "",
    };
  },

  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    handleUserLogin() {
      const data = {
        name: this.name,
        email: this.email,
      };
      logUserIn(data);
    },
    submitForm() {
      if (this.v$.$validate() && this.v$.$errors.length === 0) {
        this.handleUserLogin();
        this.closeModal();
      }
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
label {
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
}
input {
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  padding: 0.5rem;
}
label:focus-within {
  font-weight: bold;
}
.title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto 16px 32px 16px;
}
.button-container div {
  display: flex;
}
.input-title {
  margin-bottom: 8px;
}
.validation-message {
  margin-top: 4px;
  margin-left: 8px;
  font-size: 12px;
}
.error {
  color: red;
}
.error > input {
  border-color: red;
  outline-color: red;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
}
</style>
