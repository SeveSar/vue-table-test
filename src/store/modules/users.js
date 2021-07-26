import axios from "../../plugins/axios";
import mutations from "../mutations";

const { USERS, USERS_SLICED, CURRENT_PAGE, ADD_USER } = mutations;
const usersStore = {
  state: {
    users: [],
    usersPerPage: 50,
    userSliced: [],
    currentPage: 1,
  },
  getters: {
    totalUsers: (state) => state.users.length,
    users: (state) => state.users,
    usersPerPage: (state) => state.usersPerPage,
    currentPage: (state) => state.currentPage,
    sliceUsers: (state) => (from, to) => state.users.slice(from, to),
    userSliced: (state) => state.userSliced,
    usersMap: (state) =>
      state.users.reduce((acc, user, index) => {
        acc[user.id] = index;
        return acc;
      }, {}),
    currentUser: (state, getters) => (id) => state.users[getters.usersMap[id]],
  },
  mutations: {
    [USERS](state, users) {
      state.users = users;
    },
    [USERS_SLICED](state, users) {
      state.userSliced = users;
    },
    [CURRENT_PAGE](state, page) {
      state.currentPage = page;
    },
    [ADD_USER](state, newUser) {
      state.users.unshift(newUser);
    },
  },
  actions: {
    async fetchUsers({ commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const response = await axios.get(
          "https://data-table-vue-4257c-default-rtdb.europe-west1.firebasedatabase.app/data.json"
        );
        const filteredUsers = response.filter((user, index, self) => {
          return index === self.findIndex((t) => t.id === user.id);
        });
        commit(USERS, filteredUsers);
        dispatch("pullUserSliced");
      } catch (err) {
        dispatch(
          "toggleNotice",
          {
            title: "Try to access to data",
            message: "awfwaf",
            type: "error",
          },
          { root: true }
        );
        alert(
          `${err.message} (Make sure you allowed the web-browser to access website's data)`
        );
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    pullUserSliced({ commit, getters }) {
      const from = (getters.currentPage - 1) * getters.usersPerPage;
      const to = getters.currentPage * getters.usersPerPage;
      const userSliced = getters.sliceUsers(from, to);
      commit(USERS_SLICED, userSliced);
    },
    changeCurrentPage({ commit, dispatch }, newPage) {
      commit(CURRENT_PAGE, newPage);
      dispatch("pullUserSliced");
    },
    addUser({ commit, getters, dispatch }, newUser) {
      const isHere = getters.currentUser(newUser.id);
      if (getters.currentPage !== 1) {
        dispatch("changeCurrentPage", 1);
      }
      if (isHere) {
        dispatch(
          "toggleNotice",
          {
            title: "Adding new User",
            message: `User with this id(${newUser.id}) is already added`,
            type: "error",
          },
          { root: true }
        );
        return;
      }
      commit(ADD_USER, newUser);
      dispatch("pullUserSliced");
      dispatch(
        "toggleNotice",
        {
          title: "Adding new User",
          message: `${newUser.firstName} ${newUser.lastName} was added`,
          type: "success",
        },
        { root: true }
      );
    },
  },
};

export default usersStore;
