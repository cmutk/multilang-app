<template>
  <div
    class="btn primary user-info-button"
    :userInfo="userInfo"
    @mouseenter="showMail = true"
    @mouseleave="showMail = false"
    @click="handleShowLogoutButton"
  >
    <span v-show="!showMail">{{ userInfo.name }}</span>
    <span v-show="showMail">{{ userInfo.email }}</span>
    <span class="user-info-icon"> <fa icon="chevron-right" size="xs" /> </span>
  </div>
  <div v-show="showLogoutButton" class="btn mobile danger" @click="logout">
    {{ $t("nav.logoutButton") }}
  </div>
</template>
<script>
export default {
  name: "UserMenu",
  props: ["userInfo"],
  emits: ["logout"],
  data() {
    return {
      showMail: false,
      showLogoutButton: false,
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    handleShowLogoutButton() {
      this.showLogoutButton = !this.showLogoutButton;
      setTimeout(() => (this.showLogoutButton = false), 3000);
    },
  },
};
</script>
<style scoped>
.user-info-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 8px;
}
.user-info-icon {
  padding-left: 16px;
}
</style>
