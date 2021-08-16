<template>
  <div class="contact">
    <h1>{{ $t("formContent.titles.contactPage") }}</h1>
    <ContactForm />
  </div>
</template>
<script>
// @ is an alias to /src
import ContactForm from "@/components/ContactForm.vue";

export default {
  name: "Contact",
  components: {
    ContactForm,
  },
};
</script>
<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  justify-items: center;
  height: 100%;
  width: 100%;
  align-self: center;
  margin: auto;
}
</style>
