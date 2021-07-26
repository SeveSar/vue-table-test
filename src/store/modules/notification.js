import mutations from "../mutations";
const { TOGGLE_NOTICE } = mutations;
const noticeStore = {
  state: {
    notice: null,
  },
  getters: {
    notice: (state) => state.notice,
  },
  mutations: {
    [TOGGLE_NOTICE](state, newNotice) {
      state.notice = newNotice;
    },
  },
  actions: {
    toggleNotice({ commit }, notice) {
      commit(TOGGLE_NOTICE, notice);
    },
  },
};

export default noticeStore;
