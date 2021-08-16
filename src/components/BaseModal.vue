<template>
  <div class="modal-overlay" @click.self="handleCloseModal">
    <div class="modal">
      <login-form @closeModal="handleCloseModal"></login-form>
    </div>
  </div>
</template>
<script>
import LoginForm from "./LoginForm.vue";
export default {
  name: "BaseModal",
  emits: ["handleCloseModal"],
  components: {
    LoginForm,
  },
  methods: {
    handleCloseModal() {
      this.$emit("handleCloseModal");
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 400;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  z-index: 700;
  background: #ffffff;
  border-radius: none;
  box-shadow: 2px 2px 20px 1px;
  /* overflow-x: auto; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 16px;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .modal {
    border-radius: 2rem;
    padding: 3rem 4rem;
    max-width: 35%;
    height: 45vh;
  }
}
</style>
