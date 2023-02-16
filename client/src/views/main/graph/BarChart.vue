<template>
  <div class="q-px-md">
    <div style="font-size: 20px" class="text-weight-bold">
      Jumlah penjualan setiap makanan
    </div>
    <div class="fit row no-wrap justify-start items-start content-start">
      <div class="col-sm-5 offset-1 col-xs-12">
        <q-select
          v-model="pick"
          :options="foodOptions"
          label="Jenis Makanan"
          @update:model-value="inquiryFoodByName"
        />
      </div>
    </div>
    REPORT => {{ foodReportByName }}
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "BarChart",
  setup() {
    const store = useStore();

    // DATA
    const pick = ref("");

    // COMPUTED
    const foodOptions = computed(() => store.getters["getFoodNameList"]);
    const foodReportByName = computed(
      () => store.getters["getFoodReportByName"]
    );

    // METHOD
    const inquiryFoodByName = async (val) => {
      await store.dispatch("inquiryFoodByName", val);
    };

    return {
      pick,
      foodOptions,
      foodReportByName,
      inquiryFoodByName,
    };
  },
};
</script>
