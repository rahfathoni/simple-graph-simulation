<template>
  <div class="q-pa-sm">
    <BarChart />
    <PieChart class="q-pt-md" />
  </div>
</template>

<script>
import { onBeforeMount, defineAsyncComponent } from "vue";
import { useStore } from "vuex";

export default {
  name: "GraphPage",
  components: {
    BarChart: defineAsyncComponent(() => import("./BarChart")),
    PieChart: defineAsyncComponent(() => import("./PieChart")),
  },
  setup() {
    const store = useStore();

    // MOUNTED
    onBeforeMount(async () => {
      store.commit("resetGraphState");
      await store.dispatch("inquiryAllFoodName");
      await store.dispatch("inquiryFoodTotal");
    });
  },
};
</script>
