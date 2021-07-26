import mutations from "../mutations";
const { TOGGLE_LOADER } = mutations;
const loaderStore = {
  state: {
    isLoader: false,
  },
  getters: {
    loader: (state) => state.isLoader,
  },
  mutations: {
    [TOGGLE_LOADER](state, value) {
      state.isLoader = value;
    },
  },
  actions: {
    toggleLoader({ commit }, value) {
      commit(TOGGLE_LOADER, value);
    },
  },
};
export default loaderStore;
