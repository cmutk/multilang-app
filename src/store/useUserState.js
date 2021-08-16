import { computed, reactive, readonly } from "vue";

const defaultState = { userInfo: { name: "", email: "" }, isLoggedIn: false };

const state = reactive(defaultState);

const getters = {
  getUserInfo: () => {
    return computed(() => state.userInfo);
  },
  getIsLoggedIn: () => {
    return computed(() => state.isLoggedIn);
  },
};

const actions = {
  logUserIn: ({ name, email }) => {
    actions.updateUserInfo({ name, email });
    actions.updateIsLoggedIn(true);
  },
  logUserOut: () => {
    actions.updateUserInfo({ name: "", email: "" });
    actions.updateIsLoggedIn(false);
  },
  updateUserInfo: ({ name, email }) => {
    state.userInfo.name = name;
    state.userInfo.email = email;
  },
  updateIsLoggedIn: (isLoggedIn) => {
    state.isLoggedIn = isLoggedIn;
  },
};
export default () => ({
  state: readonly(state),
  ...getters,
  ...actions,
});
