<template>
  <div class="q-px-md">
    <div style="font-size: 20px" class="text-weight-bold">
      Total penjualan seluruh makanan
    </div>
    <div class="fit row no-wrap justify-end items-end content-end q-pt-md">
      <div class="col-12">
        <Pie
          id="pie-chart"
          style="margin-left: 150px; margin-right: auto"
          :options="chartOptions"
          :data="allFoodReportData"
          :width="800"
          :height="400"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "PieChart",
  components: {
    Pie,
  },
  setup() {
    const store = useStore();

    // DATA
    const chartOptions = ref({
      responsive: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (val) => {
              return `${val.formattedValue} pcs`;
            },
          },
        },
        legend: {
          display: true,
          position: "left",
        },
        title: {
          display: true,
          text: () => {
            return `Total Penjualan Makanan = ${totalAmount.value} pcs`;
          },
          font: {
            size: 18,
          },
        },
      },
    });

    // COMPUTED
    const totalAmount = computed(() => store.getters["getFoodTotal"].total);
    const allFoodReportData = computed(() => {
      const data = store.getters["getFoodTotal"];
      return {
        labels: data.labels,
        datasets: [
          {
            backgroundColor: data.colors,
            data: data.data,
          },
        ],
      };
    });

    return {
      chartOptions,
      allFoodReportData,
    };
  },
};
</script>
