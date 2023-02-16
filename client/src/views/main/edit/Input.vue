<template>
  <div class="q-px-md q-pb-sm">
    <div style="font-size: 20px" class="text-weight-bold">
      Input Laporan Penjualan Makanan
    </div>
    <q-form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      greedy
      class="q-pt-sm"
      @submit.prevent="submitReport"
    >
      <div class="row">
        <div class="col-md-6">
          <div class="row q-col-gutter-x-sm items-center q-mt-sm">
            <label class="text-subtitle-2 text-right col-md-4 q-pr-md">
              <b>Nama Makanan</b>
            </label>
            <span class="col-md-8">
              <q-input
                v-model="name"
                name="name"
                dense
                outlined
                bg-color="white"
                autocomplete="off"
                hide-bottom-space
                :rules="[(val) => !!val || 'Wajib diisi']"
                @update:model-value="
                  (val) => (name = val.replace(/[^a-zA-Z ]/g, '').toUpperCase())
                "
              />
            </span>
          </div>
          <div class="row q-col-gutter-x-sm items-center q-mt-sm">
            <label class="text-subtitle-2 text-right col-md-4 q-pr-md">
              <b>Jumlah</b>
            </label>
            <span class="col-md-8">
              <q-input
                v-model="amount"
                name="amount"
                dense
                outlined
                bg-color="white"
                autocomplete="off"
                hide-bottom-space
                :rules="[(val) => !!val || 'Wajib diisi']"
                @update:model-value="
                  (val) => (amount = val.replace(/[^0-9]/g, ''))
                "
              />
            </span>
          </div>
          <div class="row q-col-gutter-x-sm items-center q-mt-sm">
            <label class="text-subtitle-2 text-right col-md-4 q-pr-md">
              <b>Harga Satuan</b>
            </label>
            <span class="col-md-8">
              <q-input
                v-model="price"
                name="price"
                dense
                prefix="Rp"
                outlined
                bg-color="white"
                reverse-fill-mask
                input-class="text-right"
                autocomplete="off"
                hide-bottom-space
                :rules="[(val) => !!val || 'Wajib diisi']"
                @update:model-value="
                  (val) => (price = val.replace(/[^0-9,]/g, ''))
                "
                @blur="formating"
                @focus="eraseFormating"
              />
            </span>
          </div>
          <div class="row q-col-gutter-x-sm items-center q-mt-sm">
            <label class="text-subtitle-2 text-right col-md-4 q-pr-md">
              <b>Tanggal Laporan</b>
            </label>
            <span class="col-md-8">
              <q-input
                v-model="date"
                name="date"
                :max="maxToday"
                dense
                outlined
                bg-color="white"
                autocomplete="off"
                hide-bottom-space
                :rules="[(val) => !!val || 'Wajib diisi']"
                type="date"
              />
            </span>
          </div>
          <div class="row q-col-gutter-x-sm items-center q-mt-md">
            <label class="text-subtitle-2 text-right col-md-4 q-pr-md"> </label>
            <span class="col-md-8">
              <q-btn
                style="background: white; color: black; border-radius: 3px"
                class="text-weight-bold"
                label="Input Data"
                type="submit"
                :loading="btnLoading"
              />
            </span>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "InputForm",
  setup() {
    const store = useStore();
    const $q = useQuasar();

    // DATA
    const name = ref("");
    const amount = ref("");
    const price = ref(""); // parseInt before request
    const date = ref("");
    const btnLoading = ref(false);

    // COMPUTED
    const maxToday = computed(() => {
      const today = new Date().toLocaleDateString();
      const newToday = new Date(today);
      const year = newToday.getFullYear().toString();
      let month = (newToday.getMonth() + 1).toString();
      let day = newToday.getDate().toString();
      if (day.length === 1) {
        day = `0${day}`;
      }
      if (month.length === 1) {
        month = `0${month}`;
      }
      return `${year}-${month}-${day}`;
    });

    // METHOD
    const formating = () => {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      if (price.value) {
        return (price.value = formatter
          .format(Number(price.value))
          .replace("Rp", "")
          .trim());
      }
      return;
    };
    const eraseFormating = () => {
      const exp = /^\W?\s?(\d+)[.,](\d+)?,?(\d+)?$/g;
      const replacer = (f, group1, group2, group3) => {
        return group3 ? `${group1}${group2}.${group3}` : `${group1}.${group2}`;
      };
      if (price.value) {
        return (price.value = parseInt(price.value.replace(exp, replacer)));
      }
      return;
    };
    const showNotif = (val) => {
      $q.notify({
        message: val === "success" ? "Input Data Sukses" : "Input Data Gagal",
        color: val === "success" ? "green" : "red",
        position: "top",
        progress: true,
        actions: [{ icon: "close", color: "black" }],
      });
    };
    const submitReport = async () => {
      btnLoading.value = true;
      const exp = /^\W?\s?(\d+)[.,](\d+)?,?(\d+)?$/g;
      const replacer = (f, group1, group2, group3) => {
        return group3 ? `${group1}${group2}.${group3}` : `${group1}.${group2}`;
      };

      const req = {
        name: name.value,
        amount: Number(amount.value),
        price: parseInt(price.value.replace(exp, replacer)),
        date: date.value,
      };
      const res = await store.dispatch("submitFoodReport", req);
      if (!res) {
        showNotif("failed");
        btnLoading.value = false;
        return;
      }
      await store.dispatch("inquiryAllFoodReport");
      showNotif("success");
      name.value = "";
      amount.value = "";
      price.value = "";
      date.value = "";
      btnLoading.value = false;
    };

    return {
      name,
      amount,
      price,
      date,
      maxToday,
      btnLoading,
      formating,
      eraseFormating,
      submitReport,
    };
  },
};
</script>
