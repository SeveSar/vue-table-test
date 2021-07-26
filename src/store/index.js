import { createStore } from "vuex";
import usersStore from "./modules/users";
import loader from "./modules/loader";
import notice from "./modules/notification";
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    usersStore,
    loader,
    notice,
  },
});
export default store;
