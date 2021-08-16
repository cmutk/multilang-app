<template>
  <header id="header" class="shadow">
    <div id="navbar-container">
      <div class="row-container">
        <img
          id="navbar-logo"
          alt="Vue logo"
          width="40"
          height="40"
          src="@/assets/logo.png"
        />
        <h3 id="navbar-title">
          {{ this.$route.name === "Home" ? "Multilang" : this.$route.name }}
        </h3>
      </div>
      <nav v-show="!mobile" class="row-container">
        <router-link
          class="btn"
          :to="{ name: 'Home', params: { lang: this.$i18n.locale } }"
          >{{ $t("nav.homeButton") }}</router-link
        >
        <router-link
          class="btn"
          :to="{ name: 'Contact', params: { lang: this.$i18n.locale } }"
          >{{ $t("nav.contactButton") }}</router-link
        >
        <LocalePicker />
        <UserMenu
          v-if="isUserLoggedIn"
          :userInfo="userInfo"
          @logout="handleUserLogout()"
        />
        <div v-else class="btn primary" @click="loginModal = !loginModal">
          {{ $t("nav.loginButton") }}
        </div>
      </nav>
      <div
        class="btn"
        @click="toggleMobileNav"
        :class="[mobileNav ? 'toggle-icon-clicked' : '']"
        v-show="mobile"
      >
        <fa icon="bars" size="lg" />
      </div>
      <transition name="mobile-nav" class="dropdown-nav">
        <ul v-show="mobileNav">
          <template v-if="isUserLoggedIn">
            <li>
              <div class="btn mobile">{{ userInfo.name }}</div>
            </li>
            <li>
              <div class="btn mobile">{{ userInfo.email }}</div>
            </li>
          </template>
          <li>
            <router-link
              class="btn mobile"
              :to="{ name: 'Home', params: { lang: this.$i18n.locale } }"
              >{{ $t("nav.homeButton") }}</router-link
            >
          </li>
          <li>
            <router-link
              class="btn mobile"
              :to="{ name: 'Contact', params: { lang: this.$i18n.locale } }"
              >{{ $t("nav.contactButton") }}</router-link
            >
          </li>
          <li>
            <LocalePicker
              :classFromTop="['btn', 'mobile', 'clear-margin-right']"
            />
          </li>
          <li v-if="isUserLoggedIn">
            <div class="btn mobile primary danger" @click="handleUserLogout">
              {{ $t("nav.logoutButton") }}
            </div>
          </li>
          <li v-else>
            <div class="btn mobile primary" @click="loginModal = !loginModal">
              {{ $t("nav.loginButton") }}
            </div>
          </li>
        </ul>
      </transition>
    </div>
    <teleport to="#modals">
      <template v-if="loginModal">
        <BaseModal @handleCloseModal="loginModal = false"
      /></template>
    </teleport>
  </header>
</template>
<script>
import UserMenu from "./UserMenu.vue";
import LocalePicker from "./LocalePicker.vue";
import BaseModal from "@/components/BaseModal.vue";
import useUserState from "@/store/useUserState.js";
const { getIsLoggedIn, getUserInfo, logUserOut } = useUserState();
export default {
  name: "App",
  components: {
    LocalePicker,
    UserMenu,
    BaseModal,
  },
  data() {
    return {
      isUserLoggedIn: getIsLoggedIn(),
      userInfo: getUserInfo(),
      loginModal: false,
      windowWidth: null,
      mobile: null,
      mobileNav: null,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.toggleMobileView();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleUserLogout() {
      logUserOut();
    },
    toggleMobileNav() {
      console.log(this.isUserLoggedIn);
      this.mobileNav = !this.mobileNav;
    },
    handleResize() {
      this.toggleMobileView();
    },
    toggleMobileView() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 767) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
    },
  },
};
</script>

<style>
/* For mobile phones: */
ul {
  height: 100%;
  list-style: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
li {
  width: 100%;
  margin: 4px 0px;
  display: flex;
  flex-direction: row;
}
#header {
  width: 100%;
  position: sticky;
  background-color: white;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
}
#navbar-logo {
  display: none;
}
#navbar-title {
  margin: auto;
  padding-left: 8px;
}
#navbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
}

#navbar-container a {
  color: #2c3e50;
  border-bottom: 2px solid white;
  text-decoration: none;
}
#navbar-container a:hover {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

#navbar-container a.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}
.toggle-icon-clicked {
  background-color: #42b983;
  color: white;
}
.dropdown-nav {
  display: flex;
  position: fixed;
  background-color: white;
  bottom: 0;
  right: 0;
  top: 50px;
  width: 70vw;
  height: 100vh;
  z-index: 999;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 1s ease all;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(800px);
}
.mobile-nav-enter-to,
.mobile-nav-leave-from {
  transform: translateX(0);
}

.btn {
  font-weight: bold;
  padding: 14px 16px;
  cursor: pointer;
}
.btn.mobile {
  display: flex;
  flex-grow: 1;
}
.clear-margin-right {
  margin-right: 0;
}
.btn.mobile.primary {
  background-color: #42b983;
}
.btn.mobile.danger {
  border: 1px solid#BA5343;
  background-color: #ba5343;
  color: white;
  border-radius: 30px;
  padding: 10px 16px;
}
.btn.primary {
  border: 1px solid#42b983;
  background-color: #42b983;
  color: white;
  border-radius: 30px;
  padding: 10px 16px;
}
.btn.primary:hover {
  background-color: white;
  color: #42b983;
}
.row-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.shadow {
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.33);
}

@media only screen and (min-width: 768px) {
  /* For desktop: */

  #navbar-container {
    width: 80%;
    align-items: center;
    margin: auto;
  }
  #navbar-logo {
    display: flex;
  }
}
</style>
