<template>
  <div class="q-px-md">
    <div style="font-size: 20px" class="text-weight-bold">
      Laporan Seluruh Penjualan Makanan
    </div>
    <div class="q-pt-sm">
      <q-table
        card-class="bg-grey-1 q-px-sm"
        table-class="text-black"
        :rows="foodReport"
        :columns="columns"
        row-key="id"
        flat
        bordered
        separator="cell"
        :rows-per-page-options="[10]"
        :filter="filter"
      >
        <template v-slot:top>
          <q-input class="col-4" dense v-model="filter" placeholder="Pencarian">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "DataTable",
  setup() {
    const store = useStore();

    // DATA
    const columns = ref([
      {
        name: "no",
        align: "left",
        label: "No",
        field: "no",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
      {
        name: "name",
        align: "left",
        label: "Nama",
        field: "name",
        sortable: true,
        classes: "text-weight-medium",
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
      {
        name: "id",
        align: "left",
        label: "Kode Id",
        field: "id",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
      {
        name: "amount",
        align: "left",
        label: "Jumlah (pcs)",
        field: "amount",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
      {
        name: "price",
        align: "left",
        label: "Harga Satuan (Rp)",
        field: "price",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
        format: (val) => {
          const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          });
          return formatter.format(Number(val)).replace("Rp", "").trim();
        },
      },
      {
        name: "date",
        align: "center",
        label: "Tanggal Input",
        field: "date",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
    ]);
    const filter = ref("");

    // COMPUTED
    const foodReport = computed(() => store.getters["getAllFoodReport"]);

    return {
      foodReport,
      columns,
      filter,
    };
  },
};
</script>
