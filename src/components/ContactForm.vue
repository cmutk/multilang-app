<template>
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
  <div class="row-container" style="justify-content: space-between">
    <label :class="[v$.cleanedPhoneNumber.$error ? 'error' : '']">
      <span class="input-title">{{ $t("formContent.phonenumber") }}</span>
      <input type="tel" v-model="phoneNumber" @change="handlePhoneNumber" />
      <span v-if="v$.cleanedPhoneNumber.$error" class="validation-message">{{
        v$.cleanedPhoneNumber.$errors[0].$message
      }}</span>
    </label>
    <SearchableSelectBox
      @OnItemSelected="onSelectCountry"
      :Title="$t('formContent.country')"
      :List="countryList[this.$i18n.locale]"
      :class="[v$.selectedCountry.$error ? 'error' : '']"
      :errorMessage="
        v$.selectedCountry.$error ? v$.selectedCountry.$errors[0].$message : ''
      "
    />
  </div>

  <label :class="[v$.message.$error ? 'error' : '']">
    <span class="input-title">{{ $t("formContent.message") }}</span>
    <textarea rows="15" v-model="message" style="resize: none" />
    <span v-if="v$.message.$error" class="validation-message">{{
      v$.message.$errors[0].$message
    }}</span>
  </label>
  <div class="row-container">
    <div class="btn primary" @click="submitForm">
      {{ $t("formContent.sendButton") }}
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  numeric,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import SearchableSelectBox from "./SearchableSelectBox.vue";
import useUserState from "@/store/useUserState.js";
const { getIsLoggedIn, getUserInfo } = useUserState();
export default {
  components: { SearchableSelectBox },
  name: "ContactForm",
  data() {
    return {
      isUserLoggedIn: getIsLoggedIn(),
      userInfo: getUserInfo(),
      v$: useVuelidate(),
      name: "",
      email: "",
      selectedCountry: {},
      countryList: {
        en: [
          { id: "TR", name: "Turkey" },
          { id: "US", name: "United States of America" },
          { id: "GB", name: "United Kingdom" },
          { id: "DE", name: "Germany" },
          { id: "SE", name: "Sweden" },
          { id: "KE", name: "Kenya" },
          { id: "BR", name: "Brazil" },
          { id: "ZW", name: "Zimbabwe" },
        ],
        tr: [
          { id: "TR", name: "Türkiye" },
          { id: "US", name: "Amerika Birleşik Devletleri" },
          { id: "GB", name: "Birleşik Krallık" },
          { id: "DE", name: "Almanya" },
          { id: "SE", name: "İsveç" },
          { id: "KE", name: "Kenya" },
          { id: "BR", name: "Brazilya" },
          { id: "ZW", name: "Zimbabve" },
        ],
      },
      phoneNumber: "",
      cleanedPhoneNumber: "",
      message: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      selectedCountry: { required },
      cleanedPhoneNumber: {
        required,
        numeric: helpers.withMessage(
          'A valid phone number could contains "numbers", "spaces", ".", "()", "-", "ext". Other values are not accepted.  ',
          numeric
        ),
        minLength: minLength(7),
        maxLength: maxLength(15),
      },
      message: { required },
    };
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.name = this.userInfo.name;
      this.email = this.userInfo.email;
    }
  },
  methods: {
    onSelectCountry(value) {
      this.selectedCountry = value;
    },
    handlePhoneNumber() {
      this.cleanedPhoneNumber = this.phoneNumber.replace(
        /[\s()+\-.]|ext/gi,
        ""
      );
    },
    prepareJSON() {
      const obj = {
        name: this.name,
        email: this.email,
        phonenumber: this.cleanedPhoneNumber,
        country_code: this.selectedCountry.id,
        message: this.message,
      };
      console.log("prepareJSON here", JSON.stringify(obj));
    },
    submitForm() {
      if (this.v$.$validate() && this.v$.$errors.length === 0)
        this.prepareJSON();
    },
  },
};
</script>
<style>
label {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0.5rem;
}
input {
  -webkit-appearance: none;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  padding: 0.5rem;
}
label:focus-within {
  font-weight: bold;
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
.error > input,
.error > textarea {
  border-color: red;
  outline-color: red;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
}
</style>
