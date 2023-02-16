import { createStore } from "vuex";

export default createStore({
  state: {
    menuTab: "grafik",
  },
  getters: {
    getMenuTab(state) {
      return state.menuTab;
    },
    // getInputHistory(state) {
    //   return state.inputHistory;
    // },
    // getButtonList(state) {
    //   return state.buttonList;
    // },
  },
  mutations: {
    setMenuTab(state, val) {
      state.menuTab = val;
    },
    // resetInputHistory(state) {
    //   state.inputHistory = [];
    // },
    // setInputHistory(state, val) {
    //   let data = state.inputHistory;
    //   if (!data) {
    //     state.inputHistory = val;
    //     return;
    //   }
    //   state.inputHistory = `${data} ${val}`;
    // },
    // setLastInputHistory(state, val) {
    //   let data = state.inputHistory;
    //   if (data) {
    //     data = data.slice(0, -1);
    //     state.inputHistory = `${data} ${val}`;
    //   }
    // },
  },
  actions: {},
  modules: {},
});
