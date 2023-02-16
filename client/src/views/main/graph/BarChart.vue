<template>
  <div class="q-px-md">
    <div style="font-size: 20px" class="text-weight-bold">
      Penjualan setiap makanan
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
    <div
      class="fit row no-wrap justify-start items-start content-start q-pt-md"
    >
      <div class="col-12">
        <Bar
          id="bar-chart"
          style="margin-left: auto; margin-right: 120px"
          :options="chartOptions"
          :data="foodReportByNameData"
          :width="880"
          :height="430"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  setup() {
    const store = useStore();

    // DATA
    const pick = ref("");
    const chartOptions = ref({
      responsive: false,
      parsing: {
        xAxisKey: "date",
        yAxisKey: "totalAmount",
      },
      scales: {
        y: {
          ticks: {
            stepSize: 5,
            callback: (yValue) => {
              return Math.floor(yValue);
            },
          },
          title: {
            display: true,
            text: "Jumlah terjual",
          },
        },
        x: {
          title: {
            display: true,
            text: "Tanggal input data",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {
          top: 5,
          right: 20,
          left: 20,
          bottom: 10,
        },
      },
    });

    // COMPUTED
    const foodOptions = computed(() => store.getters["getFoodNameList"]);
    const foodReportByNameData = computed(() => {
      const data = store.getters["getFoodReportByName"];
      return {
        datasets: [
          {
            label: "Jumlah terjual",
            backgroundColor: "#635985",
            data: data.list,
            maxBarThickness: 200,
          },
        ],
      };
    });

    // METHOD
    const inquiryFoodByName = async (val) => {
      await store.dispatch("inquiryFoodByName", val);
    };

    return {
      pick,
      foodOptions,
      foodReportByNameData,
      chartOptions,
      inquiryFoodByName,
    };
  },
};
</script>
