<template>
  <div class="bg-grey-3 q-pa-md">
    <div class="fit row justify-start items-start content-start q-pt-xs">
      <div class="text-center q-pt-md">
        <div class="fit row wrap justify-start items-start content-start">
          <div>
            <div
              class="text-weight-bold q-pb-none q-mb-none"
              style="font-size: 30px"
            >
              Monitoring Penjualan Makanan
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-gutter-y-md q-pt-sm">
      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        @update:model-value="changeTab"
      >
        <q-tab name="grafik" icon="bar_chart" label="Grafik" />
        <q-tab name="edit" icon="list_alt" label="Edit Data" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "LayoutHeader",
  setup() {
    const store = useStore();

    // COMPUTED
    const tab = computed(() => store.getters["getMenuTab"]);

    //METHOD
    const changeTab = (val) => {
      store.commit("setMenuTab", val);
    };

    return {
      tab,
      changeTab,
    };
  },
};
</script>
