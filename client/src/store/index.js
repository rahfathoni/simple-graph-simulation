import { createStore } from "vuex";

const services = require("@/services/index").default;

export default createStore({
  state: {
    menuTab: "grafik",
    allFoodReport: [],
    foodNameList: [],
    foodReportByName: {
      name: "",
      list: [],
    },
    foodTotal: [],
  },
  getters: {
    getMenuTab(state) {
      return state.menuTab;
    },
    getFoodNameList(state) {
      return state.foodNameList;
    },
    getFoodTotal(state) {
      return state.foodTotal;
    },
    getAllFoodReport(state) {
      return state.allFoodReport;
    },
    getFoodReportByName(state) {
      return state.foodReportByName.list;
    },
  },
  mutations: {
    resetGraphState(state) {
      state.foodNameList = [];
      state.foodReportByName = {
        name: "",
        list: [],
      };
      state.foodTotal = [];
    },
    setMenuTab(state, val) {
      state.menuTab = val;
    },
    setFoodNameList(state, val) {
      if (!val || (val && val.length === 0)) {
        return (state.foodNameList = []);
      }
      state.foodNameList = val;
    },
    setFoodTotal(state, val) {
      if (!val || (val && val.length === 0)) {
        return (state.foodTotal = []);
      }
      state.foodTotal = val;
    },
    setAllFoodReport(state, val) {
      if (!val || (val && val.length === 0)) {
        return (state.allFoodReport = []);
      }
      state.allFoodReport = val;
    },
    setFoodReportByName(state, val) {
      if (!val || (val && val.list.length === 0)) {
        return (state.foodReportByName = {
          name: "",
          list: [],
        });
      }
      state.foodReportByName = {
        name: val.name,
        list: val.list,
      };
    },
    // setLastInputHistory(state, val) {
    //   let data = state.inputHistory;
    //   if (data) {
    //     data = data.slice(0, -1);
    //     state.inputHistory = `${data} ${val}`;
    //   }
    // },
  },
  actions: {
    async inquiryAllFoodReport({ commit }) {
      try {
        const res = await services.GetAllFoodReport();
        commit("setAllFoodReport", res.list);
      } catch (err) {
        commit("setAllFoodReport");
      }
    },
    async inquiryAllFoodName({ commit }) {
      try {
        const res = await services.GetAllFoodName();
        commit("setFoodNameList", res.list);
      } catch (err) {
        commit("setFoodNameList");
      }
    },
    async inquiryFoodTotal({ commit }) {
      try {
        const res = await services.GetFoodTotal();
        commit("setFoodTotal", res.list);
      } catch (err) {
        commit("setFoodTotal");
      }
    },
    async inquiryFoodByName({ commit }, payload) {
      try {
        const req = {
          name: payload,
        };
        const res = await services.GetFoodReportByName(req);
        commit("setFoodReportByName", res);
      } catch (err) {
        commit("setFoodReportByName");
      }
    },
  },
  modules: {},
});
