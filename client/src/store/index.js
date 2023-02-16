import { createStore } from "vuex";

const services = require("@/services/index").default;

const generateRandomColor = (data) => {
  let colors = [];
  if (data && data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      let letters = "0123456789ABCDEF".split("");
      let color = "#";
      for (let x = 0; x < 6; x++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
  }
  return colors;
};

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
      const data = state.foodTotal;
      const labels = data.map((item) => item.food);
      const amount = data.map((item) => item.totalAmount);
      const result = {
        list: data,
        labels: labels,
        data: amount,
        total: amount.reduce((a, b) => a + b, 0),
        colors: generateRandomColor(data),
      };
      return result;
    },
    getAllFoodReport(state) {
      return state.allFoodReport;
    },
    getFoodReportByName(state) {
      return state.foodReportByName;
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
