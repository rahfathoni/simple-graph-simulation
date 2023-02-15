import axios from "axios";

const base_url = "http://localhost:3000";

export default {
  GetFoodReportList: async () => {
    try {
      const res = await axios.get(`${base_url}/food`);
      console.debug("RES GetFoodReportList", res);
      return res;
    } catch (err) {
      console.error("ERR GetFoodReportList", err);
      throw err;
    }
  },
  // GetAllFoodName: async () => {
  //   try {
  //     const res = await axios.get(`${base_url}/food/list`, req);
  //     console.debug("RES GetAllFoodName", res);
  //     return res;
  //   } catch (err) {
  //     console.error("ERR GetAllFoodName", err);
  //     throw err;
  //   }
  // },
  // GetFoodReportByName: async (payload) => {
  //   try {
  //     const req = {
  //       name: payload.name,
  //     };
  //     console.debug("REQ GetFoodReportByName", req);
  //     const res = await axios.get(`${base_url}/food/search`, req);
  //     console.debug("RES GetFoodReportByName", res);
  //     return res;
  //   } catch (err) {
  //     console.error("ERR GetFoodReportByName", err);
  //     throw err;
  //   }
  // },
  // GetFoodTotal: async () => {
  //   try {
  //     const res = await axios.get(`${base_url}/food/total`, req);
  //     console.debug("RES GetFoodTotal", res);
  //     return res;
  //   } catch (err) {
  //     console.error("ERR GetFoodTotal", err);
  //     throw err;
  //   }
  // },
  // InputFoodReport: async (payload) => {
  //   try {
  //     const req = {
  //       name: payload.name,
  //       amount: payload.amount,
  //       price: payload.price,
  //       createdAt: payload.date,
  //     };
  //     console.debug("REQ InputFoodReport", req);
  //     const res = await axios.post(`${base_url}/food`, req);
  //     console.debug("RES InputFoodReport", res);
  //     return res;
  //   } catch (err) {
  //     console.error("ERR InputFoodReport", err);
  //     throw err;
  //   }
  // },
  // DeleteFoodReport: async (payload) => {
  //   try {
  //     console.debug("REQ DeleteFoodReport", payload);
  //     const res = await axios.delete(`${base_url}/food/${payload.id}`);
  //     console.log("RES DeleteFoodReport", res);
  //     return res;
  //   } catch (err) {
  //     console.error("ERR DeleteFoodReport", err);
  //     throw err;
  //   }
  // },
};
