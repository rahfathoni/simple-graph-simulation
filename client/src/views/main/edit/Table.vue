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
        <template v-slot:body-cell-action="props">
          <q-td :props="props" class="text-center">
            <q-btn
              :name="`ButtonDetail${props.rowIndex + 1}`"
              flat
              color="red"
              size="md"
              icon="delete_forever"
              @click.prevent="dialogDelete(props.row)"
            >
              <q-tooltip
                class="bg-grey-7"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                HAPUS
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="showDialogDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Hapus laporan penjualan <b>{{ pickDelete.name }}</b> dengan kode id
            <b>{{ pickDelete.id }}</b> ?</span
          >
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn
            label="Kembali"
            color="grey-8"
            class="q-mr-md"
            v-close-popup
            :loading="btnLoading"
          />
          <q-btn
            label="Hapus"
            color="red"
            @click.prevent="deleteReport"
            :loading="btnLoading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "DataTable",
  setup() {
    const store = useStore();
    const $q = useQuasar();

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
      {
        name: "action",
        align: "center",
        label: "Tindakan",
        field: "action",
        sortable: true,
        style: "font-size: 15px",
        headerClasses: "text-weight-bold",
        headerStyle: "font-size: 18px",
      },
    ]);
    const filter = ref("");
    const showDialogDelete = ref(false);
    const pickDelete = ref({
      name: "",
      id: "",
    });
    const btnLoading = ref(false);

    // COMPUTED
    const foodReport = computed(() => store.getters["getAllFoodReport"]);

    // METHOD
    const showNotif = (val) => {
      $q.notify({
        message: val === "success" ? "Delete Data Sukses" : "Delete Data Gagal",
        color: val === "success" ? "green" : "red",
        position: "top",
        progress: true,
        actions: [{ icon: "close", color: "black" }],
      });
    };
    const dialogDelete = (val) => {
      pickDelete.value = {
        name: val.name,
        id: val.id,
      };
      showDialogDelete.value = true;
    };
    const deleteReport = async () => {
      btnLoading.value = true;
      const req = {
        id: pickDelete.value.id,
      };
      const res = await store.dispatch("deleteFoodReport", req);
      if (!res) {
        showNotif("failed");
        btnLoading.value = false;
        return;
      }
      await store.dispatch("inquiryAllFoodReport");
      showNotif("success");
      pickDelete.value = {
        name: "",
        id: "",
      };
      showDialogDelete.value = false;
      btnLoading.value = false;
    };

    return {
      foodReport,
      columns,
      filter,
      showDialogDelete,
      pickDelete,
      btnLoading,
      dialogDelete,
      deleteReport,
    };
  },
};
</script>
